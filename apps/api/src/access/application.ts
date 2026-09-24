import { createHash, randomBytes } from 'node:crypto';
import type { Pool } from 'pg';

const LINK_LIFETIME_MS = 15 * 60 * 1000;
const SESSION_LIFETIME_MS = 30 * 24 * 60 * 60 * 1000;

export type Person = { id: string; email: string };

export type AccessDependencies = {
  pool: Pool;
  sendLink: (email: string, url: string) => Promise<void>;
  appOrigin: string;
  now?: () => Date;
};

const hash = (token: string) =>
  createHash('sha256').update(token).digest('hex');
const newToken = () => randomBytes(32).toString('base64url');

export function createAccess(dependencies: AccessDependencies) {
  const { pool, sendLink, appOrigin } = dependencies;
  const now = dependencies.now ?? (() => new Date());

  return {
    async requestLink(email: string) {
      const token = newToken();
      const tokenHash = hash(token);
      await pool.query(
        'INSERT INTO access_links (email, token_hash, expires_at) VALUES ($1, $2, $3)',
        [email, tokenHash, new Date(now().getTime() + LINK_LIFETIME_MS)],
      );
      try {
        const url = new URL('/access/confirm', appOrigin);
        url.searchParams.set('token', token);
        await sendLink(email, url.toString());
      } catch (error) {
        await pool.query('DELETE FROM access_links WHERE token_hash = $1', [
          tokenHash,
        ]);
        throw error;
      }
    },

    async consumeLink(token: string): Promise<string | null> {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const link = await client.query<{ email: string }>(
          `UPDATE access_links SET consumed_at = $2
           WHERE token_hash = $1 AND consumed_at IS NULL AND expires_at > $2
           RETURNING email`,
          [hash(token), now()],
        );
        if (!link.rowCount) {
          await client.query('ROLLBACK');
          return null;
        }
        const person = await client.query<{ id: string }>(
          `INSERT INTO people (email, email_verified_at) VALUES ($1, $2)
           ON CONFLICT (email) DO UPDATE SET email_verified_at = EXCLUDED.email_verified_at
           RETURNING id`,
          [link.rows[0].email, now()],
        );
        const session = newToken();
        await client.query(
          'INSERT INTO sessions (person_id, token_hash, expires_at) VALUES ($1, $2, $3)',
          [
            person.rows[0].id,
            hash(session),
            new Date(now().getTime() + SESSION_LIFETIME_MS),
          ],
        );
        await client.query('COMMIT');
        return session;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },

    async personForSession(token: string): Promise<Person | null> {
      const result = await pool.query<Person>(
        `SELECT people.id, people.email FROM sessions
         JOIN people ON people.id = sessions.person_id
         WHERE sessions.token_hash = $1 AND sessions.revoked_at IS NULL AND sessions.expires_at > $2`,
        [hash(token), now()],
      );
      return result.rows[0] ?? null;
    },

    async revokeSession(token: string) {
      await pool.query(
        'UPDATE sessions SET revoked_at = $2 WHERE token_hash = $1 AND revoked_at IS NULL',
        [hash(token), now()],
      );
    },
  };
}

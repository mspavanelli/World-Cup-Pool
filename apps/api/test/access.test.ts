import '../src/local-env.js';
import { randomUUID } from 'node:crypto';
import { Pool } from 'pg';
import { afterAll, describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl)
  throw new Error('DATABASE_URL is required for PostgreSQL integration tests');

const pool = new Pool({ connectionString: databaseUrl });
const email = `access-${randomUUID()}@example.com`;
const sent: string[] = [];
let instant = new Date('2026-09-24T12:00:00.000Z');
const app = buildApp(databaseUrl, {
  sendLink: async (_recipient, url) => {
    sent.push(url);
  },
  now: () => instant,
  appOrigin: 'http://localhost:5173',
});

afterAll(async () => {
  await pool.query('DELETE FROM access_links WHERE email = $1', [email]);
  await pool.query(
    'DELETE FROM sessions WHERE person_id IN (SELECT id FROM people WHERE email = $1)',
    [email],
  );
  await pool.query('DELETE FROM people WHERE email = $1', [email]);
  await app.close();
  await pool.end();
});

async function issueLink() {
  const response = await app.inject({
    method: 'POST',
    url: '/api/access/links',
    payload: { email },
  });
  expect(response.statusCode).toBe(202);
  return new URL(sent.at(-1)!).searchParams.get('token')!;
}

async function confirm(token: string) {
  return app.inject({
    method: 'POST',
    url: '/api/access/confirm',
    payload: { token },
  });
}

describe('email access with PostgreSQL', () => {
  it('issues a single-use 15-minute link and verifies the email on consumption', async () => {
    const token = await issueLink();
    const before = await pool.query('SELECT id FROM people WHERE email = $1', [
      email,
    ]);
    expect(before.rowCount).toBe(0);
    const link = await pool.query<{ expires_at: Date; token_hash: string }>(
      'SELECT expires_at, token_hash FROM access_links WHERE email = $1 ORDER BY expires_at DESC LIMIT 1',
      [email],
    );
    expect(link.rows[0].expires_at.getTime()).toBe(
      instant.getTime() + 15 * 60 * 1000,
    );
    expect(link.rows[0].token_hash).not.toBe(token);

    const response = await confirm(token);
    expect(response.statusCode).toBe(200);
    const sessionCookie = response.headers['set-cookie'] as string;
    expect(sessionCookie).toContain('HttpOnly');
    expect(sessionCookie).toContain('SameSite=Lax');
    const person = await pool.query<{ email_verified_at: Date }>(
      'SELECT email_verified_at FROM people WHERE email = $1',
      [email],
    );
    expect(person.rows[0].email_verified_at.getTime()).toBe(instant.getTime());

    const current = await app.inject({
      method: 'GET',
      url: '/api/access/session',
      headers: { cookie: sessionCookie },
    });
    expect(current.statusCode).toBe(200);
    expect(current.json().person.email).toBe(email);
    expect((await confirm(token)).statusCode).toBe(400);

    const logout = await app.inject({
      method: 'DELETE',
      url: '/api/access/session',
      headers: { cookie: sessionCookie },
    });
    expect(logout.statusCode).toBe(204);
    expect(
      (
        await app.inject({
          method: 'GET',
          url: '/api/access/session',
          headers: { cookie: sessionCookie },
        })
      ).statusCode,
    ).toBe(401);
  });

  it('rejects expired links without creating a session', async () => {
    const token = await issueLink();
    const before = await pool.query(
      'SELECT id FROM sessions WHERE person_id IN (SELECT id FROM people WHERE email = $1)',
      [email],
    );
    instant = new Date(instant.getTime() + 15 * 60 * 1000);
    expect((await confirm(token)).statusCode).toBe(400);
    const sessions = await pool.query(
      'SELECT id FROM sessions WHERE person_id IN (SELECT id FROM people WHERE email = $1)',
      [email],
    );
    expect(sessions.rowCount).toBe(before.rowCount);
  });

  it('expires sessions after 30 days and gives the same response for existing addresses', async () => {
    const first = await app.inject({
      method: 'POST',
      url: '/api/access/links',
      payload: { email },
    });
    expect(first.statusCode).toBe(202);
    const response = await confirm(
      new URL(sent.at(-1)!).searchParams.get('token')!,
    );
    expect(response.statusCode).toBe(200);
    const cookie = response.headers['set-cookie'] as string;
    instant = new Date(instant.getTime() + 30 * 24 * 60 * 60 * 1000);
    expect(
      (
        await app.inject({
          method: 'GET',
          url: '/api/access/session',
          headers: { cookie },
        })
      ).statusCode,
    ).toBe(401);
    expect(first.json()).toEqual({
      message:
        'Se o endereço puder receber e-mails, enviaremos um link de acesso.',
    });
  });
});

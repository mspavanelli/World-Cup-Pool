import { and, eq, gt, isNull } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { Pool } from 'pg';
import { accessLinks, people, sessions } from '../db/schema.js';
import type { AccessStore } from './application.js';

export function createAccessStore(pool: Pool): AccessStore {
  const db = drizzle(pool);
  return {
    async createLink(email, tokenHash, expiresAt) {
      await db.insert(accessLinks).values({ email, tokenHash, expiresAt });
    },
    async deleteLink(tokenHash) {
      await db.delete(accessLinks).where(eq(accessLinks.tokenHash, tokenHash));
    },
    async consumeLink(tokenHash, sessionHash, now, sessionExpiresAt) {
      return db.transaction(async (tx) => {
        const [link] = await tx
          .update(accessLinks)
          .set({ consumedAt: now })
          .where(
            and(
              eq(accessLinks.tokenHash, tokenHash),
              isNull(accessLinks.consumedAt),
              gt(accessLinks.expiresAt, now),
            ),
          )
          .returning({ email: accessLinks.email });
        if (!link) return false;
        const [person] = await tx
          .insert(people)
          .values({ email: link.email, emailVerifiedAt: now })
          .onConflictDoUpdate({
            target: people.email,
            set: { emailVerifiedAt: now },
          })
          .returning({ id: people.id });
        await tx.insert(sessions).values({
          personId: person.id,
          tokenHash: sessionHash,
          expiresAt: sessionExpiresAt,
        });
        return true;
      });
    },
    async personForSession(tokenHash, now) {
      const [person] = await db
        .select({ id: people.id, email: people.email })
        .from(sessions)
        .innerJoin(people, eq(people.id, sessions.personId))
        .where(
          and(
            eq(sessions.tokenHash, tokenHash),
            isNull(sessions.revokedAt),
            gt(sessions.expiresAt, now),
          ),
        )
        .limit(1);
      return person ?? null;
    },
    async revokeSession(tokenHash, now) {
      await db
        .update(sessions)
        .set({ revokedAt: now })
        .where(
          and(eq(sessions.tokenHash, tokenHash), isNull(sessions.revokedAt)),
        );
    },
  };
}

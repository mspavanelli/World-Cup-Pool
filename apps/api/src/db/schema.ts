import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const people = pgTable('people', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  emailVerifiedAt: timestamp('email_verified_at', {
    withTimezone: true,
  }).notNull(),
});

export const accessLinks = pgTable('access_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull(),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  consumedAt: timestamp('consumed_at', { withTimezone: true }),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  personId: uuid('person_id')
    .notNull()
    .references(() => people.id),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
});

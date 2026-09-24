import { createHash, randomBytes } from 'node:crypto';

export const LINK_LIFETIME_MS = 15 * 60 * 1000;
export const SESSION_LIFETIME_MS = 30 * 24 * 60 * 60 * 1000;

export type Person = { id: string; email: string };

export type AccessStore = {
  createLink(email: string, tokenHash: string, expiresAt: Date): Promise<void>;
  deleteLink(tokenHash: string): Promise<void>;
  consumeLink(
    tokenHash: string,
    sessionHash: string,
    now: Date,
    sessionExpiresAt: Date,
  ): Promise<boolean>;
  personForSession(tokenHash: string, now: Date): Promise<Person | null>;
  revokeSession(tokenHash: string, now: Date): Promise<void>;
};

export type AccessDependencies = {
  store: AccessStore;
  sendLink: (email: string, url: string) => Promise<void>;
  appOrigin: string;
  now?: () => Date;
};

const hash = (token: string) =>
  createHash('sha256').update(token).digest('hex');
const newToken = () => randomBytes(32).toString('base64url');

export function createAccess(dependencies: AccessDependencies) {
  const { store, sendLink, appOrigin } = dependencies;
  const now = dependencies.now ?? (() => new Date());

  return {
    async requestLink(email: string) {
      const token = newToken();
      const tokenHash = hash(token);
      await store.createLink(
        email,
        tokenHash,
        new Date(now().getTime() + LINK_LIFETIME_MS),
      );
      try {
        const url = new URL('/access/confirm', appOrigin);
        url.searchParams.set('token', token);
        await sendLink(email, url.toString());
      } catch (error) {
        await store.deleteLink(tokenHash);
        throw error;
      }
    },

    async consumeLink(token: string): Promise<string | null> {
      const session = newToken();
      const instant = now();
      const consumed = await store.consumeLink(
        hash(token),
        hash(session),
        instant,
        new Date(instant.getTime() + SESSION_LIFETIME_MS),
      );
      return consumed ? session : null;
    },

    async personForSession(token: string): Promise<Person | null> {
      return store.personForSession(hash(token), now());
    },

    async revokeSession(token: string) {
      await store.revokeSession(hash(token), now());
    },
  };
}

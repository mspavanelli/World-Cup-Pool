import Fastify from 'fastify';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { registerAccessRoutes } from './access/routes.js';
import { sendLocalLink } from './access/mail.js';

export function buildApp(
  databaseUrl: string,
  options: {
    sendLink?: (email: string, url: string) => Promise<void>;
    appOrigin?: string;
    now?: () => Date;
    secureCookies?: boolean;
  } = {},
) {
  const app = Fastify();
  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle(pool);

  registerAccessRoutes(
    app,
    {
      pool,
      sendLink: options.sendLink ?? sendLocalLink,
      appOrigin:
        options.appOrigin ?? process.env.APP_ORIGIN ?? 'http://localhost:5173',
      now: options.now,
    },
    options.secureCookies ?? process.env.NODE_ENV === 'production',
  );

  app.get('/api/health', async (_request, reply) => {
    try {
      await db.execute(sql`select 1`);
      return { status: 'ok' };
    } catch (error) {
      app.log.error(error, 'PostgreSQL health check failed');
      return reply.code(503).send({ status: 'unavailable' });
    }
  });

  app.addHook('onClose', async () => {
    await pool.end();
  });

  return app;
}

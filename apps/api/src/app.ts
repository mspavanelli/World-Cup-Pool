import Fastify from 'fastify';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export function buildApp(databaseUrl: string) {
  const app = Fastify();
  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle(pool);

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

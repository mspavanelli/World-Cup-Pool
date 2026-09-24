import { buildApp } from './app.js';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required');
}

const port = Number(process.env.PORT ?? 3000);
const app = buildApp(databaseUrl);

try {
  await app.listen({ host: '127.0.0.1', port });
  app.log.info(`API listening on http://localhost:${port}`);
} catch (error) {
  app.log.error(error);
  process.exitCode = 1;
  await app.close();
}

import { afterAll, describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is required for the PostgreSQL integration test',
  );
}

const app = buildApp(databaseUrl);

afterAll(async () => {
  await app.close();
});

describe('GET /api/health', () => {
  it('responds when PostgreSQL is available', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/health' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });
});

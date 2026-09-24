import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../..',
);
const localEnvPath = resolve(repositoryRoot, '.env');

if (existsSync(localEnvPath)) {
  process.loadEnvFile(localEnvPath);
}

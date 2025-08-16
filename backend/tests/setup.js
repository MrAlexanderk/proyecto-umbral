import { afterAll, beforeAll, beforeEach, jest } from '@jest/globals';
import { query, pool, getSearchPath } from '../src/config/db.js';
import { readFile } from 'node:fs/promises';

const SCHEMA = process.env.PG_SEARCH_PATH || 'test_env';

beforeAll(async () => {
  await query(`CREATE SCHEMA IF NOT EXISTS ${SCHEMA}`);
  await query(`SET search_path TO ${SCHEMA}`);

  const ddl = await readFile(new URL('../sql/schema.sql', import.meta.url), 'utf-8');
  await query(ddl);

  await query(`
    INSERT INTO types (id, label) VALUES
      (1,'Dolls'),(2,'Mirrors'),(3,'Books'),(4,'Tech'),
      (5,'Relics'),(6,'Lockets'),(7,'Garments'),(8,'Others')
    ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label;
  `);
  await query(`
    INSERT INTO statuses (id, name) VALUES
      (1,'ACTIVE'),(2,'RESERVED'),(3,'SOLD')
    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
  `);

});

beforeEach(async () => {
  await query('TRUNCATE artifacts RESTART IDENTITY CASCADE;');
  await query('TRUNCATE users RESTART IDENTITY CASCADE;');
});

afterAll(async () => {
  await pool.end();
});

jest.setTimeout(30000);

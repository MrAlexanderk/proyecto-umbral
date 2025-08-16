import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const isRender = /render\.com/.test(process.env.DATABASE_URL || '');
const needsSSL = isRender || /sslmode=require/.test(process.env.DATABASE_URL || '');

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: needsSSL ? { rejectUnauthorized: false } : false,
});

if (process.env.PG_SEARCH_PATH) {
  pool.on('connect', (client) => {
    client.query(`SET search_path TO ${process.env.PG_SEARCH_PATH}`);
  });
}

export const query = (text, params) => pool.query(text, params);

export const getSearchPath = async () => {
  const { rows } = await query('SHOW search_path');
  return rows[0]?.search_path;
};

export default pool;

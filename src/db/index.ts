import { Pool, QueryResult } from "node-postgres";

let pool: Pool;

export function initDatabase() {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
  });
}

export async function query(text: string, params: any[]) {
  return pool.query(text, params);
}

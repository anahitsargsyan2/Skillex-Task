import dotenv from "dotenv";
import pkg from "pg";
import { COMBINATION_DETAILS, COMBINATIONS } from "./src/constants/table-names.js";

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function initializeTables() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS ${COMBINATION_DETAILS} (
        id SERIAL PRIMARY KEY,
        items TEXT NOT NULL,
        length INTEGER NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS ${COMBINATIONS} (
        id SERIAL PRIMARY KEY,
        combination JSON NOT NULL,
        ${COMBINATION_DETAILS}_Id INTEGER NOT NULL REFERENCES ${COMBINATION_DETAILS}(id) ON DELETE CASCADE
      )
    `);

    await client.query("COMMIT");
    console.log("✅ Tables created or verified.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error creating tables:", err);
  } finally {
    client.release();
  }
}

export default pool;

import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import {
  DatabaseConfigurationError,
  getApplicationDatabaseUrl,
} from "../src/lib/db/environment";

async function run() {
  const pool = new Pool({
    connectionString: getApplicationDatabaseUrl(),
    max: 1,
    connectionTimeoutMillis: 5_000,
  });

  try {
    const db = drizzle({ client: pool });
    await db.execute(sql`select 1 as healthy`);
    console.info("Database connection and query check passed.");
  } finally {
    await pool.end();
  }
}

run()
  .catch((error: unknown) => {
    const message =
      error instanceof DatabaseConfigurationError
        ? error.message
        : "Unable to connect to the database.";
    console.error(`Database connection check failed: ${message}`);
    process.exitCode = 1;
  });

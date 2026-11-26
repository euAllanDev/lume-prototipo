import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import {
  DatabaseConfigurationError,
  getMigrationDatabaseUrl,
} from "../src/lib/db/environment";

async function run() {
  const pool = new Pool({
    connectionString: getMigrationDatabaseUrl(),
    max: 1,
    connectionTimeoutMillis: 10_000,
  });

  try {
    const db = drizzle({ client: pool });
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.info("Database migrations completed.");
  } finally {
    await pool.end();
  }
}

run()
  .catch((error: unknown) => {
    const message =
      error instanceof DatabaseConfigurationError
        ? error.message
        : "Unable to apply database migrations.";
    console.error(`Database migration failed: ${message}`);
    process.exitCode = 1;
  });

import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { getApplicationDatabaseUrl } from "./environment";
import * as schema from "./schema";

type DatabaseClient = ReturnType<typeof drizzle<typeof schema>>;

declare global {
  var lumeDatabase: DatabaseClient | undefined;
}

function createDatabase(): DatabaseClient {
  const pool = new Pool({
    connectionString: getApplicationDatabaseUrl(),
    // Neon manages request-level pooling. A small process pool avoids excess connections.
    max: 1,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 5_000,
  });

  return drizzle({ client: pool, schema });
}

export const db = globalThis.lumeDatabase ?? createDatabase();

if (process.env.NODE_ENV !== "production") {
  globalThis.lumeDatabase = db;
}

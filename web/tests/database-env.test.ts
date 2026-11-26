import assert from "node:assert/strict";
import test from "node:test";

import {
  DatabaseConfigurationError,
  getApplicationDatabaseUrl,
  getMigrationDatabaseUrl,
} from "../src/lib/db/environment";

test("accepts valid PostgreSQL URLs for application and migrations", () => {
  const environment = {
    DATABASE_URL: "postgresql://app:secret@localhost:5432/lume",
    DATABASE_URL_UNPOOLED: "postgres://admin:secret@localhost:5432/lume",
  };

  assert.equal(getApplicationDatabaseUrl(environment), environment.DATABASE_URL);
  assert.equal(
    getMigrationDatabaseUrl(environment),
    environment.DATABASE_URL_UNPOOLED,
  );
});

test("rejects missing database URLs without exposing a value", () => {
  assert.throws(
    () => getApplicationDatabaseUrl({ DATABASE_URL: "" }),
    DatabaseConfigurationError,
  );
  assert.throws(
    () => getMigrationDatabaseUrl({ DATABASE_URL_UNPOOLED: undefined }),
    DatabaseConfigurationError,
  );
});

test("rejects non-PostgreSQL database URLs", () => {
  assert.throws(
    () => getApplicationDatabaseUrl({ DATABASE_URL: "https://example.com" }),
    DatabaseConfigurationError,
  );
});

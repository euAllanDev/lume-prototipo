import assert from "node:assert/strict";
import test from "node:test";

import { safeReturnTo } from "../src/lib/auth-redirect";
import { authConfiguration } from "../src/lib/auth-configuration";
import { user } from "../src/lib/db/schema/auth";

test("allows internal returnTo paths", () => {
  assert.equal(safeReturnTo("/ofertas?area=porto"), "/ofertas?area=porto");
});

test("blocks external and protocol-relative returnTo values", () => {
  for (const value of [
    "https://attacker.example",
    "//attacker.example",
    "/\\attacker.example",
    "/%5Cattacker.example",
    "/%2F%2Fattacker.example",
    "/%",
    "javascript:alert(1)",
    "entrar",
    null,
  ]) {
    assert.equal(safeReturnTo(value), "/");
  }
});

test("allows login before email verification and disables session cookie cache", () => {
  assert.equal(authConfiguration.requireEmailVerification, false);
  assert.equal(authConfiguration.cookieCacheEnabled, false);
});

test("password reset revokes persisted sessions", () => {
  assert.equal(authConfiguration.revokeSessionsOnPasswordReset, true);
  assert.equal(authConfiguration.sessionExpiresIn, 60 * 60 * 24 * 7);
});

test("identities have no commercial role or admin privilege", () => {
  assert.equal("role" in user, false);
  assert.equal("admin" in user, false);
});

test("auth integration requires isolated PostgreSQL", { skip: !process.env.TEST_DATABASE_URL }, () => {
  assert.ok(process.env.TEST_DATABASE_URL?.startsWith("postgres"));
});

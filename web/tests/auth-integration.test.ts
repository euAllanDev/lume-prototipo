import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";
import test from "node:test";

import { Pool } from "pg";

import { toPublicClientProfile, toPublicProviderProfile } from "../src/lib/profiles/public-dto";

const databaseUrl = process.env.TEST_DATABASE_URL;
const mailpitUrl = process.env.TEST_MAILPIT_URL ?? "http://127.0.0.1:58025";
const appUrl = "http://127.0.0.1:33162";
const integrationEnabled = Boolean(databaseUrl && process.env.TEST_MAILPIT_URL);

type JsonObject = Record<string, unknown>;

class CookieJar {
  private cookies = new Map<string, string>();

  read(response: Response) {
    const header = response.headers.get("set-cookie");
    if (!header) return;
    for (const cookie of header.split(/,(?=\s*[^;,=]+=[^;,]*)/)) {
      const [pair] = cookie.split(";", 1);
      const separator = pair.indexOf("=");
      if (separator < 0) continue;
      const name = pair.slice(0, separator).trim();
      const value = pair.slice(separator + 1).trim();
      if (value) this.cookies.set(name, value);
      else this.cookies.delete(name);
    }
  }

  header(): string | undefined {
    const value = [...this.cookies].map(([name, cookie]) => `${name}=${cookie}`).join("; ");
    return value || undefined;
  }
}

async function request(path: string, options: {
  body?: JsonObject;
  cookieJar?: CookieJar;
  ip?: string;
  origin?: string | null;
  redirect?: RequestRedirect;
} = {}) {
  const headers = new Headers({ "x-forwarded-for": options.ip ?? "127.0.0.1" });
  if (options.body) headers.set("content-type", "application/json");
  if (options.origin !== null) headers.set("origin", options.origin ?? appUrl);
  const cookie = options.cookieJar?.header();
  if (cookie) headers.set("cookie", cookie);
  const response = await fetch(`${appUrl}/api/auth${path}`, {
    method: options.body ? "POST" : "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    redirect: options.redirect ?? "manual",
  });
  options.cookieJar?.read(response);
  return response;
}

async function appRequest(path: string, options: {
  body?: JsonObject;
  cookieJar?: CookieJar;
  method?: "GET" | "PATCH" | "POST";
  origin?: string | null;
} = {}) {
  const headers = new Headers();
  if (options.body) headers.set("content-type", "application/json");
  if (options.origin !== null) headers.set("origin", options.origin ?? appUrl);
  const cookie = options.cookieJar?.header();
  if (cookie) headers.set("cookie", cookie);
  const response = await fetch(`${appUrl}${path}`, {
    method: options.method ?? (options.body ? "POST" : "GET"),
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  options.cookieJar?.read(response);
  return response;
}

async function json(response: Response): Promise<JsonObject> {
  return await response.json() as JsonObject;
}

async function waitForServer(process: ChildProcess): Promise<void> {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (process.exitCode !== null) throw new Error(`Next server exited with code ${process.exitCode}`);
    try {
      const response = await fetch(`${appUrl}/api/auth/get-session`);
      if (response.ok) return;
    } catch {
      // Server still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Next server did not become ready");
}

async function messages(): Promise<JsonObject[]> {
  const response = await fetch(`${mailpitUrl}/api/v1/messages`);
  assert.equal(response.status, 200);
  const payload = await json(response);
  return payload.messages as JsonObject[];
}

async function waitForMessages(count: number): Promise<JsonObject[]> {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const current = await messages();
    if (current.length >= count) return current;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Mailpit did not receive ${count} messages`);
}

async function messageLink(message: JsonObject): Promise<URL> {
  const id = String(message.ID);
  const response = await fetch(`${mailpitUrl}/api/v1/message/${id}`);
  assert.equal(response.status, 200);
  const detail = await json(response);
  const content = `${String(detail.Text ?? "")} ${String(detail.HTML ?? "")}`;
  const match = content.match(/https?:\/\/[^\s"<]+/);
  assert.ok(match, "captured email contains an HTTP link");
  return new URL(match[0].replaceAll("&amp;", "&"));
}

test("Better Auth uses isolated PostgreSQL and Mailpit", { skip: !integrationEnabled, timeout: 120_000 }, async (t) => {
  assert.ok(databaseUrl);
  const isolatedDatabase = new URL(databaseUrl);
  assert.equal(isolatedDatabase.hostname, "127.0.0.1");
  assert.equal(isolatedDatabase.port, "55432");
  assert.equal(isolatedDatabase.pathname, "/lume_auth_test");
  const pool = new Pool({ connectionString: databaseUrl, max: 1 });
  await pool.query('TRUNCATE "rate_limit", "verification", "session", "account", "user" CASCADE');
  await fetch(`${mailpitUrl}/api/v1/messages`, { method: "DELETE" });

  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "-p", "33162"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      DATABASE_URL_UNPOOLED: databaseUrl,
      BETTER_AUTH_SECRET: "integration-only-secret-with-at-least-32-bytes",
      BETTER_AUTH_URL: appUrl,
      EMAIL_FROM: "Lume Test <no-reply@lume.test>",
      SMTP_HOST: "127.0.0.1",
      SMTP_PORT: "51025",
      SMTP_SECURE: "false",
      NODE_ENV: "development",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let serverOutput = "";
  server.stdout?.on("data", (chunk) => { serverOutput += String(chunk); });
  server.stderr?.on("data", (chunk) => { serverOutput += String(chunk); });

  t.after(async () => {
    server.kill();
    await pool.end();
    if (server.exitCode === null) await new Promise((resolve) => server.once("exit", resolve));
  });

  try {
    await waitForServer(server);
    const email = "real-auth@lume.test";
    const password = "Valid123";

    await t.test("server enforces same password policy as UI", async () => {
      const response = await request("/sign-up/email", {
        body: { name: "Real Auth", email: "weak@lume.test", password: "password", initialCapability: "client" },
        ip: "10.0.0.1",
      });
      assert.equal(response.status, 400);
      assert.equal((await json(response)).code, "PASSWORD_POLICY_NOT_MET");
      assert.equal((await pool.query('SELECT count(*)::int AS count FROM "user" WHERE email = $1', ["weak@lume.test"])).rows[0].count, 0);
    });

    await t.test("signup requires exactly one approved initial capability", async () => {
      const missing = await request("/sign-up/email", {
        body: { name: "Missing Capability", email: "missing-capability@lume.test", password },
        ip: "10.0.0.18",
      });
      assert.equal(missing.status, 400);
      assert.equal((await json(missing)).code, "INITIAL_CAPABILITY_REQUIRED");
      const forged = await request("/sign-up/email", {
        body: { name: "Admin Capability", email: "admin-capability@lume.test", password, initialCapability: "admin" },
        ip: "10.0.0.19",
      });
      assert.equal(forged.status, 400);
      assert.equal((await pool.query('SELECT count(*)::int AS count FROM "user" WHERE email IN ($1, $2)', ["missing-capability@lume.test", "admin-capability@lume.test"])).rows[0].count, 0);
    });

    await t.test("signup persists identity and sends verification through SMTP", async () => {
      const response = await request("/sign-up/email", {
        body: { name: "Real Auth", email, password, initialCapability: "client" },
        ip: "10.0.0.2",
      });
      assert.equal(response.status, 200);
      assert.equal((await json(response)).token, null);
      const result = await pool.query(`SELECT u.email, u.email_verified, a.provider_id, p.display_name, c.capability
        FROM "user" u JOIN account a ON a.user_id = u.id
        JOIN lume_profile p ON p.user_id = u.id
        JOIN lume_profile_capability c ON c.user_id = u.id
        WHERE u.email = $1`, [email]);
      assert.deepEqual(result.rows, [{
        email,
        email_verified: false,
        provider_id: "credential",
        display_name: "Real Auth",
        capability: "client",
      }]);
      const captured = await waitForMessages(1);
      assert.equal(captured[0].Subject, "Confirme o seu e-mail no Lume");
    });

    const firstSession = new CookieJar();
    await t.test("invalid login fails; unverified user login and session succeed", async () => {
      const invalid = await request("/sign-in/email", {
        body: { email, password: "Wrong123" }, ip: "10.0.0.3",
      });
      assert.equal(invalid.status, 401);

      const valid = await request("/sign-in/email", {
        body: { email, password }, cookieJar: firstSession, ip: "10.0.0.4",
      });
      assert.equal(valid.status, 200);
      const session = await request("/get-session", { cookieJar: firstSession, ip: "10.0.0.4" });
      assert.equal(session.status, 200);
      assert.equal(((await json(session)).user as JsonObject).emailVerified, false);
    });

    await t.test("session renews, expires, and is removed", async () => {
      const user = await pool.query('SELECT id FROM "user" WHERE email = $1', [email]);
      await pool.query(`UPDATE session SET updated_at = now() - interval '2 days', expires_at = now() + interval '1 day'
        WHERE user_id = $1`, [user.rows[0].id]);
      const renewed = await request("/get-session", { cookieJar: firstSession, ip: "10.0.0.4" });
      assert.equal(renewed.status, 200);
      const renewedRow = await pool.query("SELECT expires_at FROM session WHERE user_id = $1", [user.rows[0].id]);
      assert.ok(new Date(renewedRow.rows[0].expires_at).getTime() > Date.now() + 6 * 24 * 60 * 60 * 1000);

      await pool.query("UPDATE session SET expires_at = now() - interval '1 second' WHERE user_id = $1", [user.rows[0].id]);
      const expired = await request("/get-session", { cookieJar: firstSession, ip: "10.0.0.4" });
      assert.equal(await expired.json(), null);
      assert.equal((await pool.query("SELECT count(*)::int AS count FROM session WHERE user_id = $1", [user.rows[0].id])).rows[0].count, 0);
    });

    const verificationSession = new CookieJar();
    await request("/sign-in/email", { body: { email, password }, cookieJar: verificationSession, ip: "10.0.0.5" });

    await t.test("verification resend reaches Mailpit and token verifies email", async () => {
      const resend = await request("/send-verification-email", {
        body: { email, callbackURL: "/verificar-email" },
        cookieJar: verificationSession,
        ip: "10.0.0.5",
      });
      assert.equal(resend.status, 200);
      const captured = await waitForMessages(2);
      const link = await messageLink(captured[0]);
      const verify = await fetch(link, { redirect: "manual" });
      assert.equal(verify.status, 302);
      assert.equal(verify.headers.get("location"), "/verificar-email");
      assert.equal((await pool.query('SELECT email_verified FROM "user" WHERE email = $1', [email])).rows[0].email_verified, true);

      const invalid = await request("/verify-email?token=invalid", { ip: "10.0.0.6" });
      assert.equal(invalid.status, 401);
    });

    await t.test("CSRF, trusted origins, and open redirects are blocked", async () => {
      const missingOrigin = await request("/sign-out", {
        body: {}, cookieJar: verificationSession, origin: null, ip: "10.0.0.5",
      });
      assert.equal(missingOrigin.status, 403);
      const evilOrigin = await request("/sign-out", {
        body: {}, cookieJar: verificationSession, origin: "https://attacker.example", ip: "10.0.0.5",
      });
      assert.equal(evilOrigin.status, 403);
      const openRedirect = await request("/sign-in/email", {
        body: { email, password, callbackURL: "https://attacker.example" }, ip: "10.0.0.7",
      });
      assert.equal(openRedirect.status, 403);
      const stillActive = await request("/get-session", { cookieJar: verificationSession, ip: "10.0.0.5" });
      assert.equal(stillActive.status, 200);
      assert.ok((await json(stillActive)).session);
    });

    await t.test("logout deletes persisted session", async () => {
      const logout = await request("/sign-out", {
        body: {}, cookieJar: verificationSession, ip: "10.0.0.5",
      });
      assert.equal(logout.status, 200);
      const session = await request("/get-session", { cookieJar: verificationSession, ip: "10.0.0.5" });
      assert.equal(await session.json(), null);
    });

    await t.test("password reset handles expired and invalid tokens, then revokes sessions", async () => {
      const sessionA = new CookieJar();
      const sessionB = new CookieJar();
      await request("/sign-in/email", { body: { email, password }, cookieJar: sessionA, ip: "10.0.0.8" });
      await request("/sign-in/email", { body: { email, password }, cookieJar: sessionB, ip: "10.0.0.9" });

      const invalid = await request("/reset-password", {
        body: { newPassword: "Changed123", token: "invalid" }, ip: "10.0.0.10",
      });
      assert.equal(invalid.status, 400);

      const resetRequest = await request("/request-password-reset", {
        body: { email, redirectTo: `${appUrl}/redefinir-senha` }, ip: "10.0.0.11",
      });
      assert.equal(resetRequest.status, 200);
      let captured = await waitForMessages(3);
      const expiredLink = await messageLink(captured[0]);
      const expiredToken = expiredLink.pathname.split("/").at(-1);
      assert.ok(expiredToken);
      await pool.query("UPDATE verification SET expires_at = now() - interval '1 second'");
      const expired = await request("/reset-password", {
        body: { newPassword: "Changed123", token: expiredToken }, ip: "10.0.0.12",
      });
      assert.equal(expired.status, 400);

      await request("/request-password-reset", {
        body: { email, redirectTo: `${appUrl}/redefinir-senha` }, ip: "10.0.0.13",
      });
      captured = await waitForMessages(4);
      const validLink = await messageLink(captured[0]);
      const token = validLink.pathname.split("/").at(-1);
      assert.ok(token);
      const weak = await request("/reset-password", {
        body: { newPassword: "newpassword", token }, ip: "10.0.0.14",
      });
      assert.equal(weak.status, 400);
      assert.equal((await json(weak)).code, "PASSWORD_POLICY_NOT_MET");

      const reset = await request("/reset-password", {
        body: { newPassword: "Changed123", token }, ip: "10.0.0.15",
      });
      assert.equal(reset.status, 200);
      assert.equal((await pool.query("SELECT count(*)::int AS count FROM session")).rows[0].count, 0);
      assert.equal(await (await request("/get-session", { cookieJar: sessionA, ip: "10.0.0.8" })).json(), null);
      assert.equal((await request("/sign-in/email", { body: { email, password }, ip: "10.0.0.16" })).status, 401);
      assert.equal((await request("/sign-in/email", { body: { email, password: "Changed123" }, ip: "10.0.0.17" })).status, 200);
    });

    await t.test("database-backed rate limiting rejects repeated requests", async () => {
      const statuses: number[] = [];
      for (let attempt = 0; attempt < 4; attempt += 1) {
        statuses.push((await request("/sign-in/email", {
          body: { email, password: "Wrong123" }, ip: "10.0.0.99",
        })).status);
      }
      assert.deepEqual(statuses, [401, 401, 401, 429]);
      const stored = await pool.query("SELECT count(*)::int AS count, max(count)::int AS attempts FROM rate_limit WHERE key LIKE $1", ["10.0.0.99|%"]);
      assert.deepEqual(stored.rows[0], { count: 1, attempts: 3 });
    });

    const providerEmail = "provider-auth@lume.test";
    await t.test("provider signup persists only provider capability", async () => {
      const response = await request("/sign-up/email", {
        body: { name: "Provider Auth", email: providerEmail, password, initialCapability: "provider" },
        ip: "10.0.0.20",
      });
      assert.equal(response.status, 200);
      const rows = await pool.query(`SELECT c.capability FROM "user" u
        JOIN lume_profile_capability c ON c.user_id = u.id WHERE u.email = $1`, [providerEmail]);
      assert.deepEqual(rows.rows, [{ capability: "provider" }]);
    });

    await t.test("profile creation failure rolls back identity and credential", async () => {
      await pool.query(`CREATE FUNCTION reject_test_profile() RETURNS trigger AS $$
        BEGIN
          IF NEW.display_name = 'Reject Profile' THEN RAISE EXCEPTION 'forced profile failure'; END IF;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql`);
      await pool.query(`CREATE TRIGGER reject_test_profile_before_insert
        BEFORE INSERT ON lume_profile FOR EACH ROW EXECUTE FUNCTION reject_test_profile()`);
      try {
        const response = await request("/sign-up/email", {
          body: { name: "Reject Profile", email: "rollback@lume.test", password, initialCapability: "client" },
          ip: "10.0.0.21",
        });
        assert.ok(response.status >= 400);
        assert.equal((await pool.query('SELECT count(*)::int AS count FROM "user" WHERE email = $1', ["rollback@lume.test"])).rows[0].count, 0);
        assert.equal((await pool.query('SELECT count(*)::int AS count FROM account WHERE account_id IN (SELECT id FROM "user" WHERE email = $1)', ["rollback@lume.test"])).rows[0].count, 0);
      } finally {
        await pool.query("DROP TRIGGER reject_test_profile_before_insert ON lume_profile");
        await pool.query("DROP FUNCTION reject_test_profile()");
      }
    });

    await t.test("capability creation failure rolls back identity, credential, and profile", async () => {
      const before = await pool.query(`SELECT
        (SELECT count(*)::int FROM "user") AS users,
        (SELECT count(*)::int FROM account) AS accounts,
        (SELECT count(*)::int FROM lume_profile) AS profiles,
        (SELECT count(*)::int FROM lume_profile_capability) AS capabilities`);
      await pool.query(`CREATE FUNCTION reject_test_capability() RETURNS trigger AS $$
        BEGIN
          IF NEW.capability = 'client' THEN RAISE EXCEPTION 'forced capability failure'; END IF;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql`);
      await pool.query(`CREATE TRIGGER reject_test_capability_before_insert
        BEFORE INSERT ON lume_profile_capability FOR EACH ROW EXECUTE FUNCTION reject_test_capability()`);
      try {
        const response = await request("/sign-up/email", {
          body: { name: "Reject Capability", email: "rollback-capability@lume.test", password, initialCapability: "client" },
          ip: "10.0.0.23",
        });
        assert.ok(response.status >= 400);
        const after = await pool.query(`SELECT
          (SELECT count(*)::int FROM "user") AS users,
          (SELECT count(*)::int FROM account) AS accounts,
          (SELECT count(*)::int FROM lume_profile) AS profiles,
          (SELECT count(*)::int FROM lume_profile_capability) AS capabilities`);
        assert.deepEqual(after.rows, before.rows);
      } finally {
        await pool.query("DROP TRIGGER reject_test_capability_before_insert ON lume_profile_capability");
        await pool.query("DROP FUNCTION reject_test_capability()");
      }
    });

    await t.test("concurrent signup creates one complete identity", async () => {
      const concurrentEmail = "concurrent-signup@lume.test";
      const responses = await Promise.all([
        request("/sign-up/email", {
          body: { name: "Concurrent Signup", email: concurrentEmail, password, initialCapability: "client" },
          ip: "10.0.0.24",
        }),
        request("/sign-up/email", {
          body: { name: "Concurrent Signup", email: concurrentEmail, password, initialCapability: "client" },
          ip: "10.0.0.25",
        }),
      ]);
      assert.ok(responses.every((response) => response.status < 500));
      const stored = await pool.query(`SELECT
        (SELECT count(*)::int FROM "user" WHERE email = $1) AS users,
        (SELECT count(*)::int FROM account WHERE user_id IN (SELECT id FROM "user" WHERE email = $1)) AS accounts,
        (SELECT count(*)::int FROM lume_profile WHERE user_id IN (SELECT id FROM "user" WHERE email = $1)) AS profiles,
        (SELECT count(*)::int FROM lume_profile_capability WHERE user_id IN (SELECT id FROM "user" WHERE email = $1)) AS capabilities`, [concurrentEmail]);
      assert.deepEqual(stored.rows, [{ users: 1, accounts: 1, profiles: 1, capabilities: 1 }]);
    });

    await t.test("public DTOs use persisted profile data", async () => {
      await pool.query(`UPDATE lume_profile SET photo_url = $1, bio = $2, city = $3, region = $4
        WHERE user_id IN (SELECT id FROM "user" WHERE email = $5)`, [
        "https://lume.test/photo.png", "Perfil real", "Porto", "Norte", email,
      ]);
      const stored = await pool.query(`SELECT p.display_name AS "displayName", p.photo_url AS "photoUrl", p.bio, p.city, p.region
        FROM lume_profile p JOIN "user" u ON u.id = p.user_id WHERE u.email = $1`, [email]);
      assert.deepEqual(toPublicClientProfile(stored.rows[0]), {
        displayName: "Real Auth", photoUrl: "https://lume.test/photo.png", bio: "Perfil real",
      });
      assert.deepEqual(toPublicProviderProfile(stored.rows[0]), {
        displayName: "Real Auth", photoUrl: "https://lume.test/photo.png", bio: "Perfil real", city: "Porto", region: "Norte",
      });
    });

    await t.test("capability activation is authenticated, owner-derived, and idempotent", async () => {
      const unauthenticated = await appRequest("/api/capabilities", { body: { capability: "provider" } });
      assert.equal(unauthenticated.status, 401);

      const capabilitySession = new CookieJar();
      const login = await request("/sign-in/email", {
        body: { email, password: "Changed123" }, cookieJar: capabilitySession, ip: "10.0.0.22",
      });
      assert.equal(login.status, 200);
      const providerBefore = await pool.query(`SELECT u.id, count(c.*)::int AS count FROM "user" u
        JOIN lume_profile_capability c ON c.user_id = u.id WHERE u.email = $1 GROUP BY u.id`, [providerEmail]);
      assert.equal(providerBefore.rows[0].count, 1);

      const activated = await Promise.all([0, 1].map(() => appRequest("/api/capabilities", {
          body: { capability: "provider", userId: providerBefore.rows[0].id, isAdmin: true },
          cookieJar: capabilitySession,
        })));
      for (const response of activated) {
        assert.equal(response.status, 200);
        assert.deepEqual(new Set((await json(response)).capabilities as string[]), new Set(["client", "provider"]));
      }
      const currentUser = await pool.query('SELECT id FROM "user" WHERE email = $1', [email]);
      assert.equal((await pool.query("SELECT count(*)::int AS count FROM lume_profile_capability WHERE user_id = $1", [currentUser.rows[0].id])).rows[0].count, 2);
      assert.equal((await pool.query("SELECT count(*)::int AS count FROM lume_profile_capability WHERE user_id = $1", [providerBefore.rows[0].id])).rows[0].count, 1);

      const forged = await appRequest("/api/capabilities", {
        body: { capability: "admin" }, cookieJar: capabilitySession,
      });
      assert.equal(forged.status, 400);
      const missingOrigin = await appRequest("/api/capabilities", {
        body: { capability: "client" }, cookieJar: capabilitySession, origin: null,
      });
      assert.equal(missingOrigin.status, 403);
    });

    await t.test("own profile is authenticated, owner-derived, editable, and private", async () => {
      assert.equal((await appRequest("/api/profile")).status, 401);
      assert.equal((await appRequest("/api/profile", {
        method: "PATCH", body: { displayName: "Intruso", bio: "Sem sessão" },
      })).status, 401);

      const ownerSession = new CookieJar();
      assert.equal((await request("/sign-in/email", {
        body: { email, password: "Changed123" }, cookieJar: ownerSession, ip: "10.0.0.26",
      })).status, 200);
      const provider = await pool.query(`SELECT u.id, p.display_name FROM "user" u
        JOIN lume_profile p ON p.user_id = u.id WHERE u.email = $1`, [providerEmail]);

      const update = await appRequest("/api/profile", {
        method: "PATCH",
        body: {
          displayName: "Perfil Atualizado",
          bio: "Apresentação pública real",
          userId: provider.rows[0].id,
          email: "forged@lume.test",
          capabilities: ["admin"],
        },
        cookieJar: ownerSession,
      });
      assert.equal(update.status, 200);
      const updatedProfile = (await json(update)).profile as JsonObject;
      assert.equal(updatedProfile.displayName, "Perfil Atualizado");
      assert.equal(updatedProfile.bio, "Apresentação pública real");
      assert.deepEqual(new Set(updatedProfile.capabilities as string[]), new Set(["client", "provider"]));
      assert.equal((await pool.query("SELECT display_name FROM lume_profile WHERE user_id = $1", [provider.rows[0].id])).rows[0].display_name, provider.rows[0].display_name);

      const own = await appRequest("/api/profile", { cookieJar: ownerSession });
      assert.equal(own.status, 200);
      const privatePayload = await json(own);
      assert.equal((privatePayload.account as JsonObject).email, email);
      assert.equal("userId" in (privatePayload.profile as JsonObject), false);
      assert.equal("publicSlug" in (privatePayload.profile as JsonObject), false);
      assert.equal("photoUrl" in (privatePayload.profile as JsonObject), false);
      assert.equal("city" in (privatePayload.profile as JsonObject), false);
    });

    await t.test("public profile pages use persisted allowlisted data only", async () => {
      const row = await pool.query(`SELECT p.public_slug FROM lume_profile p
        JOIN "user" u ON u.id = p.user_id WHERE u.email = $1`, [email]);
      const slug = row.rows[0].public_slug;
      const providerPage = await appRequest(`/prestadores/${slug}`);
      assert.equal(providerPage.status, 200);
      const providerHtml = await providerPage.text();
      assert.match(providerHtml, /Perfil Atualizado/);
      assert.match(providerHtml, /Apresentação pública real/);
      assert.match(providerHtml, /Porto/);
      assert.doesNotMatch(providerHtml, new RegExp(email));
      assert.doesNotMatch(providerHtml, /private@lume\.test|Rua privada|\+351/);

      const clientPage = await appRequest(`/clientes/${slug}`);
      assert.equal(clientPage.status, 200);
      const clientHtml = await clientPage.text();
      assert.match(clientHtml, /Perfil Atualizado/);
      assert.doesNotMatch(clientHtml, /Porto|Norte/);
      assert.doesNotMatch(clientHtml, new RegExp(email));
    });

    await t.test("expired session cannot read or edit profile", async () => {
      const expiredSession = new CookieJar();
      await request("/sign-in/email", {
        body: { email, password: "Changed123" }, cookieJar: expiredSession, ip: "10.0.0.27",
      });
      const currentUser = await pool.query('SELECT id FROM "user" WHERE email = $1', [email]);
      await pool.query("UPDATE session SET expires_at = now() - interval '1 second' WHERE user_id = $1", [currentUser.rows[0].id]);
      assert.equal((await appRequest("/api/profile", { cookieJar: expiredSession })).status, 401);
      assert.equal((await appRequest("/api/profile", {
        method: "PATCH", body: { displayName: "Não gravar", bio: null }, cookieJar: expiredSession,
      })).status, 401);
      assert.equal((await pool.query("SELECT display_name FROM lume_profile WHERE user_id = $1", [currentUser.rows[0].id])).rows[0].display_name, "Perfil Atualizado");
    });
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.stack : String(error)}\nNext output:\n${serverOutput}`);
  }
});

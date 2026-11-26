import "server-only";

import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { eq } from "drizzle-orm";

import { db } from "./db";
import * as schema from "./db/schema";
import {
  authConfiguration,
  passwordPolicyMessage,
  satisfiesPasswordPolicy,
} from "./auth-configuration";
import { getEmailSender } from "./email";
import { parseLumeCapability } from "./profiles/capabilities";
import { createPublicProfileSlug } from "./profiles/slug";

function authEnvironment(name: "BETTER_AUTH_SECRET" | "BETTER_AUTH_URL"): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required authentication configuration: ${name}`);
  return value;
}

async function sendAuthEmail(message: { to: string; subject: string; url: string; kind: "verify" | "reset" }) {
  await getEmailSender().send({
    to: message.to,
    subject: message.subject,
    text: `Abra este link para continuar no Lume: ${message.url}`,
    html: `<p>Abra este link para continuar no Lume:</p><p><a href="${message.url}">Continuar no Lume</a></p>`,
  });
}

export const auth = betterAuth({
  appName: "Lume",
  secret: authEnvironment("BETTER_AUTH_SECRET"),
  baseURL: authEnvironment("BETTER_AUTH_URL"),
  trustedOrigins: [authEnvironment("BETTER_AUTH_URL")],
  database: drizzleAdapter(db, { provider: "pg", schema, transaction: true }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: false,
    requireEmailVerification: authConfiguration.requireEmailVerification,
    revokeSessionsOnPasswordReset: authConfiguration.revokeSessionsOnPasswordReset,
    sendResetPassword: async ({ user, url }) => sendAuthEmail({
      to: user.email, url, kind: "reset", subject: "Redefina a senha da sua conta Lume",
    }),
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: authConfiguration.verificationExpiresIn,
    sendVerificationEmail: async ({ user, url }) => sendAuthEmail({
      to: user.email, url, kind: "verify", subject: "Confirme seu e-mail no Lume",
    }),
  },
  session: {
    expiresIn: authConfiguration.sessionExpiresIn,
    updateAge: authConfiguration.sessionUpdateAge,
    cookieCache: { enabled: authConfiguration.cookieCacheEnabled },
  },
  verification: { storeIdentifier: "hashed" },
  rateLimit: { enabled: true, storage: "database" },
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path !== "/sign-up/email" && context.path !== "/reset-password") return;
      const password = context.path === "/sign-up/email"
        ? context.body.password
        : context.body.newPassword;
      if (typeof password === "string" && !satisfiesPasswordPolicy(password)) {
        throw APIError.from("BAD_REQUEST", {
          code: "PASSWORD_POLICY_NOT_MET",
          message: passwordPolicyMessage,
        });
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (_newUser, context) => {
          if (context?.path !== "/sign-up/email") return;
          if (parseLumeCapability(context.body.initialCapability)) return;
          throw APIError.from("BAD_REQUEST", {
            code: "INITIAL_CAPABILITY_REQUIRED",
            message: "Escolha uma capacidade inicial válida.",
          });
        },
        after: async (newUser, context) => {
          if (context?.path !== "/sign-up/email") return;
          const capability = parseLumeCapability(context.body.initialCapability);
          if (!capability) return;

          try {
            await db.transaction(async (tx) => {
              await tx.insert(schema.lumeProfile).values({
                userId: newUser.id,
                publicSlug: createPublicProfileSlug(newUser.name),
                displayName: newUser.name,
              });
              await tx.insert(schema.lumeProfileCapability).values({
                userId: newUser.id,
                capability,
              });
            });
          } catch (error) {
            // Better Auth creates users outside adapter transactions. Remove
            // identity here; cascading FKs also remove any partial profile.
            await db.delete(schema.user).where(eq(schema.user.id, newUser.id));
            throw error;
          }
        },
      },
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    disableCSRFCheck: false,
    disableOriginCheck: false,
    database: { validateSchema: process.env.NODE_ENV !== "production" },
  },
});

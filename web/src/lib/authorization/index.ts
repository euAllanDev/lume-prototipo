import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { safeReturnTo } from "@/lib/auth-redirect";
import { type LumeCapability } from "@/lib/profiles/capabilities";
import { checkCapability } from "@/lib/profiles/server";

export { safeReturnTo } from "@/lib/auth-redirect";

export async function getCurrentSession() {
  return auth.api.getSession({ headers: await headers(), query: { disableCookieCache: true } });
}

export async function requireSession(returnTo?: string) {
  const session = await getCurrentSession();
  if (!session) redirect(`/entrar?returnTo=${encodeURIComponent(safeReturnTo(returnTo))}`);
  return session;
}

export async function requireVerifiedEmail() {
  const session = await requireSession();
  if (!session.user.emailVerified) throw new Error("EMAIL_VERIFICATION_REQUIRED");
  return session;
}

export async function getCurrentCapabilityAccess(capability: LumeCapability) {
  return checkCapability(await getCurrentSession(), capability);
}

export async function requireCapability(capability: LumeCapability) {
  const access = await getCurrentCapabilityAccess(capability);
  if (access.status === "unauthenticated") throw new Error("AUTHENTICATION_REQUIRED");
  if (access.status === "missing-capability") throw new Error("CAPABILITY_REQUIRED");
  return access;
}

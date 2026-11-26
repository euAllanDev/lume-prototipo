import { auth } from "@/lib/auth";
import { getOwnProfile, updateOwnProfile } from "@/lib/profiles/server";

const noStoreHeaders = { "Cache-Control": "no-store", Pragma: "no-cache" };
const maxDisplayNameLength = 120;
const maxBioLength = 1_000;

async function currentSession(request: Request) {
  return auth.api.getSession({ headers: request.headers, query: { disableCookieCache: true } });
}

function isTrustedMutation(request: Request): boolean {
  const origin = request.headers.get("origin");
  const configuredOrigin = process.env.BETTER_AUTH_URL;
  if (!origin || !configuredOrigin) return false;
  try {
    return new URL(origin).origin === new URL(configuredOrigin).origin;
  } catch {
    return false;
  }
}

function parseProfileUpdate(body: unknown): { displayName: string; bio: string | null } | null {
  if (typeof body !== "object" || body === null) return null;
  const { displayName, bio } = body as Record<string, unknown>;
  if (typeof displayName !== "string") return null;
  const normalizedName = displayName.trim();
  if (!normalizedName || normalizedName.length > maxDisplayNameLength) return null;
  if (bio !== null && typeof bio !== "string") return null;
  const normalizedBio = bio?.trim() || null;
  if (normalizedBio && normalizedBio.length > maxBioLength) return null;
  return { displayName: normalizedName, bio: normalizedBio };
}

export async function GET(request: Request) {
  const session = await currentSession(request);
  if (!session) return Response.json({ code: "UNAUTHENTICATED" }, { status: 401, headers: noStoreHeaders });
  const profile = await getOwnProfile(session.user.id);
  if (!profile) return Response.json({ code: "PROFILE_NOT_FOUND" }, { status: 404, headers: noStoreHeaders });
  return Response.json({ profile, account: { email: session.user.email, emailVerified: session.user.emailVerified } }, { headers: noStoreHeaders });
}

export async function PATCH(request: Request) {
  if (!isTrustedMutation(request)) return Response.json({ code: "UNTRUSTED_ORIGIN" }, { status: 403, headers: noStoreHeaders });
  const session = await currentSession(request);
  if (!session) return Response.json({ code: "UNAUTHENTICATED" }, { status: 401, headers: noStoreHeaders });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ code: "INVALID_BODY" }, { status: 400, headers: noStoreHeaders });
  }
  const update = parseProfileUpdate(body);
  if (!update) return Response.json({ code: "INVALID_PROFILE" }, { status: 400, headers: noStoreHeaders });
  const profile = await updateOwnProfile(session.user.id, update);
  if (!profile) return Response.json({ code: "PROFILE_NOT_FOUND" }, { status: 404, headers: noStoreHeaders });
  return Response.json({ profile }, { headers: noStoreHeaders });
}

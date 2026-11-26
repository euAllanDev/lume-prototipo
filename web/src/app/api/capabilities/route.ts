import { auth } from "@/lib/auth";
import { parseLumeCapability } from "@/lib/profiles/capabilities";
import { activateCapability, getUserCapabilities } from "@/lib/profiles/server";

const noStoreHeaders = { "Cache-Control": "no-store", Pragma: "no-cache" };

async function currentSession(request: Request) {
  return auth.api.getSession({
    headers: request.headers,
    query: { disableCookieCache: true },
  });
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

export async function GET(request: Request) {
  const session = await currentSession(request);
  if (!session) {
    return Response.json({ code: "UNAUTHENTICATED" }, { status: 401, headers: noStoreHeaders });
  }
  return Response.json(
    { capabilities: await getUserCapabilities(session.user.id) },
    { headers: noStoreHeaders },
  );
}

export async function POST(request: Request) {
  if (!isTrustedMutation(request)) {
    return Response.json({ code: "UNTRUSTED_ORIGIN" }, { status: 403, headers: noStoreHeaders });
  }
  const session = await currentSession(request);
  if (!session) {
    return Response.json({ code: "UNAUTHENTICATED" }, { status: 401, headers: noStoreHeaders });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ code: "INVALID_BODY" }, { status: 400, headers: noStoreHeaders });
  }
  const capability = parseLumeCapability(
    typeof body === "object" && body !== null && "capability" in body
      ? body.capability
      : null,
  );
  if (!capability) {
    return Response.json({ code: "INVALID_CAPABILITY" }, { status: 400, headers: noStoreHeaders });
  }

  await activateCapability(session.user.id, capability);
  return Response.json(
    { capabilities: await getUserCapabilities(session.user.id) },
    { headers: noStoreHeaders },
  );
}

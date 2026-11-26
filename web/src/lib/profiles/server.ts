import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { lumeProfile, lumeProfileCapability } from "@/lib/db/schema";

import type { LumeCapability } from "./capabilities";

export type CapabilityAccess =
  | { status: "unauthenticated" }
  | { status: "missing-capability"; userId: string; capability: LumeCapability }
  | { status: "authorized"; userId: string; capability: LumeCapability };

export async function getUserCapabilities(userId: string): Promise<LumeCapability[]> {
  const rows = await db
    .select({ capability: lumeProfileCapability.capability })
    .from(lumeProfileCapability)
    .where(eq(lumeProfileCapability.userId, userId));
  return rows.map((row) => row.capability);
}

export async function checkCapability(
  session: { user: { id: string } } | null,
  capability: LumeCapability,
): Promise<CapabilityAccess> {
  if (!session) return { status: "unauthenticated" };
  const [assignment] = await db
    .select({ userId: lumeProfileCapability.userId })
    .from(lumeProfileCapability)
    .where(and(
      eq(lumeProfileCapability.userId, session.user.id),
      eq(lumeProfileCapability.capability, capability),
    ))
    .limit(1);
  return assignment
    ? { status: "authorized", userId: session.user.id, capability }
    : { status: "missing-capability", userId: session.user.id, capability };
}

export async function activateCapability(userId: string, capability: LumeCapability): Promise<void> {
  await db
    .insert(lumeProfileCapability)
    .values({ userId, capability })
    .onConflictDoNothing({
      target: [lumeProfileCapability.userId, lumeProfileCapability.capability],
    });
}

export type OwnProfile = {
  displayName: string;
  bio: string | null;
  capabilities: LumeCapability[];
};

export async function getOwnProfile(userId: string): Promise<OwnProfile | null> {
  const [profile] = await db
    .select({ displayName: lumeProfile.displayName, bio: lumeProfile.bio })
    .from(lumeProfile)
    .where(eq(lumeProfile.userId, userId))
    .limit(1);
  if (!profile) return null;
  return { ...profile, capabilities: await getUserCapabilities(userId) };
}

export async function updateOwnProfile(
  userId: string,
  profile: Pick<OwnProfile, "displayName" | "bio">,
): Promise<OwnProfile | null> {
  const [updated] = await db
    .update(lumeProfile)
    .set({ ...profile, updatedAt: new Date() })
    .where(eq(lumeProfile.userId, userId))
    .returning({ displayName: lumeProfile.displayName, bio: lumeProfile.bio });
  return updated ? { ...updated, capabilities: await getUserCapabilities(userId) } : null;
}

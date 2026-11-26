import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { lumeProfile, lumeProfileCapability } from "@/lib/db/schema";

import { toPublicClientProfile, toPublicProviderProfile } from "./public-dto";

const publicProfileSelection = {
  displayName: lumeProfile.displayName,
  photoUrl: lumeProfile.photoUrl,
  bio: lumeProfile.bio,
  city: lumeProfile.city,
  region: lumeProfile.region,
};

export async function getPublicClientProfile(userId: string) {
  const [profile] = await db
    .select(publicProfileSelection)
    .from(lumeProfile)
    .innerJoin(lumeProfileCapability, and(
      eq(lumeProfileCapability.userId, lumeProfile.userId),
      eq(lumeProfileCapability.capability, "client"),
    ))
    .where(eq(lumeProfile.userId, userId))
    .limit(1);
  return profile ? toPublicClientProfile(profile) : null;
}

export async function getPublicClientProfileBySlug(publicSlug: string) {
  const [profile] = await db
    .select(publicProfileSelection)
    .from(lumeProfile)
    .innerJoin(lumeProfileCapability, and(
      eq(lumeProfileCapability.userId, lumeProfile.userId),
      eq(lumeProfileCapability.capability, "client"),
    ))
    .where(eq(lumeProfile.publicSlug, publicSlug))
    .limit(1);
  return profile ? toPublicClientProfile(profile) : null;
}

export async function getPublicProviderProfile(userId: string) {
  const [profile] = await db
    .select(publicProfileSelection)
    .from(lumeProfile)
    .innerJoin(lumeProfileCapability, and(
      eq(lumeProfileCapability.userId, lumeProfile.userId),
      eq(lumeProfileCapability.capability, "provider"),
    ))
    .where(eq(lumeProfile.userId, userId))
    .limit(1);
  return profile ? toPublicProviderProfile(profile) : null;
}

export async function getPublicProviderProfileBySlug(publicSlug: string) {
  const [profile] = await db
    .select(publicProfileSelection)
    .from(lumeProfile)
    .innerJoin(lumeProfileCapability, and(
      eq(lumeProfileCapability.userId, lumeProfile.userId),
      eq(lumeProfileCapability.capability, "provider"),
    ))
    .where(eq(lumeProfile.publicSlug, publicSlug))
    .limit(1);
  return profile ? toPublicProviderProfile(profile) : null;
}

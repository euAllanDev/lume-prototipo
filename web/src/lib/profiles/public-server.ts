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

/**
 * Versões tolerantes a falhas para as páginas públicas: se o banco estiver indisponível,
 * registram o erro no servidor e devolvem null, para a página cair nos dados de demonstração
 * (ou na página não encontrada) em vez de mostrar uma tela de erro ao visitante.
 */
async function withDatabaseFallback<T>(lookup: () => Promise<T | null>, context: string): Promise<T | null> {
  try {
    return await lookup();
  } catch (error) {
    console.error(`[profiles] ${context}: consulta ao banco falhou, usando o fallback público.`, error);
    return null;
  }
}

export function findPublicProviderProfileBySlug(publicSlug: string) {
  return withDatabaseFallback(() => getPublicProviderProfileBySlug(publicSlug), `prestador "${publicSlug}"`);
}

export function findPublicClientProfileBySlug(publicSlug: string) {
  return withDatabaseFallback(() => getPublicClientProfileBySlug(publicSlug), `cliente "${publicSlug}"`);
}

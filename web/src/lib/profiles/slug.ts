import "server-only";

import { randomBytes } from "node:crypto";

export function createPublicProfileSlug(displayName: string): string {
  const stem = displayName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "perfil";
  const suffix = randomBytes(8).toString("hex");
  return `${stem}-${suffix}`;
}

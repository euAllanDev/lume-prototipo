export const lumeCapabilities = ["client", "provider"] as const;

export type LumeCapability = (typeof lumeCapabilities)[number];

export function parseLumeCapability(value: unknown): LumeCapability | null {
  return typeof value === "string" && lumeCapabilities.includes(value as LumeCapability)
    ? value as LumeCapability
    : null;
}

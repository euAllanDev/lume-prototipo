export function safeReturnTo(value: string | null | undefined): string {
  if (!value?.startsWith("/") || value.includes("\\")) return "/";

  try {
    const decoded = decodeURIComponent(value);
    return decoded.startsWith("//") || decoded.includes("\\") ? "/" : value;
  } catch {
    return "/";
  }
}

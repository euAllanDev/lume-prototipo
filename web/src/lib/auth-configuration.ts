export const authConfiguration = {
  sessionExpiresIn: 60 * 60 * 24 * 7,
  sessionUpdateAge: 60 * 60 * 24,
  verificationExpiresIn: 60 * 60,
  requireEmailVerification: false,
  revokeSessionsOnPasswordReset: true,
  cookieCacheEnabled: false,
} as const;

export const passwordPolicyMessage = "Inclua uma maiúscula e um número.";

export function satisfiesPasswordPolicy(password: string): boolean {
  return /[A-Z]/.test(password) && /\d/.test(password);
}

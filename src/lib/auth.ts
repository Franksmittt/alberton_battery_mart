// Soft staff login — password only in production via ADMIN_PASSWORD env var.
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@abm";

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

/** @deprecated Username is no longer required; kept for backwards compatibility. */
export function verifyCredentials(username: string, password: string): boolean {
  return verifyPassword(password);
}

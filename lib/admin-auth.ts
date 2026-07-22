import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "jr_admin_session";

function getPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  return process.env.NODE_ENV === "development" ? "demo" : "";
}

function tokenFor(password: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || "development-only-secret";
  return createHash("sha256").update(`${password}:${secret}`).digest("hex");
}

export function validateAdminPassword(value: string) {
  const expected = Buffer.from(getPassword());
  const received = Buffer.from(value);
  return expected.length > 0 && expected.length === received.length && timingSafeEqual(expected, received);
}

export function createAdminToken() {
  return tokenFor(getPassword());
}

export async function isAdmin() {
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(value && value === createAdminToken());
}

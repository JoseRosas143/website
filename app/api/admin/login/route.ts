import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken, validateAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { password = "" } = (await request.json()) as { password?: string };
  if (!validateAdminPassword(password)) return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminToken(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8, path: "/" });
  return response;
}

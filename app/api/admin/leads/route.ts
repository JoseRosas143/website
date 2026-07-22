import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getLeads } from "@/lib/storage";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  try {
    return NextResponse.json(await getLeads());
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "No fue posible cargar las solicitudes." }, { status: 503 });
  }
}

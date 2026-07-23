import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { mergeSiteContent } from "@/lib/site-content";
import { getSiteContent, saveSiteContent } from "@/lib/storage";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  return NextResponse.json(await getSiteContent());
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  try {
    const content = mergeSiteContent(await request.json());
    for (const page of [content.home, content.aprende, content.research, content.ramx, ...Object.values(content.pages)]) {
      if (!page.title.trim() || !page.description.trim() || !page.primaryCta.trim()) return NextResponse.json({ error: "Los campos principales no pueden quedar vacíos." }, { status: 400 });
    }
    const result = await saveSiteContent(content);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "No fue posible guardar." }, { status: 503 });
  }
}

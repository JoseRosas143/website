import { NextResponse } from "next/server";
import { createLead } from "@/lib/storage";
import { serviceOptions } from "@/lib/site-content";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().toLowerCase().slice(0, 180);
    const phone = String(body.phone || "").trim().slice(0, 40);
    const company = String(body.company || "").trim().slice(0, 160);
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim().slice(0, 4000);
    const source = String(body.source || "website").trim().slice(0, 60);
    if (!name || !emailPattern.test(email) || phone.length < 7 || !message || !(serviceOptions as readonly string[]).includes(service)) {
      return NextResponse.json({ error: "Revisa los campos obligatorios." }, { status: 400 });
    }
    await createLead({ name, email, phone, company, service, message, source });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No fue posible registrar la solicitud.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

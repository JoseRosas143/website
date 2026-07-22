import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { message?: string; history?: Array<{ role: "assistant" | "user"; text: string }> };
    const message = payload.message?.trim(); if (!message) return NextResponse.json({ error: "Escribe un mensaje." }, { status: 400 });
    const content = await getSiteContent();
    const knowledge = content.knowledge.map((item) => `Tema: ${item.topic}\nPregunta: ${item.question}\nRespuesta: ${item.answer}`).join("\n\n");
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ reply: fallback(message, content.knowledge.map((item) => item.answer)) });
    const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-5-mini", input: [{ role: "system", content: `Eres el concierge comercial de J R Consulting en Puebla, México. Responde en español, con claridad y amabilidad. No inventes coberturas, precios, alianzas, certificaciones ni fechas. Prioriza orientar y recomendar el siguiente paso: cotización, agenda o WhatsApp 221 375 9147. Si el usuario deja datos o pide cotización, invítalo a usar el formulario. Base de conocimientos aprobada:\n${knowledge}` }, ...(payload.history || []).map((item) => ({ role: item.role === "assistant" ? "assistant" : "user", content: item.text }))] }) });
    if (!response.ok) return NextResponse.json({ reply: fallback(message, content.knowledge.map((item) => item.answer)) });
    const data = await response.json() as { output_text?: string }; return NextResponse.json({ reply: data.output_text || fallback(message, content.knowledge.map((item) => item.answer)) });
  } catch { return NextResponse.json({ error: "No fue posible responder." }, { status: 500 }); }
}
function fallback(message: string, answers: string[]) { const found = answers.find((answer) => answer.toLowerCase().includes(message.toLowerCase().split(" ")[0] || "___")); return found || "Con gusto te orientamos. Para darte una recomendación útil, cuéntame si te interesa Seguros, un website, tecnología, capacitación, investigación o RAMX. También puedes escribirnos al 221 375 9147."; }

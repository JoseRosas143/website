import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { isAdmin } from "@/lib/admin-auth";

const MAX_FILE_SIZE = 4_000_000;
const TEXT_TYPES = new Set(["txt", "md", "csv", "json"]);

function extension(name: string) {
  return name.split(".").pop()?.toLowerCase() || "";
}

export async function extractDocumentText(file: { name: string; arrayBuffer(): Promise<ArrayBuffer>; text(): Promise<string> }) {
  const ext = extension(file.name);
  let text = "";
  if (ext === "docx") {
    const result = await mammoth.extractRawText({ buffer: Buffer.from(await file.arrayBuffer()) });
    text = result.value;
  } else if (TEXT_TYPES.has(ext)) {
    text = await file.text();
  } else {
    throw new Error("Formato no compatible. Usa DOCX, TXT, MD, CSV o JSON.");
  }
  return text
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Selecciona un archivo válido." }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "El archivo supera 4 MB." }, { status: 413 });

    const normalized = await extractDocumentText(file);
    if (!normalized) return NextResponse.json({ error: "No se encontró texto legible en el documento." }, { status: 422 });

    return NextResponse.json({ text: normalized.slice(0, 80_000), truncated: normalized.length > 80_000 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? `No fue posible leer el documento: ${error.message}` : "No fue posible leer el documento."
    }, { status: 422 });
  }
}

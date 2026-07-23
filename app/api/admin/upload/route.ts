import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxBytes = 4 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    const data = await request.formData();
    const file = data.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Selecciona una imagen." }, { status: 400 });
    if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Usa una imagen JPG, PNG o WebP." }, { status: 400 });
    if (file.size > maxBytes) return NextResponse.json({ error: "La imagen supera 4 MB." }, { status: 400 });

    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const objectName = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const response = await fetch(`${url}/storage/v1/object/cms-assets/${objectName}`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": file.type,
          "x-upsert": "false"
        },
        body: bytes
      });
      if (!response.ok) throw new Error("No fue posible guardar la imagen en Supabase Storage.");
      return NextResponse.json({ url: `${url}/storage/v1/object/public/cms-assets/${objectName}` });
    }

    if (process.env.NODE_ENV !== "development" && process.env.CMS_LOCAL_WRITES !== "true") {
      return NextResponse.json({ error: "Configura Supabase para habilitar cargas persistentes." }, { status: 503 });
    }

    const relativePath = path.join("uploads", ...objectName.split("/"));
    const destination = path.join(process.cwd(), "public", relativePath);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, bytes);
    return NextResponse.json({ url: `/${relativePath.replaceAll("\\", "/")}` });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "No fue posible subir la imagen." }, { status: 500 });
  }
}

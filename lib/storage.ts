import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultContent, Lead, mergeSiteContent, SiteContent } from "@/lib/site-content";

const contentPath = path.join(process.cwd(), "data", "runtime-content.json");
const leadsPath = path.join(process.cwd(), "data", "runtime-leads.json");

function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

function allowLocalWrites() {
  return process.env.NODE_ENV === "development" || process.env.CMS_LOCAL_WRITES === "true";
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const config = supabaseConfig();
  if (config) {
    try {
      const response = await fetch(
        `${config.url}/rest/v1/site_content?key=eq.global&select=content&limit=1`,
        {
          headers: {
            apikey: config.key,
            Authorization: `Bearer ${config.key}`
          },
          cache: "no-store"
        }
      );
      if (response.ok) {
        const rows = (await response.json()) as Array<{ content: unknown }>;
        if (rows[0]?.content) return mergeSiteContent(rows[0].content);
      }
    } catch {
      // El contenido predeterminado mantiene el sitio disponible si el CMS falla.
    }
  }
  return mergeSiteContent(await readJson(contentPath, defaultContent));
}

export async function saveSiteContent(content: SiteContent) {
  const normalized = mergeSiteContent(content);
  const config = supabaseConfig();
  if (config) {
    const response = await fetch(`${config.url}/rest/v1/site_content?on_conflict=key`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify({ key: "global", content: normalized, updated_at: new Date().toISOString() })
    });
    if (!response.ok) throw new Error("No fue posible guardar el contenido en Supabase.");
    return { storage: "supabase" as const };
  }
  if (!allowLocalWrites()) {
    throw new Error("Configura Supabase para habilitar ediciones persistentes en producción.");
  }
  await fs.mkdir(path.dirname(contentPath), { recursive: true });
  await fs.writeFile(contentPath, JSON.stringify(normalized, null, 2), "utf8");
  return { storage: "local" as const };
}

export async function createLead(lead: Lead) {
  const record = {
    ...lead,
    id: crypto.randomUUID(),
    status: "nuevo" as const,
    created_at: new Date().toISOString()
  };
  const config = supabaseConfig();
  if (config) {
    const response = await fetch(`${config.url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(record)
    });
    if (!response.ok) throw new Error("No fue posible registrar la solicitud.");
    return record;
  }
  if (!allowLocalWrites()) throw new Error("El formulario requiere configurar Supabase.");
  const leads = await readJson<Lead[]>(leadsPath, []);
  leads.unshift(record);
  await fs.writeFile(leadsPath, JSON.stringify(leads.slice(0, 200), null, 2), "utf8");
  return record;
}

export async function getLeads(): Promise<Lead[]> {
  const config = supabaseConfig();
  if (config) {
    const response = await fetch(
      `${config.url}/rest/v1/leads?select=*&order=created_at.desc&limit=100`,
      {
        headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
        cache: "no-store"
      }
    );
    if (!response.ok) throw new Error("No fue posible cargar las solicitudes.");
    return (await response.json()) as Lead[];
  }
  return readJson<Lead[]>(leadsPath, []);
}

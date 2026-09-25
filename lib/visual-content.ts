export type VisualEdits = Record<string, string>;
export type VisualSelection = { id: string; kind: "text" | "image" | "link"; value: string; label: string };
export type VisualSectionInfo = { id: string; title: string };

export function safeContentUrl(value: string, image = false): string {
  const url = value.trim();
  if (/[\u0000-\u0020\u007f\\]/.test(url)) return "";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (!image && (url.startsWith("#") || /^(mailto:|tel:)/i.test(url))) return url;
  return /^https?:\/\//i.test(url) ? url : "";
}

export function normalizeVisualEdits(value: unknown): VisualEdits {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key, text]) =>
    /^[a-zA-Z0-9_.:-]{1,200}$/.test(key) && typeof text === "string" && text.length <= 20000
  ).slice(0, 2500));
}

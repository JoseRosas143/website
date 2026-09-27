import TurndownService from "turndown";
import { safeContentUrl } from "./visual-content";

export const imageTypes = new Set(["image/png", "image/jpeg", "image/webp"]);
export async function uploadBlogImage(file: File): Promise<string> {
  if (!imageTypes.has(file.type)) throw new Error("Usa imágenes PNG, JPG o WebP.");
  if (!file.size || file.size > 4 * 1024 * 1024) throw new Error("Cada imagen debe pesar entre 1 byte y 4 MB.");
  const form = new FormData(); form.append("file", file);
  const response = await fetch("/api/admin/upload", { method: "POST", body: form });
  const result = await response.json();
  if (!response.ok || typeof result.url !== "string" || !safeContentUrl(result.url, true)) throw new Error(result.error || "No se pudo subir la imagen. Tu texto sigue intacto.");
  return result.url;
}
export function imageMarkdown(url: string, alt = "Descripción de la imagen") {
  return `![${alt.replace(/[\[\]\\\r\n]/g, " ")}](<${url.replace(/[<>]/g, (char) => encodeURIComponent(char))}>)`;
}

/** Parse clipboard HTML in a detached document; never insert it into the live DOM. */
export async function htmlToBlogMarkdown(html: string, upload = uploadBlogImage) {
  if (html.length > 24_000_000) throw new Error("Pega el artículo en partes más pequeñas.");
  const doc = new DOMParser().parseFromString(html, "text/html");
  const warnings: string[] = [];
  doc.querySelectorAll("script,style,iframe,object,embed,form,input,button,svg,noscript").forEach((node) => node.remove());
  // ChatGPT/KaTeX carries the original TeX in an annotation. Keep one copy only.
  doc.querySelectorAll('.katex,math,[data-math]').forEach((node) => {
    if (!doc.body.contains(node)) return;
    const tex = node.getAttribute("data-math") || node.querySelector('annotation[encoding="application/x-tex"]')?.textContent;
    if (!tex) return;
    const display = node.closest(".katex-display") || (node.getAttribute("display") === "block" ? node : null);
    const replacement = doc.createElement("span");
    replacement.setAttribute("data-blog-tex", tex);
    replacement.setAttribute("data-display", display ? "true" : "false");
    replacement.textContent = tex;
    (display || node).replaceWith(replacement);
  });
  const images = Array.from(doc.querySelectorAll("img"));
  if (images.length > 20) throw new Error("Pega como máximo 20 imágenes a la vez.");
  for (const img of images) {
    const src = img.getAttribute("src") || "";
    if (/^data:image\/(png|jpeg|webp);base64,/i.test(src)) {
      const [prefix, data] = src.split(",");
      if (data.length > 5_600_000) throw new Error("Una imagen supera 4 MB.");
      const bytes = Uint8Array.from(atob(data), (char) => char.charCodeAt(0));
      img.setAttribute("src", await upload(new File([bytes], "imagen-pegada", { type: prefix.slice(5, prefix.indexOf(";")) })));
    } else if (!safeContentUrl(src, true) || src.startsWith("/")) {
      img.replaceWith(doc.createTextNode(`[Imagen pendiente: ${img.getAttribute("alt") || "pega o sube el archivo original"}]`));
      warnings.push("Algunas imágenes no tenían una dirección pública. Pega o sube sus archivos por separado.");
    }
  }
  const converter = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });
  converter.addRule("math", { filter: (node) => node.hasAttribute("data-blog-tex"), replacement: (_text, node) => {
    const element = node as HTMLElement, tex = element.getAttribute("data-blog-tex") || "";
    return element.getAttribute("data-display") === "true" ? `\n\n$$\n${tex}\n$$\n\n` : `$${tex}$`;
  } });
  converter.addRule("safe-images", { filter: "img", replacement: (_text, node) => {
    const img = node as HTMLImageElement;
    return imageMarkdown(img.getAttribute("src") || "", img.alt);
  } });
  converter.addRule("safe-links", { filter: "a", replacement: (text, node) => {
    const href = safeContentUrl((node as HTMLElement).getAttribute("href") || "");
    return href ? `[${text}](<${href.replace(/[<>]/g, (char) => encodeURIComponent(char))}>)` : text;
  } });
  converter.addRule("strike", { filter: ["s", "del"], replacement: (text) => `~~${text}~~` });
  converter.addRule("table", { filter: "table", replacement: (_text, node) => {
    const table = node as HTMLTableElement;
    if (table.querySelector("[rowspan],[colspan]")) warnings.push("Las celdas combinadas se simplificaron. Revisa la tabla en la vista previa.");
    const rows = Array.from(table.rows).map((row) => Array.from(row.cells).map((cell) => converter.turndown(cell.innerHTML).replace(/\|/g, "\\|").replace(/\n+/g, " ")));
    if (!rows.length) return "";
    const width = Math.max(...rows.map((row) => row.length));
    const line = (row: string[]) => `| ${Array.from({ length: width }, (_, i) => row[i] || "").join(" | ")} |`;
    return `\n\n${line(rows[0])}\n${line(Array(width).fill("---"))}\n${rows.slice(1).map(line).join("\n")}\n\n`;
  } });
  return { markdown: converter.turndown(doc.body), warnings: [...new Set(warnings)] };
}


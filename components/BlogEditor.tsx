"use client";
import { useEffect, useRef, useState, type ClipboardEvent, type DragEvent } from "react";
import { ArticleContent } from "@/components/ArticleContent";
import { htmlToBlogMarkdown, imageMarkdown, uploadBlogImage } from "@/lib/blog-paste";

export function BlogEditor({ value, onChange, onBusyChange }: { value: string; onChange: (value: string) => void; onBusyChange?: (busy: boolean) => void }) {
  const field = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const mounted = useRef(true);
  const pending = useRef(false);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; onBusyChange?.(false); }; }, [onBusyChange]);
  function range() { return { start: field.current?.selectionStart ?? value.length, end: field.current?.selectionEnd ?? value.length }; }
  function replace(text: string, selection = range()) {
    onChange(value.slice(0, selection.start) + text + value.slice(selection.end));
    requestAnimationFrame(() => { field.current?.focus(); field.current?.setSelectionRange(selection.start + text.length, selection.start + text.length); });
  }
  function insert(before: string, after = "", placeholder = "Texto") {
    const selection = range();
    replace(before + (value.slice(selection.start, selection.end) || placeholder) + after, selection);
  }
  async function importContent(action: () => Promise<{ markdown: string; warnings?: string[] }>) {
    if (pending.current) return;
    const selection = range();
    pending.current = true; setBusy(true); onBusyChange?.(true); setNotice("Preparando contenido…");
    try {
      const result = await action();
      if (!mounted.current) return;
      replace(result.markdown, selection);
      setNotice(result.warnings?.length ? result.warnings.join(" ") : "Contenido insertado. Revisa la vista previa antes de publicar.");
    } catch (error) {
      if (mounted.current) setNotice(error instanceof Error ? error.message : "No se pudo pegar el contenido. Tu texto sigue intacto.");
    } finally {
      pending.current = false;
      if (mounted.current) { setBusy(false); onBusyChange?.(false); }
    }
  }
  function images(files: File[]) {
    void importContent(async () => {
      if (files.length > 20) throw new Error("Sube como máximo 20 imágenes a la vez.");
      const urls: string[] = [];
      for (const file of files) urls.push(imageMarkdown(await uploadBlogImage(file)));
      return { markdown: "\n\n" + urls.join("\n\n") + "\n\n" };
    });
  }
  function paste(event: ClipboardEvent<HTMLTextAreaElement>) {
    const html = event.clipboardData.getData("text/html");
    const files = Array.from(event.clipboardData.files).filter((file) => file.type.startsWith("image/"));
    if (html) { event.preventDefault(); void importContent(async () => { const result = await htmlToBlogMarkdown(html); return { ...result, markdown: "\n\n" + result.markdown + "\n\n" }; }); }
    else if (files.length) { event.preventDefault(); images(files); }
    // Plain Markdown and tab-separated text remain available without conversion.
  }
  function drop(event: DragEvent<HTMLTextAreaElement>) {
    if (!event.dataTransfer.files.length) return;
    event.preventDefault(); if (!busy) images(Array.from(event.dataTransfer.files));
  }
  return <div className="cms-blog-composer" aria-busy={busy}>
    <div className="cms-format-toolbar" role="toolbar" aria-label="Formato del artículo">
      <button type="button" onClick={() => insert("**", "**")} disabled={preview || busy}><strong>Negrita</strong></button>
      <button type="button" onClick={() => insert("*", "*")} disabled={preview || busy}><em>Cursiva</em></button>
      <button type="button" onClick={() => insert("\n\n## ", "\n", "Subtítulo")} disabled={preview || busy}>Subtítulo</button>
      <button type="button" onClick={() => insert("\n- ", "\n", "Elemento")} disabled={preview || busy}>Lista</button>
      <button type="button" onClick={() => insert("\n> ", "\n", "Cita o nota destacada")} disabled={preview || busy}>Cita</button>
      <button type="button" onClick={() => insert("[", "](https://ejemplo.com)", "Texto del enlace")} disabled={preview || busy}>Enlace</button>
      <button type="button" onClick={() => insert("\n\n", "\n", "| Característica | Opción A | Opción B |\n| --- | --- | --- |\n| Ventaja | Dato | Dato |\n| Costo | Dato | Dato |")} disabled={preview || busy}>Tabla</button>
      <button type="button" onClick={() => fileInput.current?.click()} disabled={preview || busy}>Imagen</button>
      <button type="button" onClick={() => insert("\n\n$$\n", "\n$$\n", "ROI = \\frac{beneficio - costo}{costo} \\times 100")} disabled={preview || busy}>Fórmula</button>
      <button type="button" onClick={() => insert("\n\n```\n", "\n```\n", "Código o ejemplo")} disabled={preview || busy}>Código</button>
      <button type="button" onClick={() => setPreview(!preview)} disabled={busy} aria-pressed={preview}>{preview ? "Editar contenido" : "Vista previa del artículo"}</button>
    </div>
    <input ref={fileInput} hidden type="file" multiple accept="image/png,image/jpeg,image/webp" aria-label="Imágenes del artículo" onChange={(event) => { const files = Array.from(event.target.files || []); event.target.value = ""; if (files.length) images(files); }} />
    {preview ? <div className="cms-blog-preview"><ArticleContent body={value} /></div> :
      <label>Contenido del artículo<textarea ref={field} className="cms-article-editor" rows={18} value={value} readOnly={busy} onPaste={paste} onDrop={drop} onDragOver={(event) => event.preventDefault()} onChange={(event) => onChange(event.target.value)} /></label>}
    {notice && <p role="status" className="cms-help">{notice}</p>}
    <p className="cms-help">Pega texto con formato o imágenes, o arrastra archivos al campo. Imágenes PNG, JPG o WebP, hasta 4 MB cada una. Puedes cambiar «Descripción de la imagen» por un texto accesible.</p>
    <p className="cms-help">Las tablas y comparaciones se conservan al copiar con formato. Fórmulas: $x^2$ en línea o $$ en líneas separadas. También se aceptan delimitadores LaTeX. Usa Vista previa para revisar el resultado.</p>
  </div>;
}

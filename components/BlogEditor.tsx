"use client";
import { useRef, useState } from "react";
import { ArticleContent } from "@/components/ArticleContent";

export function BlogEditor({ value, onChange }: { value: string; onChange: (value:string) => void }) {
  const field = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);
  function insert(before: string, after = "", placeholder = "Texto") {
    const input = field.current;
    const start = input?.selectionStart ?? value.length;
    const end = input?.selectionEnd ?? start;
    onChange(value.slice(0,start) + before + (value.slice(start,end) || placeholder) + after + value.slice(end));
    requestAnimationFrame(() => { input?.focus(); input?.setSelectionRange(start + before.length, start + before.length + (end - start || placeholder.length)); });
  }
  return <div className="cms-blog-composer">
    <div className="cms-format-toolbar" role="toolbar" aria-label="Formato del artículo">
      <button type="button" onClick={() => insert("**","**")} disabled={preview}><strong>Negrita</strong></button>
      <button type="button" onClick={() => insert("*","*")} disabled={preview}><em>Cursiva</em></button>
      <button type="button" onClick={() => insert("\n\n## ","\n","Subtítulo")} disabled={preview}>Subtítulo</button>
      <button type="button" onClick={() => insert("\n- ","\n","Elemento")} disabled={preview}>Lista</button>
      <button type="button" onClick={() => insert("[","](https://ejemplo.com)","Texto del enlace")} disabled={preview}>Enlace</button>
      <button type="button" onClick={() => insert("\n\n", "\n", "| Columna 1 | Columna 2 |\n| --- | --- |\n| Dato | Dato |")} disabled={preview}>Tabla</button>
      <button type="button" onClick={() => setPreview(!preview)} aria-pressed={preview}>{preview ? "Editar contenido" : "Vista previa del artículo"}</button>
    </div>
    {preview ? <div className="cms-blog-preview"><ArticleContent body={value} /></div> :
      <label>Contenido del artículo<textarea ref={field} className="cms-article-editor" rows={18} value={value} onChange={(event) => onChange(event.target.value)} /></label>}
    <p className="cms-help">Selecciona texto y usa la barra. También puedes pegar Markdown: negritas, encabezados, listas, enlaces y tablas.</p>
  </div>;
}

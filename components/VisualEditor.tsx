"use client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { type ManagedPage, type PageKey } from "@/lib/site-content";
import { safeContentUrl, type VisualSectionInfo, type VisualSelection } from "@/lib/visual-content";

export function VisualEditor({ page, pageKey, route, device, onChange, uploadImage, uploading }: {
  page: ManagedPage; pageKey: PageKey; route: string; device: string;
  onChange: (patch: Partial<ManagedPage>) => void;
  uploadImage: (event: ChangeEvent<HTMLInputElement>, done: (url:string) => void) => void;
  uploading: string;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const latest = useRef(page);
  useEffect(() => { latest.current = page; }, [page]);
  const [selection, setSelection] = useState<VisualSelection | null>(null);
  const [sections, setSections] = useState<VisualSectionInfo[]>([]);
  const [ready, setReady] = useState(false);
  const [activeBlock, setActiveBlock] = useState("");
  const additions = page.blocks.filter((block) => block.id.includes("-" + pageKey + "-"));
  const block = additions.find((item) => item.id === activeBlock);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || event.data?.pageKey !== pageKey) return;
      if (event.data.type === "cms:ready") {
        setReady(true);
        frame.current?.contentWindow?.postMessage({ type: "cms:draft", pageKey, page: latest.current }, window.location.origin);
      }
      if (event.data.type === "cms:sections") setSections(event.data.sections);
      if (event.data.type === "cms:select") { setSelection(event.data.selection); setActiveBlock(""); }
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [pageKey]);
  useEffect(() => {
    if (ready) frame.current?.contentWindow?.postMessage({ type:"cms:draft", pageKey, page }, window.location.origin);
  }, [page, pageKey, ready]);
  function edit(value:string) {
    if (selection) onChange({ visualEdits: { ...page.visualEdits, [selection.id]:value } });
  }
  function move(id:string, direction:number) {
    const order = sections.map((item) => item.id);
    const index = order.indexOf(id), next = index + direction;
    if (next < 0 || next >= order.length) return;
    [order[index],order[next]] = [order[next],order[index]];
    onChange({ sectionOrder:order });
  }
  function add() {
    const id = "rich-text-" + pageKey + "-" + crypto.randomUUID();
    onChange({ blocks:[...page.blocks,{ id, type:"rich-text", title:"Nueva sección", body:"Escribe tu contenido.", enabled:true }] });
    setActiveBlock(id); setSelection(null);
  }
  const current = selection ? page.visualEdits?.[selection.id] ?? selection.value : "";
  return <section className="cms-visual-workspace">
    <aside className="cms-visual-outline">
      <h2>Secciones de la página</h2>
      <p>Selecciona un texto o imagen directamente en la vista. Usa ↗ para editar el destino de un enlace.</p>
      {!ready && <p role="status">Cargando vista de la página…</p>}
      {sections.map((item,index) => <div className="cms-section-row" key={item.id}>
        <button type="button" onClick={() => frame.current?.contentDocument?.querySelector('[data-cms-section="' + item.id + '"]')?.scrollIntoView({behavior:"smooth",block:"center"})}>{item.title}</button>
        <div>
          <button type="button" aria-label={"Subir sección " + item.title} disabled={index === 0} onClick={() => move(item.id,-1)}>↑</button>
          <button type="button" aria-label={"Bajar sección " + item.title} disabled={index === sections.length - 1} onClick={() => move(item.id,1)}>↓</button>
          <button type="button" onClick={() => onChange({hiddenSections: page.hiddenSections?.includes(item.id) ? page.hiddenSections.filter((id) => id !== item.id) : [...page.hiddenSections || [],item.id]})}>{page.hiddenSections?.includes(item.id) ? "Mostrar" : "Ocultar"}</button>
        </div>
      </div>)}
      <h3>Contenido adicional</h3>
      {additions.map((item) => <button className="cms-addition-item" type="button" key={item.id} onClick={() => {setActiveBlock(item.id);setSelection(null);}}>{item.title || "Sin título"}{!item.enabled && " (oculto)"}</button>)}
      <button className="button button--outline" type="button" onClick={add}>Agregar sección</button>
    </aside>
    <div className="cms-real-canvas">
      <div className="cms-preview-caption">Vista real · Los cambios se publican solo al guardar</div>
      <iframe ref={frame} key={pageKey} title="Vista editable de la página" src={route + "?__cms=1"} className={"cms-real-frame is-" + device} />
    </div>
    <aside className="cms-inspector cms-visual-inspector">
      {selection ? <>
        <h2>{selection.label}</h2>
        <label>{selection.kind === "text" ? "Texto seleccionado" : "Dirección"}
          {selection.kind === "text" ? <textarea rows={9} value={current} onChange={(event) => edit(event.target.value)} /> : <input value={current} onChange={(event) => edit(event.target.value)} />}
        </label>
        {selection.kind !== "text" && current && !safeContentUrl(current,selection.kind === "image") && <p role="alert">Usa una dirección https:// o una ruta del sitio que comience con /.</p>}
        {selection.kind === "image" && <>
          <label>Descripción de la imagen<input value={page.visualEdits?.[selection.id + ".alt"] || ""} onChange={(event) => onChange({visualEdits:{...page.visualEdits,[selection.id + ".alt"]:event.target.value}})} /></label>
          <label>Subir imagen<input type="file" accept="image/jpeg,image/png,image/webp" disabled={!!uploading} onChange={(event) => uploadImage(event,edit)} /></label>
        </>}
        <button type="button" onClick={() => {const edits={...page.visualEdits};delete edits[selection.id];onChange({visualEdits:edits});setSelection(null);}}>Restaurar este elemento</button>
      </> : block ? <>
        <h2>Sección adicional</h2>
        {(["title","body","ctaLabel","ctaHref","mediaUrl"] as const).map((field) => <label key={field}>{{title:"Título",body:"Contenido (Markdown)",ctaLabel:"Texto del botón",ctaHref:"Destino del botón",mediaUrl:"Imagen"}[field]}
          <textarea rows={field === "body" ? 7 : 2} value={block[field] || ""} onChange={(event) => onChange({blocks:page.blocks.map((item) => item.id === block.id ? {...item,[field]:event.target.value} : item)})} /></label>)}
        <label>Subir imagen<input type="file" accept="image/jpeg,image/png,image/webp" disabled={!!uploading} onChange={(event) => uploadImage(event,(url) => onChange({blocks:page.blocks.map((item) => item.id === block.id ? {...item,mediaUrl:url} : item)}))} /></label>
        <label><input type="checkbox" checked={block.enabled} onChange={(event) => onChange({blocks:page.blocks.map((item) => item.id === block.id ? {...item,enabled:event.target.checked} : item)})} /> Mostrar sección</label>
        <button type="button" onClick={() => {onChange({blocks:page.blocks.filter((item) => item.id !== block.id)});setActiveBlock("");}}>Eliminar sección</button>
      </> : <>
        <h2>Selecciona un elemento</h2>
        <p>Haz clic en el contenido de la página para editarlo aquí y ver el resultado al instante.</p>
        <p>La navegación global, los gráficos y los campos de los formularios se muestran como referencia. Su funcionamiento no se modifica desde este editor.</p>
      </>}
    </aside>
  </section>;
}

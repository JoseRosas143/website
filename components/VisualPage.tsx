"use client";
/* eslint-disable @next/next/no-img-element */
import { Fragment, createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { type ManagedPage, type PageKey } from "@/lib/site-content";
import { safeContentUrl, type VisualSelection } from "@/lib/visual-content";

type Context = { page: ManagedPage; preview: boolean; select: (selection: VisualSelection) => void };
const VisualContext = createContext<Context | null>(null);
export function useVisualPage() { return useContext(VisualContext); }

export function VisualPage({ pageKey, initialPage, children }: { pageKey: PageKey; initialPage: ManagedPage; children: ReactNode }) {
  const [draft, setDraft] = useState<ManagedPage | null>(null);
  const [preview, setPreview] = useState(false);
  const page = draft || initialPage;
  useEffect(() => {
    if (window.parent === window || new URLSearchParams(window.location.search).get("__cms") !== "1") return;
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window.parent) return;
      if (event.data?.type === "cms:draft" && event.data.pageKey === pageKey) { setPreview(true); setDraft(event.data.page); }
    };
    const stopSubmit = (event: Event) => { event.preventDefault(); event.stopImmediatePropagation(); };
    const stopNavigation = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a,button,input,select,textarea,form")) event.preventDefault();
      if (target.closest("form,.calendar-button-wrap")) event.stopImmediatePropagation();
    };
    window.addEventListener("message", receive);
    document.addEventListener("submit", stopSubmit, true);
    document.addEventListener("click", stopNavigation, true);
    document.documentElement.classList.add("cms-preview-mode");
    window.parent.postMessage({ type: "cms:ready", pageKey }, window.location.origin);
    return () => {
      window.removeEventListener("message", receive);
      document.removeEventListener("submit", stopSubmit, true);
      document.removeEventListener("click", stopNavigation, true);
      document.documentElement.classList.remove("cms-preview-mode");
    };
  }, [pageKey]);
  useEffect(() => {
    if (!preview) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-cms-section]")).map((element) => ({
      id: element.dataset.cmsSection!,
      title: element.querySelector("h1,h2,h3")?.textContent?.slice(0,100) || "Sección"
    }));
    window.parent.postMessage({ type: "cms:sections", pageKey, sections }, window.location.origin);
  }, [preview, page, pageKey]);
  return <VisualContext.Provider value={{ page, preview, select(selection) {
    if (preview) window.parent.postMessage({ type: "cms:select", pageKey, selection }, window.location.origin);
  } }}>{children}</VisualContext.Provider>;
}

export function VisualText({ id, text }: { id: string; text: string }) {
  const context = useVisualPage();
  const value = context?.page.visualEdits?.[id] ?? text;
  if (!context?.preview) return <>{value}</>;
  return <span className="cms-editable-text" data-cms-field={id} tabIndex={0}
    onClick={(event) => { event.preventDefault(); event.stopPropagation(); context.select({ id, value, kind: "text", label: "Texto seleccionado" }); }}
    onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); context.select({ id, value, kind: "text", label: "Texto seleccionado" }); } }}
    title="Haz clic para editar">{value}</span>;
}

export function VisualLink({ id, href, children, ...props }: { id: string; href: string; children?: ReactNode; className?: string; target?: string; rel?: string; "aria-label"?: string }) {
  const context = useVisualPage();
  const value = context?.page.visualEdits?.[id] ?? href;
  return <a {...props} href={safeContentUrl(value) || "#"} data-cms-link={context?.preview ? id : undefined}
    onClick={context?.preview ? (event) => { event.preventDefault(); event.stopPropagation(); context.select({ id, value, kind: "link", label: "Destino del enlace" }); } : undefined}>{children}
    {context?.preview && <span className="cms-link-edit" role="button" tabIndex={0} aria-label="Editar destino del enlace"
      onClick={(event) => { event.preventDefault(); event.stopPropagation(); context.select({ id, value, kind: "link", label: "Destino del enlace" }); }}
      onKeyDown={(event) => { if(event.key === "Enter") { event.preventDefault(); context.select({ id, value, kind:"link", label:"Destino del enlace" }); } }}>↗</span>}
  </a>;
}

export function VisualImage({ id, children, source, alt, imageProps }: { id: string; children: ReactNode; source: string; alt: string; imageProps: { className?: string; width?: number; height?: number; style?: CSSProperties } }) {
  const context = useVisualPage();
  const src = safeContentUrl(context?.page.visualEdits?.[id] ?? source, true) || source;
  const caption = context?.page.visualEdits?.[id + ".alt"] ?? alt;
  // Server component children can be lazy React nodes; do not inspect or clone them.
  const image = src === source && caption === alt ? children : <img {...imageProps} src={src} alt={caption} />;
  if (!context?.preview) return image;
  return <span className="cms-editable-image" data-cms-field={id} role="button" tabIndex={0} title="Editar imagen"
    onClick={(event) => { event.preventDefault(); event.stopPropagation(); context.select({ id, value: src, kind: "image", label: "Imagen seleccionada" }); }}
    onKeyDown={(event) => { if(event.key === "Enter") context.select({ id, value:src, kind:"image", label:"Imagen seleccionada" }); }}>{image}</span>;
}

export function VisualSection({ id, attributes, children }: { id: string; attributes: Record<string, unknown>; children: ReactNode }) {
  const context = useVisualPage();
  const hidden = context?.page.hiddenSections?.includes(id);
  if (hidden && !context?.preview) return null;
  return <section {...attributes} data-cms-section={id} className={String(attributes.className || "") + (hidden ? " cms-section-hidden" : "")}>{children}</section>;
}

export function VisualGroup({ items }: { items: { id: string; section: boolean; node: ReactNode }[] }) {
  const context = useVisualPage();
  const order = context?.page.sectionOrder || [];
  const sections = items.filter((item) => item.section);
  const ids = sections.map((item) => item.id);
  const effective = [...order.filter((id) => ids.includes(id)), ...ids.filter((id) => !order.includes(id))];
  const sorted = [...sections].sort((a,b) => effective.indexOf(a.id) - effective.indexOf(b.id));
  let index=0;
  return <>{items.map((item) => { const current=item.section ? sorted[index++] : item; return <Fragment key={current.id}>{current.node}</Fragment>; })}</>;
}

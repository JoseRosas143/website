"use client";

import { ArrowUpRight, BookOpen, Check, ExternalLink, FileText, Home, LogOut, MessageSquareText, Monitor, Plus, Redo2, Save, Search, Settings, Sparkles, Smartphone, Tablet, Trash2, Undo2, Upload, Users } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { BlogEditor } from "@/components/BlogEditor";
import { VisualEditor } from "@/components/VisualEditor";
import { Logo } from "@/components/Logo";
import {
  BlogPost,
  editablePageLabels,
  KnowledgeItem,
  Lead,
  pageFor,
  PageKey,
  SiteContent
} from "@/lib/site-content";

type Section = "summary" | "pages" | "blog" | "knowledge" | "leads" | "settings";
type Device = "desktop" | "tablet" | "mobile";

const pageRoutes: Record<PageKey, string> = {
  home: "/",
  growthlab: "/growth-lab",
  soluciones: "/soluciones",
  workspace: "/google-workspace",
  websites: "/websites",
  seguros: "/seguros",
  aprende: "/aprende",
  research: "/research",
  ramx: "/ramx",
  nosotros: "/nosotros",
  contacto: "/contacto"
};

export function AdminDashboard({ initialContent, initialLeads }: { initialContent: SiteContent; initialLeads: Lead[] }) {
  const [content, setContent] = useState(initialContent);
  const contentRef = useRef(initialContent);
  const [undoStack, setUndoStack] = useState<SiteContent[]>([]);
  const [redoStack, setRedoStack] = useState<SiteContent[]>([]);
  const [dirty, setDirty] = useState(false);
  const [selected, setSelected] = useState<PageKey>("home");
  const [section, setSection] = useState<Section>("summary");
  const [device, setDevice] = useState<Device>("desktop");
  const [selectedPostId, setSelectedPostId] = useState(content.blog[0]?.id || "");
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState(content.knowledge[0]?.id || "");
  const [knowledgeQuery, setKnowledgeQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const page = pageFor(content, selected);
  const selectedPost = content.blog.find((post) => post.id === selectedPostId);
  const selectedKnowledge = content.knowledge.find((item) => item.id === selectedKnowledgeId);
  const leads = useMemo(() => initialLeads.slice(0, 100), [initialLeads]);
  const filteredKnowledge = useMemo(() => {
    const query = knowledgeQuery.trim().toLowerCase();
    if (!query) return content.knowledge;
    return content.knowledge.filter((item) => `${item.topic} ${item.question} ${item.answer}`.toLowerCase().includes(query));
  }, [content.knowledge, knowledgeQuery]);

  function applyContent(update: SiteContent | ((current: SiteContent) => SiteContent)) {
    const current = contentRef.current;
    const next = typeof update === "function" ? update(current) : update;
    if (next === current) return;
    setUndoStack((stack) => [...stack.slice(-39), current]);
    setRedoStack([]);
    contentRef.current = next;
    setContent(next);
    setDirty(true);
    setNotice("");
  }

  function undo() {
    const previous = undoStack.at(-1);
    if (!previous) return;
    const current = contentRef.current;
    setRedoStack((stack) => [current, ...stack].slice(0, 40));
    setUndoStack((stack) => stack.slice(0, -1));
    contentRef.current = previous;
    setContent(previous);
    setDirty(true);
  }

  function redo() {
    const next = redoStack[0];
    if (!next) return;
    const current = contentRef.current;
    setUndoStack((stack) => [...stack, current].slice(-40));
    setRedoStack((stack) => stack.slice(1));
    contentRef.current = next;
    setContent(next);
    setDirty(true);
  }

  function addPost() {
    const id = crypto.randomUUID();
    const post: BlogPost = {
      id,
      title: "Nuevo artículo",
      slug: `nuevo-articulo-${content.blog.length + 1}`,
      excerpt: "Escribe un resumen breve que invite a leer.",
      body: "Comienza a escribir el artículo aquí.",
      category: "J R Consulting",
      imageUrl: "",
      tags: [],
      published: false,
      publishedAt: new Date().toISOString()
    };
    applyContent((current) => ({ ...current, blog: [post, ...current.blog] }));
    setSelectedPostId(id);
  }

  function updatePost(id: string, field: keyof BlogPost, value: string | boolean | string[]) {
    applyContent((current) => ({
      ...current,
      blog: current.blog.map((post) => post.id === id ? { ...post, [field]: value } : post)
    }));
  }

  function addKnowledge() {
    const id = crypto.randomUUID();
    const item: KnowledgeItem = {
      id,
      topic: "General",
      question: "Nueva pregunta o intención",
      answer: "Redacta la respuesta aprobada que el agente debe utilizar.",
      updatedAt: new Date().toISOString()
    };
    applyContent((current) => ({ ...current, knowledge: [item, ...current.knowledge] }));
    setSelectedKnowledgeId(id);
  }

  function updateKnowledge(id: string, field: keyof KnowledgeItem, value: string) {
    applyContent((current) => ({
      ...current,
      knowledge: current.knowledge.map((item) => item.id === id ? { ...item, [field]: value, updatedAt: new Date().toISOString() } : item)
    }));
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>, onComplete: (url: string) => void) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(file.name);
    try {
      const data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: data });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "No fue posible subir la imagen.");
      onComplete(result.url);
      setNotice("Imagen cargada. Publica los cambios para conservarla en el contenido.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "No fue posible subir la imagen.");
    } finally {
      setUploading("");
      event.target.value = "";
    }
  }

  async function importKnowledgeFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(file.name);
    try {
      const data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/admin/import-document", { method: "POST", body: data });
      const result = await response.json() as { text?: string; truncated?: boolean; error?: string };
      if (!response.ok || !result.text) throw new Error(result.error || "No fue posible importar el documento.");
      const id = crypto.randomUUID();
      const item: KnowledgeItem = {
        id,
        topic: "Documento importado",
        question: `Información de ${file.name}`,
        answer: result.text,
        sourceName: file.name,
        updatedAt: new Date().toISOString()
      };
      applyContent((current) => ({ ...current, knowledge: [item, ...current.knowledge] }));
      setSelectedKnowledgeId(id);
      setNotice(`Documento importado${result.truncated ? " (se conservaron los primeros 80,000 caracteres)" : ""}. Revisa el contenido y publica los cambios.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "No fue posible importar el archivo.");
    } finally {
      setUploading("");
      event.target.value = "";
    }
  }

  async function save() {
    setSaving(true);
    setNotice("");
    const submitted = contentRef.current;
    try {
      const response = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitted)
      });
      const data = await response.json() as { storage?: string; error?: string };
      if (response.ok && contentRef.current === submitted) {
        setDirty(false);
        setUndoStack([]);
        setRedoStack([]);
      }
      setNotice(response.ok ? `Cambios publicados${data.storage === "local" ? " en modo local" : ""}.` : data.error || "No fue posible guardar.");
    } catch {
      setNotice("No se pudo conectar con el servidor.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const sectionTitle = {
    summary: ["Resumen", "El estado actual del sitio y sus contenidos."],
    pages: ["Páginas del sitio", "Edita el contenido, orden y visibilidad sin tocar código."],
    blog: ["Blog", "Crea, edita y publica artículos con imagen de portada."],
    knowledge: ["Base de conocimientos", "Alimenta las respuestas aprobadas del asistente virtual."],
    leads: ["Leads", "Revisa contactos y oportunidades captados por el sitio."],
    settings: ["Configuración", "Actualiza los datos generales de contacto."]
  }[section];

  return (
    <div className="cms-shell">
      <aside className="cms-sidebar">
        <Logo inverted />
        <nav aria-label="Administración">
          <SidebarButton active={section === "summary"} icon={Home} label="Resumen" onClick={() => setSection("summary")} />
          <SidebarButton active={section === "pages"} icon={FileText} label="Páginas" onClick={() => setSection("pages")} />
          <SidebarButton active={section === "blog"} icon={BookOpen} label="Blog" count={content.blog.length} detail="Artículos e imágenes" onClick={() => setSection("blog")} />
          <SidebarButton active={section === "knowledge"} icon={MessageSquareText} label="Base de conocimientos" count={content.knowledge.length} detail="Archivos, temas y chatbot" onClick={() => setSection("knowledge")} />
          <SidebarButton active={section === "leads"} icon={Users} label="Leads" count={leads.length} detail="Contactos y oportunidades" onClick={() => setSection("leads")} />
          <div className="cms-nav-divider" />
          <SidebarButton active={section === "settings"} icon={Settings} label="Configuración" onClick={() => setSection("settings")} />
        </nav>
        <button className="cms-logout" onClick={logout}><LogOut /> <span>Cerrar sesión</span></button>
      </aside>

      <main className="cms-main">
        <header className="cms-header">
          <div>
            <h1>{sectionTitle[0]}</h1>
            <p>{section === "pages" ? `Sitio web / ${editablePageLabels[selected]}` : sectionTitle[1]}</p>
          </div>
          {section === "pages" && (
            <div className="cms-editor-commandbar" aria-label="Herramientas del editor">
              <label>
                <span className="sr-only">Página actual</span>
                <select value={selected} onChange={(event) => { setSelected(event.target.value as PageKey); }}>
                  {Object.entries(editablePageLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </label>
              <div className="cms-history-actions">
                <button onClick={undo} disabled={!undoStack.length} aria-label="Deshacer" title="Deshacer"><Undo2 /></button>
                <button onClick={redo} disabled={!redoStack.length} aria-label="Rehacer" title="Rehacer"><Redo2 /></button>
              </div>
              <div className="cms-device-actions" aria-label="Vista adaptable">
                <button className={device === "desktop" ? "is-active" : ""} onClick={() => setDevice("desktop")} aria-label="Vista de escritorio"><Monitor /></button>
                <button className={device === "tablet" ? "is-active" : ""} onClick={() => setDevice("tablet")} aria-label="Vista de tableta"><Tablet /></button>
                <button className={device === "mobile" ? "is-active" : ""} onClick={() => setDevice("mobile")} aria-label="Vista móvil"><Smartphone /></button>
              </div>
              <span className={`cms-save-state${dirty ? " is-dirty" : ""}`}>{dirty ? "Cambios sin publicar" : "Cambios guardados"}</span>
            </div>
          )}
          <div className="cms-header-actions">
            <a className="button button--outline" href={section === "pages" ? pageRoutes[selected] : section === "blog" ? "/blog" : "/"} target="_blank" rel="noreferrer">Ver sitio <ExternalLink size={16} /></a>
            {section !== "leads" && <button className="button button--primary" onClick={save} disabled={saving}><Save size={16} />{saving ? "Publicando…" : "Publicar cambios"}</button>}
          </div>
        </header>

        {notice && <div className={notice.startsWith("Cambios publicados") || notice.startsWith("Imagen") || notice.startsWith("Documento") ? "cms-notice" : "cms-error"}>{notice.startsWith("Cambios publicados") && <Check />}{notice}</div>}

        {section === "summary" && (
          <section className="cms-summary">
            <div className="cms-summary-grid">
              <article><span>Páginas administrables</span><strong>{Object.keys(editablePageLabels).length}</strong><button onClick={() => setSection("pages")}>Gestionar páginas <ArrowUpRight /></button></article>
              <article><span>Artículos</span><strong>{content.blog.length}</strong><button onClick={() => setSection("blog")}>Abrir Blog <ArrowUpRight /></button></article>
              <article><span>Respuestas aprobadas</span><strong>{content.knowledge.length}</strong><button onClick={() => setSection("knowledge")}>Ver conocimiento <ArrowUpRight /></button></article>
              <article><span>Leads recientes</span><strong>{leads.length}</strong><button onClick={() => setSection("leads")}>Revisar leads <ArrowUpRight /></button></article>
            </div>
            <div className="cms-summary-note"><Sparkles /><div><h2>Tu panel ya funciona como centro editorial.</h2><p>Publica contenido, agrega bloques, crea artículos y controla la información que utiliza el agente virtual desde un solo lugar.</p></div></div>
          </section>
        )}

        {section === "pages" && <VisualEditor key={selected} page={page} pageKey={selected} route={pageRoutes[selected]} device={device} onChange={(patch) => applyContent((current) => updateSelectedPage(current, selected, patch))} uploadImage={uploadImage} uploading={uploading} />}

        {section === "blog" && (
          <section className="cms-split-workspace">
            <div className="cms-item-list">
              <div className="cms-panel-heading"><div><h2>Artículos</h2><p>{content.blog.length} en total</p></div><button aria-label="Crear artículo" onClick={addPost}><Plus /></button></div>
              {content.blog.length === 0 && <div className="cms-mini-empty">Crea tu primer artículo.</div>}
              {content.blog.map((post) => <button key={post.id} className={selectedPostId === post.id ? "is-selected" : ""} onClick={() => setSelectedPostId(post.id)}><span>{post.published ? "Publicado" : "Borrador"}</span><strong>{post.title}</strong><small>{post.category}</small></button>)}
            </div>
            <div className="cms-editor-surface">
              {selectedPost ? <>
                <div className="cms-editor-title"><div><span>{selectedPost.published ? "Publicado" : "Borrador"}</span><h2>{selectedPost.title}</h2></div><button className="cms-delete" onClick={() => { applyContent((current) => ({ ...current, blog: current.blog.filter((item) => item.id !== selectedPost.id) })); setSelectedPostId(""); }}><Trash2 />Eliminar</button></div>
                <div className="cms-two-fields"><label>Título<input value={selectedPost.title} onChange={(event) => updatePost(selectedPost.id, "title", event.target.value)} /></label><label>URL / slug<input value={selectedPost.slug} onChange={(event) => updatePost(selectedPost.id, "slug", slugify(event.target.value))} /></label></div>
                <label>Resumen<textarea rows={3} value={selectedPost.excerpt} onChange={(event) => updatePost(selectedPost.id, "excerpt", event.target.value)} /></label>
                <BlogEditor value={selectedPost.body} onChange={(value) => updatePost(selectedPost.id, "body", value)} />
                <label>Etiquetas (separadas por comas)<input value={(selectedPost.tags || []).join(",")} placeholder="Estrategia, Tecnología, Growth Lab" onChange={(event) => updatePost(selectedPost.id, "tags", event.target.value.split(","))} /></label>
                <div className="cms-two-fields"><label>Categoría<input value={selectedPost.category} onChange={(event) => updatePost(selectedPost.id, "category", event.target.value)} /></label><label>Imagen de portada<input value={selectedPost.imageUrl || ""} placeholder="https://…" onChange={(event) => updatePost(selectedPost.id, "imageUrl", event.target.value)} /></label></div>
                <label className="cms-upload cms-upload--horizontal"><Upload /><span><strong>{uploading || "Subir imagen de portada"}</strong><small>JPG, PNG o WebP · máximo 4 MB</small></span><input type="file" accept="image/jpeg,image/png,image/webp" disabled={Boolean(uploading)} onChange={(event) => uploadImage(event, (url) => updatePost(selectedPost.id, "imageUrl", url))} /></label>
                <label className="cms-toggle"><input type="checkbox" checked={selectedPost.published} onChange={(event) => updatePost(selectedPost.id, "published", event.target.checked)} /><span><strong>Publicar artículo</strong><small>Será visible en el Blog</small></span></label>
              </> : <div className="cms-empty"><BookOpen /><h2>Selecciona o crea un artículo.</h2><p>Desde aquí puedes redactar, agregar una portada y publicarlo.</p></div>}
            </div>
          </section>
        )}

        {section === "knowledge" && (
          <section className="cms-split-workspace">
            <div className="cms-item-list">
              <div className="cms-panel-heading"><div><h2>Conocimiento</h2><p>{content.knowledge.length} respuestas</p></div><button onClick={addKnowledge}><Plus /></button></div>
              <label className="cms-search"><Search /><input value={knowledgeQuery} onChange={(event) => setKnowledgeQuery(event.target.value)} placeholder="Buscar tema o pregunta" /></label>
              <label className="cms-import"><Upload /><span><strong>{uploading || "Importar documento"}</strong><small>DOCX, TXT, MD, CSV o JSON · 4 MB</small></span><input type="file" accept=".docx,.txt,.md,.csv,.json" disabled={Boolean(uploading)} onChange={importKnowledgeFile} /></label>
              {filteredKnowledge.map((item) => <button key={item.id} className={selectedKnowledgeId === item.id ? "is-selected" : ""} onClick={() => setSelectedKnowledgeId(item.id)}><span>{item.topic}</span><strong>{item.question}</strong><small>{item.sourceName || "Respuesta manual"}</small></button>)}
            </div>
            <div className="cms-editor-surface">
              {selectedKnowledge ? <>
                <div className="cms-editor-title"><div><span>Respuesta aprobada</span><h2>{selectedKnowledge.question}</h2></div><button className="cms-delete" onClick={() => { applyContent((current) => ({ ...current, knowledge: current.knowledge.filter((item) => item.id !== selectedKnowledge.id) })); setSelectedKnowledgeId(""); }}><Trash2 />Eliminar</button></div>
                {selectedKnowledge.sourceName && <div className="cms-source"><FileText /><div><strong>{selectedKnowledge.sourceName}</strong><small>Contenido importado y disponible para el agente</small></div></div>}
                <label>Tema<input value={selectedKnowledge.topic} onChange={(event) => updateKnowledge(selectedKnowledge.id, "topic", event.target.value)} /></label>
                <label>Pregunta, intención o título<input value={selectedKnowledge.question} onChange={(event) => updateKnowledge(selectedKnowledge.id, "question", event.target.value)} /></label>
                <label>Información aprobada<textarea className="cms-article-editor" rows={20} value={selectedKnowledge.answer} onChange={(event) => updateKnowledge(selectedKnowledge.id, "answer", event.target.value)} /></label>
                <p className="cms-help">El asistente usa este contenido como fuente interna. Revisa que sea correcto, vigente y que no prometa precios, alianzas o condiciones que no estén confirmadas.</p>
              </> : <div className="cms-empty"><MessageSquareText /><h2>Selecciona una respuesta.</h2><p>También puedes importar un archivo de texto para convertirlo en conocimiento del agente.</p></div>}
            </div>
          </section>
        )}

        {section === "leads" && (
          <section className="cms-stack">
            <div className="cms-leads-heading"><div><h2>Prospectos recientes</h2><p>Solicitudes de formularios y conversaciones del asistente.</p></div><span>{leads.length} registros</span></div>
            {leads.length ? <div className="cms-lead-table">{leads.map((lead) => <article key={lead.id || `${lead.email}-${lead.created_at}`}><div><strong>{lead.name}</strong><small>{lead.email} · {lead.phone}</small></div><span>{lead.service}</span><p>{lead.message}</p><a href={`https://wa.me/52${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">Contactar <ArrowUpRight /></a></article>)}</div> : <div className="cms-empty"><Users /><h2>Aún no hay solicitudes.</h2><p>Las cotizaciones y los leads captados por el asistente aparecerán aquí.</p></div>}
          </section>
        )}

        {section === "settings" && (
          <section className="cms-settings">
            <div><h2>Datos de contacto</h2><p>Se utilizan en formularios, botones de WhatsApp y respuestas del asistente.</p></div>
            <div className="cms-settings-form"><label>Teléfono visible<input value={content.contact.phone} onChange={(event) => applyContent((current) => ({ ...current, contact: { ...current.contact, phone: event.target.value } }))} /></label><label>Número para WhatsApp<input value={content.contact.whatsapp} onChange={(event) => applyContent((current) => ({ ...current, contact: { ...current.contact, whatsapp: event.target.value } }))} /></label></div>
          </section>
        )}
      </main>
    </div>
  );
}

function SidebarButton({ active, icon: Icon, label, count, detail, onClick }: { active: boolean; icon: typeof Home; label: string; count?: number; detail?: string; onClick: () => void }) {
  return <button className={active ? "is-active" : ""} onClick={onClick}><Icon /><span><strong>{label}</strong>{detail && <small>{detail}</small>}</span>{typeof count === "number" && <i>{count}</i>}</button>;
}

function updateSelectedPage(content: SiteContent, selected: PageKey, patch: Partial<ReturnType<typeof pageFor>>): SiteContent {
  if (selected in content.pages) return { ...content, pages: { ...content.pages, [selected]: { ...content.pages[selected as keyof typeof content.pages], ...patch } } };
  return { ...content, [selected]: { ...content[selected as "home" | "aprende" | "research" | "ramx"], ...patch } };
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

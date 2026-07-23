"use client";
/* eslint-disable @next/next/no-img-element */

import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  GripVertical,
  Home,
  Image as ImageIcon,
  Layers3,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Monitor,
  MousePointer2,
  Plus,
  Redo2,
  Save,
  Search,
  Settings,
  Sparkles,
  Smartphone,
  Tablet,
  Trash2,
  Undo2,
  Upload,
  Users
} from "lucide-react";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import {
  BlogPost,
  CmsBlock,
  editablePageLabels,
  KnowledgeItem,
  Lead,
  pageFor,
  PageKey,
  SiteContent
} from "@/lib/site-content";

type Section = "summary" | "pages" | "blog" | "knowledge" | "leads" | "settings";
type Device = "desktop" | "tablet" | "mobile";
type BuilderTab = "blocks" | "layers";

const blockIcons: Record<CmsBlock["type"], typeof Sparkles> = {
  hero: Sparkles,
  insurance: Settings,
  services: LayoutDashboard,
  story: BookOpen,
  ecosystem: ChevronRight,
  benefits: BarChart3,
  process: GripVertical,
  referral: ArrowUpRight,
  implementation: Settings,
  legal: FileText,
  cta: ArrowUpRight,
  "rich-text": FileText
};

const pageRoutes: Record<PageKey, string> = {
  home: "/",
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

const blockTemplates: Array<{ type: CmsBlock["type"]; label: string; description: string }> = [
  { type: "hero", label: "Hero", description: "Encabezado principal con título, texto, botón e imagen." },
  { type: "benefits", label: "Beneficios", description: "Ventajas o características principales." },
  { type: "process", label: "Proceso", description: "Pasos ordenados para explicar cómo funciona." },
  { type: "services", label: "Servicios", description: "Oferta de servicios o soluciones." },
  { type: "insurance", label: "Seguros destacado", description: "Bloque comercial prioritario para Seguros." },
  { type: "story", label: "Nuestra historia", description: "Relato, propósito y valores de la firma." },
  { type: "referral", label: "Botones autorizados", description: "Acciones de referencia y contacto." },
  { type: "implementation", label: "Implementación", description: "Alcance de acompañamiento profesional." },
  { type: "legal", label: "Declaración legal", description: "Divulgación, marcas y condiciones." },
  { type: "cta", label: "Llamado a la acción", description: "Cierre con una acción comercial clara." },
  { type: "rich-text", label: "Texto libre", description: "Contenido editorial flexible." }
];

export function AdminDashboard({ initialContent, initialLeads }: { initialContent: SiteContent; initialLeads: Lead[] }) {
  const [content, setContent] = useState(initialContent);
  const contentRef = useRef(initialContent);
  const [undoStack, setUndoStack] = useState<SiteContent[]>([]);
  const [redoStack, setRedoStack] = useState<SiteContent[]>([]);
  const [dirty, setDirty] = useState(false);
  const [selected, setSelected] = useState<PageKey>("home");
  const [section, setSection] = useState<Section>("summary");
  const [blockIndex, setBlockIndex] = useState(0);
  const [builderTab, setBuilderTab] = useState<BuilderTab>("blocks");
  const [blockQuery, setBlockQuery] = useState("");
  const [device, setDevice] = useState<Device>("desktop");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState(content.blog[0]?.id || "");
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState(content.knowledge[0]?.id || "");
  const [knowledgeQuery, setKnowledgeQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");

  const page = pageFor(content, selected);
  const block = page.blocks[blockIndex];
  const selectedPost = content.blog.find((post) => post.id === selectedPostId);
  const selectedKnowledge = content.knowledge.find((item) => item.id === selectedKnowledgeId);
  const leads = useMemo(() => initialLeads.slice(0, 100), [initialLeads]);
  const filteredKnowledge = useMemo(() => {
    const query = knowledgeQuery.trim().toLowerCase();
    if (!query) return content.knowledge;
    return content.knowledge.filter((item) => `${item.topic} ${item.question} ${item.answer}`.toLowerCase().includes(query));
  }, [content.knowledge, knowledgeQuery]);
  const filteredTemplates = useMemo(() => {
    const query = blockQuery.trim().toLowerCase();
    if (!query) return blockTemplates;
    return blockTemplates.filter((template) => `${template.label} ${template.description}`.toLowerCase().includes(query));
  }, [blockQuery]);

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
    setBlockIndex((index) => Math.min(index, Math.max(0, pageFor(previous, selected).blocks.length - 1)));
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
    setBlockIndex((index) => Math.min(index, Math.max(0, pageFor(next, selected).blocks.length - 1)));
  }

  function updatePage(field: "title" | "description" | "primaryCta" | "secondaryCta", value: string) {
    applyContent((current) => updateSelectedPage(current, selected, { [field]: value }));
    setNotice("");
  }

  function updateBlock(field: keyof CmsBlock, value: string | boolean) {
    if (!block) return;
    applyContent((current) => updateSelectedPage(current, selected, {
      blocks: page.blocks.map((item, index) => index === blockIndex ? { ...item, [field]: value } : item)
    }));
    setNotice("");
  }

  function createBlock(type: CmsBlock["type"]): CmsBlock {
    const template = blockTemplates.find((item) => item.type === type);
    return {
      id: `${type}-${selected}-${crypto.randomUUID()}`,
      type,
      title: template?.label || "Nuevo bloque",
      body: template?.description || "Escribe aquí el contenido que quieres mostrar.",
      ctaLabel: "",
      ctaHref: "",
      mediaUrl: "",
      enabled: true
    };
  }

  function addBlock(type: CmsBlock["type"], atIndex = page.blocks.length) {
    const next = createBlock(type);
    const blocks = [...page.blocks];
    blocks.splice(atIndex, 0, next);
    applyContent((current) => updateSelectedPage(current, selected, { blocks }));
    setBlockIndex(atIndex);
  }

  function moveBlock(direction: -1 | 1) {
    const nextIndex = blockIndex + direction;
    if (nextIndex < 0 || nextIndex >= page.blocks.length) return;
    const blocks = [...page.blocks];
    [blocks[blockIndex], blocks[nextIndex]] = [blocks[nextIndex], blocks[blockIndex]];
    applyContent((current) => updateSelectedPage(current, selected, { blocks }));
    setBlockIndex(nextIndex);
  }

  function deleteBlock() {
    if (!block || page.blocks.length === 1) return;
    applyContent((current) => updateSelectedPage(current, selected, { blocks: page.blocks.filter((_, index) => index !== blockIndex) }));
    setBlockIndex(Math.max(0, blockIndex - 1));
  }

  function duplicateBlock() {
    if (!block) return;
    const next = { ...block, id: `${block.type}-${selected}-${crypto.randomUUID()}`, title: `${block.title} (copia)` };
    const blocks = [...page.blocks];
    blocks.splice(blockIndex + 1, 0, next);
    applyContent((current) => updateSelectedPage(current, selected, { blocks }));
    setBlockIndex(blockIndex + 1);
  }

  function reorderBlock(source: number, target: number) {
    if (source < 0 || source >= page.blocks.length || target < 0 || target > page.blocks.length) return;
    const blocks = [...page.blocks];
    const [moved] = blocks.splice(source, 1);
    const adjustedTarget = target > source ? target - 1 : target;
    if (adjustedTarget === source) return;
    blocks.splice(adjustedTarget, 0, moved);
    applyContent((current) => updateSelectedPage(current, selected, { blocks }));
    setBlockIndex(adjustedTarget);
  }

  function handleDrop(event: React.DragEvent, targetIndex: number) {
    event.preventDefault();
    const payload = event.dataTransfer.getData("text/plain");
    if (payload.startsWith("template:")) {
      addBlock(payload.replace("template:", "") as CmsBlock["type"], targetIndex);
    } else if (draggedIndex !== null) {
      reorderBlock(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
    setDropIndex(null);
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
      published: false,
      publishedAt: new Date().toISOString()
    };
    applyContent((current) => ({ ...current, blog: [post, ...current.blog] }));
    setSelectedPostId(id);
  }

  function updatePost(id: string, field: keyof BlogPost, value: string | boolean) {
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
      if (file.size > 1_500_000) throw new Error("El archivo supera 1.5 MB.");
      const text = await file.text();
      if (!text.trim()) throw new Error("No se encontró texto legible. Usa TXT, MD, CSV o JSON.");
      const id = crypto.randomUUID();
      const item: KnowledgeItem = {
        id,
        topic: "Documento importado",
        question: `Información de ${file.name}`,
        answer: text.slice(0, 40_000),
        sourceName: file.name,
        updatedAt: new Date().toISOString()
      };
      applyContent((current) => ({ ...current, knowledge: [item, ...current.knowledge] }));
      setSelectedKnowledgeId(id);
      setNotice("Documento importado. Revisa el contenido y publica los cambios.");
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
    try {
      const response = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      const data = await response.json();
      if (response.ok) {
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
                <select value={selected} onChange={(event) => { setSelected(event.target.value as PageKey); setBlockIndex(0); setBuilderTab("blocks"); }}>
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

        {section === "pages" && (
          <section className="cms-builder">
            <aside className="cms-builder-library">
              <div className="cms-builder-tabs">
                <button className={builderTab === "blocks" ? "is-active" : ""} onClick={() => setBuilderTab("blocks")}><Plus />Agregar</button>
                <button className={builderTab === "layers" ? "is-active" : ""} onClick={() => setBuilderTab("layers")}><Layers3 />Capas</button>
              </div>
              {builderTab === "blocks" ? (
                <>
                  <label className="cms-block-search"><Search /><input value={blockQuery} onChange={(event) => setBlockQuery(event.target.value)} placeholder="Buscar bloques" /></label>
                  <div className="cms-template-list">
                    {filteredTemplates.map((template) => {
                      const Icon = blockIcons[template.type];
                      return (
                        <button
                          key={template.type}
                          draggable
                          onDragStart={(event) => event.dataTransfer.setData("text/plain", `template:${template.type}`)}
                          onClick={() => addBlock(template.type, blockIndex + 1)}
                        >
                          <Icon /><span><strong>{template.label}</strong><small>{template.description}</small></span><GripVertical />
                        </button>
                      );
                    })}
                  </div>
                  <div className="cms-drop-hint"><MousePointer2 /><p><strong>Arrastra un bloque al lienzo</strong><span>o haz clic para insertarlo después del bloque seleccionado.</span></p></div>
                </>
              ) : (
                <div className="cms-layer-list">
                  {page.blocks.map((item, index) => {
                    const Icon = blockIcons[item.type];
                    return (
                      <button key={item.id} className={index === blockIndex ? "is-selected" : ""} onClick={() => setBlockIndex(index)}>
                        <GripVertical /><Icon /><span><strong>{item.title || blockLabel(item.type)}</strong><small>{blockLabel(item.type)}</small></span>{item.enabled ? <Eye /> : <EyeOff />}
                      </button>
                    );
                  })}
                </div>
              )}
            </aside>

            <div className="cms-builder-stage">
              <div className="cms-stage-bar">
                <div><strong>{editablePageLabels[selected]}</strong><span>{page.blocks.filter((item) => item.enabled).length} bloques visibles</span></div>
                <a href={pageRoutes[selected]} target="_blank" rel="noreferrer">Abrir página <ExternalLink /></a>
              </div>
              <div className={`cms-pasteboard is-${device}`}>
                <div className="cms-page-preview">
                  <div className="cms-preview-nav"><Logo /><span>Soluciones</span><span>Servicios</span><span>Nosotros</span><i>Hablemos</i></div>
                  <PreviewDropZone active={dropIndex === 0} onDragOver={(event) => { event.preventDefault(); setDropIndex(0); }} onDrop={(event) => handleDrop(event, 0)} />
                  {page.blocks.map((item, index) => (
                    <div key={item.id}>
                      <PreviewBlock
                        block={item}
                        selected={index === blockIndex}
                        page={page}
                        device={device}
                        draggable
                        onClick={() => setBlockIndex(index)}
                        onDragStart={(event) => { setDraggedIndex(index); event.dataTransfer.setData("text/plain", `block:${index}`); }}
                        onDragEnd={() => { setDraggedIndex(null); setDropIndex(null); }}
                        onDuplicate={duplicateBlock}
                        onToggle={() => updateBlock("enabled", !item.enabled)}
                      />
                      <PreviewDropZone active={dropIndex === index + 1} onDragOver={(event) => { event.preventDefault(); setDropIndex(index + 1); }} onDrop={(event) => handleDrop(event, index + 1)} />
                    </div>
                  ))}
                  {!page.blocks.length && <div className="cms-empty-canvas"><Plus /><strong>Agrega tu primer bloque</strong><span>Arrástralo desde la biblioteca.</span></div>}
                </div>
              </div>
            </div>

            <aside className="cms-inspector">
              {block && <>
                <div className="cms-inspector-heading"><div><h2>Contenido del bloque</h2><p>{blockLabel(block.type)} seleccionado</p></div><span>{blockIndex + 1}/{page.blocks.length}</span></div>
                <details className="cms-page-settings">
                  <summary>Configuración de la página <ChevronRight /></summary>
                  <label>Título de la página<input value={page.title} onChange={(event) => updatePage("title", event.target.value)} /></label>
                  <label>Descripción SEO<textarea rows={3} value={page.description} onChange={(event) => updatePage("description", event.target.value)} /></label>
                  <div className="cms-two-fields">
                    <label>Acción principal<input value={page.primaryCta} onChange={(event) => updatePage("primaryCta", event.target.value)} /></label>
                    <label>Acción secundaria<input value={page.secondaryCta} onChange={(event) => updatePage("secondaryCta", event.target.value)} /></label>
                  </div>
                </details>
                <label>Tipo de bloque<select value={block.type} onChange={(event) => updateBlock("type", event.target.value)}>{blockTemplates.map((template) => <option key={template.type} value={template.type}>{template.label}</option>)}</select></label>
                <label>Título<input value={block.title} onChange={(event) => updateBlock("title", event.target.value)} /></label>
                <label>Contenido<textarea rows={8} value={block.body} onChange={(event) => updateBlock("body", event.target.value)} /></label>
                <div className="cms-two-fields">
                  <label>Texto del botón<input value={block.ctaLabel || ""} onChange={(event) => updateBlock("ctaLabel", event.target.value)} /></label>
                  <label>Enlace<input value={block.ctaHref || ""} onChange={(event) => updateBlock("ctaHref", event.target.value)} /></label>
                </div>
                <label>Imagen o recurso<input value={block.mediaUrl || ""} placeholder="https://…" onChange={(event) => updateBlock("mediaUrl", event.target.value)} /></label>
                <label className="cms-upload">
                  <ImageIcon />
                  <strong>{uploading || "Subir imagen"}</strong>
                  <span>JPG, PNG o WebP · máximo 4 MB</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" disabled={Boolean(uploading)} onChange={(event) => uploadImage(event, (url) => updateBlock("mediaUrl", url))} />
                </label>
                <label className="cms-toggle"><input type="checkbox" checked={block.enabled} onChange={(event) => updateBlock("enabled", event.target.checked)} /><span><strong>Mostrar bloque</strong><small>Visible en el sitio público</small></span></label>
                <div className="cms-block-actions"><button onClick={() => moveBlock(-1)} disabled={blockIndex === 0}><ArrowUp />Subir</button><button onClick={() => moveBlock(1)} disabled={blockIndex === page.blocks.length - 1}><ArrowDown />Bajar</button></div>
                <button className="cms-duplicate-wide" onClick={duplicateBlock}><Copy />Duplicar bloque</button>
                <button className="cms-delete-wide" onClick={deleteBlock} disabled={page.blocks.length === 1}><Trash2 />Eliminar bloque</button>
              </>}
            </aside>
          </section>
        )}

        {section === "blog" && (
          <section className="cms-split-workspace">
            <div className="cms-item-list">
              <div className="cms-panel-heading"><div><h2>Artículos</h2><p>{content.blog.length} en total</p></div><button onClick={addPost}><Plus /></button></div>
              {content.blog.length === 0 && <div className="cms-mini-empty">Crea tu primer artículo.</div>}
              {content.blog.map((post) => <button key={post.id} className={selectedPostId === post.id ? "is-selected" : ""} onClick={() => setSelectedPostId(post.id)}><span>{post.published ? "Publicado" : "Borrador"}</span><strong>{post.title}</strong><small>{post.category}</small></button>)}
            </div>
            <div className="cms-editor-surface">
              {selectedPost ? <>
                <div className="cms-editor-title"><div><span>{selectedPost.published ? "Publicado" : "Borrador"}</span><h2>{selectedPost.title}</h2></div><button className="cms-delete" onClick={() => { applyContent((current) => ({ ...current, blog: current.blog.filter((item) => item.id !== selectedPost.id) })); setSelectedPostId(""); }}><Trash2 />Eliminar</button></div>
                <div className="cms-two-fields"><label>Título<input value={selectedPost.title} onChange={(event) => updatePost(selectedPost.id, "title", event.target.value)} /></label><label>URL / slug<input value={selectedPost.slug} onChange={(event) => updatePost(selectedPost.id, "slug", slugify(event.target.value))} /></label></div>
                <label>Resumen<textarea rows={3} value={selectedPost.excerpt} onChange={(event) => updatePost(selectedPost.id, "excerpt", event.target.value)} /></label>
                <label>Contenido del artículo<textarea className="cms-article-editor" rows={18} value={selectedPost.body} onChange={(event) => updatePost(selectedPost.id, "body", event.target.value)} /></label>
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
              <label className="cms-import"><Upload /><span><strong>{uploading || "Importar archivo"}</strong><small>TXT, MD, CSV o JSON · 1.5 MB</small></span><input type="file" accept=".txt,.md,.csv,.json,text/plain,text/markdown,text/csv,application/json" disabled={Boolean(uploading)} onChange={importKnowledgeFile} /></label>
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

function PreviewDropZone({ active, onDragOver, onDrop }: { active: boolean; onDragOver: (event: React.DragEvent<HTMLDivElement>) => void; onDrop: (event: React.DragEvent<HTMLDivElement>) => void }) {
  return <div className={`cms-preview-dropzone${active ? " is-active" : ""}`} onDragOver={onDragOver} onDrop={onDrop}><span><Plus />Soltar bloque aquí</span></div>;
}

function PreviewBlock({
  block,
  selected,
  page,
  device,
  onClick,
  onDragStart,
  onDragEnd,
  onDuplicate,
  onToggle
}: {
  block: CmsBlock;
  selected: boolean;
  page: ReturnType<typeof pageFor>;
  device: Device;
  draggable: boolean;
  onClick: () => void;
  onDragStart: (event: React.DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
  onDuplicate: () => void;
  onToggle: () => void;
}) {
  const Icon = blockIcons[block.type];
  const isHero = block.type === "hero";
  return (
    <section
      className={`cms-preview-block cms-preview-block--${block.type}${selected ? " is-selected" : ""}${block.enabled ? "" : " is-hidden"}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onClick(); }}
      aria-label={`Editar bloque ${block.title}`}
    >
      {selected && (
        <div className="cms-floating-tools" onClick={(event) => event.stopPropagation()}>
          <span><GripVertical />Mover</span>
          <button onClick={onDuplicate} aria-label="Duplicar bloque"><Copy /></button>
          <button onClick={onToggle} aria-label={block.enabled ? "Ocultar bloque" : "Mostrar bloque"}>{block.enabled ? <Eye /> : <EyeOff />}</button>
        </div>
      )}
      {isHero ? (
        <div className="cms-preview-hero">
          <div>
            <small>{block.title || "Encabezado principal"}</small>
            <h2>{page.title}</h2>
            <p>{page.description}</p>
            <div><span>{page.primaryCta}</span><i>{page.secondaryCta}</i></div>
          </div>
          <div className="cms-preview-media">
            {block.mediaUrl ? <img src={block.mediaUrl} alt="" /> : <><Icon /><span>Imagen o recurso visual</span></>}
          </div>
        </div>
      ) : (
        <div className="cms-preview-section">
          <Icon />
          <div><small>{blockLabel(block.type)}</small><h3>{block.title}</h3><p>{block.body}</p>{block.ctaLabel && <span>{block.ctaLabel} →</span>}</div>
          {block.mediaUrl && device !== "mobile" && <img src={block.mediaUrl} alt="" />}
        </div>
      )}
    </section>
  );
}

function SidebarButton({ active, icon: Icon, label, count, detail, onClick }: { active: boolean; icon: typeof Home; label: string; count?: number; detail?: string; onClick: () => void }) {
  return <button className={active ? "is-active" : ""} onClick={onClick}><Icon /><span><strong>{label}</strong>{detail && <small>{detail}</small>}</span>{typeof count === "number" && <i>{count}</i>}</button>;
}

function updateSelectedPage(content: SiteContent, selected: PageKey, patch: Partial<ReturnType<typeof pageFor>>): SiteContent {
  if (selected in content.pages) return { ...content, pages: { ...content.pages, [selected]: { ...content.pages[selected as keyof typeof content.pages], ...patch } } };
  return { ...content, [selected]: { ...content[selected as "home" | "aprende" | "research" | "ramx"], ...patch } };
}

function blockLabel(type: CmsBlock["type"]) {
  return blockTemplates.find((template) => template.type === type)?.label || "Bloque";
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

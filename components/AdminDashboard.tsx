"use client";

import { ArrowUpRight, BookOpen, BriefcaseBusiness, Check, ExternalLink, FileText, LayoutDashboard, LogOut, Save, Settings, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Logo } from "@/components/Logo";
import { EditablePage, editablePageLabels, Lead, SiteContent } from "@/lib/site-content";

type PageKey = keyof typeof editablePageLabels;

export function AdminDashboard({ initialContent, initialLeads }: { initialContent: SiteContent; initialLeads: Lead[] }) {
  const [content, setContent] = useState(initialContent);
  const [selected, setSelected] = useState<PageKey>("home");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const page = content[selected];
  const pageUrl = selected === "home" ? "/" : `/${selected}`;
  const leads = useMemo(() => initialLeads.slice(0, 6), [initialLeads]);

  function update(field: keyof EditablePage, value: string) {
    setContent((current) => ({ ...current, [selected]: { ...current[selected], [field]: value } }));
    setNotice("");
  }
  async function save() {
    setSaving(true); setNotice("");
    const response = await fetch("/api/admin/content", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const data = await response.json();
    setNotice(response.ok ? `Cambios guardados${data.storage === "local" ? " en modo local" : ""}.` : data.error || "No fue posible guardar.");
    setSaving(false);
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.href = "/admin/login"; }

  return <div className="admin-shell">
    <aside className="admin-sidebar"><Logo inverted /><nav><a><LayoutDashboard />Resumen</a><a className="is-active"><FileText />Contenido</a><a><BriefcaseBusiness />Servicios</a><a><BookOpen />J R Aprende</a><a href="#leads"><Users />Leads</a><a><Settings />Ajustes</a></nav><button onClick={logout}><LogOut />Cerrar sesión</button></aside>
    <main className="admin-main"><header><div><span>J R Consulting</span><h1>Panel de administración</h1></div><a className="button button--outline" href="/" target="_blank">Ver sitio <ExternalLink size={17} /></a></header>
      <section className="admin-editor"><div className="admin-form-panel"><h2>Contenido de la página</h2><label className="admin-field">Página<select className="admin-select" value={selected} onChange={(e) => setSelected(e.target.value as PageKey)}>{Object.entries(editablePageLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><label className="admin-field">Título principal<textarea rows={3} value={page.title} onChange={(e) => update("title", e.target.value)} /></label><label className="admin-field">Descripción<textarea rows={5} value={page.description} onChange={(e) => update("description", e.target.value)} /></label><label className="admin-field">Botón principal<input value={page.primaryCta} onChange={(e) => update("primaryCta", e.target.value)} /></label><label className="admin-field">Botón secundario<input value={page.secondaryCta} onChange={(e) => update("secondaryCta", e.target.value)} /></label><div className="admin-actions"><button className="button button--primary" onClick={save} disabled={saving}><Save size={17} />{saving ? "Guardando…" : "Guardar cambios"}</button><a className="button button--outline" href={pageUrl} target="_blank">Previsualizar <ExternalLink size={16} /></a></div>{notice ? <p className={notice.startsWith("Cambios") ? "admin-notice" : "admin-error"}>{notice.startsWith("Cambios") ? <Check /> : null}{notice}</p> : null}</div>
        <div className="admin-preview-panel"><div className="admin-preview-title"><h2>Vista previa en vivo</h2><span>{editablePageLabels[selected]}</span></div><div className="admin-preview"><div className="admin-preview-nav"><strong>JR</strong><span>Soluciones　 Websites　 Aprende　 Research　 Contacto</span></div><div className="admin-preview-body"><div><h2>{page.title}</h2><p>{page.description}</p><div><span>{page.primaryCta} →</span><i>{page.secondaryCta} →</i></div></div><div className="admin-preview-art"><i /><i /></div></div></div></div></section>
      <section className="admin-leads" id="leads"><div className="admin-section-title"><div><h2>Últimas solicitudes</h2><p>Prospectos enviados desde los formularios del sitio.</p></div><span>{leads.length} recientes</span></div>{leads.length ? <div className="lead-table"><div className="lead-row lead-head"><span>Nombre</span><span>Servicio</span><span>Fecha</span><span>Estado</span><span /></div>{leads.map((lead) => <div className="lead-row" key={lead.id || `${lead.email}-${lead.created_at}`}><span><strong>{lead.name}</strong><small>{lead.email}</small></span><span>{lead.service}</span><span>{lead.created_at ? new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(new Date(lead.created_at)) : "—"}</span><span><i>{lead.status || "nuevo"}</i></span><a href={`https://wa.me/52${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label={`Contactar a ${lead.name}`}><ArrowUpRight /></a></div>)}</div> : <div className="empty-leads"><Users /><h3>Aún no hay solicitudes.</h3><p>Cuando alguien envíe un formulario aparecerá aquí.</p></div>}</section>
    </main>
  </div>;
}

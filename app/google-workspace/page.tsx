import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Cloud,
  Laptop,
  Mail,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import { getSiteContent } from "@/lib/storage";
import { pageMetadata } from "@/lib/seo";
import { CmsAdditionalBlocks } from "@/components/CmsAdditionalBlocks";

const referralUrl = "https://referworkspace.app.goo.gl/B9iH";
const gmailEmail = "mailto:jose.rosasa@jrconsulting.com.mx";

export const metadata: Metadata = pageMetadata(
  "Google Workspace para empresas",
  "Correo empresarial, colaboración y administración con contratación directa en Google y acompañamiento independiente de J R Consulting.",
  "/google-workspace"
);

export default async function GoogleWorkspacePage() {
  const content = await getSiteContent();
  const page = content.pages.workspace;
  const blocks = Object.fromEntries(page.blocks.filter((block) => block.enabled).map((block) => [block.type, block]));
  const legal = blocks.legal?.body || "J R Consulting es una firma de consultoría independiente y participa en el Programa de Referencias de Google Workspace. Google Workspace es contratado, proporcionado y facturado directamente por Google. Google y Google Workspace son marcas de Google LLC.";

  return (
    <main className="workspace-page">
      <section className="workspace-hero">
        <div className="section-shell workspace-hero-grid">
          <div>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <div className="hero-actions">
              <a className="button button--primary" href={referralUrl} target="_blank" rel="noreferrer">{page.primaryCta} <ArrowRight /></a>
              <Link className="button button--outline" href="/contacto?servicio=Google%20Workspace">{page.secondaryCta} <ArrowRight /></Link>
            </div>
            <small>La suscripción se realiza con el dominio, datos y método de pago del cliente directamente en Google.</small>
          </div>
          <WorkspaceVisual />
        </div>
      </section>

      <section className="workspace-benefits section-pad">
        <div className="section-shell">
          <h2>{blocks.benefits?.title || "Todo lo que tu equipo necesita para trabajar mejor"}</h2>
          <div className="workspace-benefit-row">
            <article><Mail /><div><h3>Correo electrónico empresarial para su dominio</h3><p>Luzca profesional y comuníquese como usted@suempresa.com con la experiencia familiar de Gmail.</p></div></article>
            <article><Laptop /><div><h3>Acceso desde cualquier ubicación o dispositivo</h3><p>Revise correos, comparta archivos, edite documentos y organice videoconferencias donde se encuentre.</p></div></article>
            <article><ShieldCheck /><div><h3>Herramientas de administración de nivel empresarial</h3><p>Administre usuarios, dispositivos y controles de seguridad desde una consola central.</p></div></article>
          </div>
          <p className="workspace-authorized-copy">Google Workspace es un paquete de productividad basado en la nube que ayuda a los equipos a comunicarse, colaborar y realizar tareas en cualquier lugar y dispositivo. Es sencillo de configurar, usar y administrar, para que su empresa pueda enfocarse en lo que realmente importa.</p>
          <div className="workspace-resource-links"><a href="https://www.youtube.com/c/googleworkspace" target="_blank" rel="noreferrer">Ver videos de Google Workspace <ArrowRight /></a><a href="https://referworkspace.app.goo.gl/one-pager" target="_blank" rel="noreferrer">Descubrir más <ArrowRight /></a></div>
        </div>
      </section>

      <section className="workspace-plans">
        <div className="section-shell">
          <div className="workspace-section-heading"><h2>Un plan para cada etapa de tu empresa.</h2><p>La contratación, disponibilidad, características y precios vigentes se consultan y confirman directamente con Google.</p></div>
          <div className="workspace-plan-grid">
            <article><span>01</span><h3>Starter</h3><p>Para equipos que necesitan correo con dominio, colaboración esencial, reuniones y administración.</p></article>
            <article><span>02</span><h3>Standard</h3><p>Para empresas que requieren más almacenamiento, reuniones ampliadas y herramientas adicionales de colaboración.</p></article>
            <article><span>03</span><h3>Plus</h3><p>Para organizaciones que necesitan controles de seguridad y administración más avanzados.</p></article>
            <article><span>04</span><h3>Enterprise</h3><p>Para necesidades empresariales de mayor escala, cumplimiento, seguridad y administración.</p></article>
          </div>
          <a className="text-link" href="https://workspace.google.com/intl/es-419_mx/business/" target="_blank" rel="noreferrer">Consultar características y precios actuales en Google <ArrowRight /></a>
        </div>
      </section>

      <section className="workspace-process section-pad">
        <div className="section-shell">
          <h2>{blocks.process?.title || "Así trabajamos contigo"}</h2>
          <div className="workspace-process-rail">
            {[
              ["01", "Solicita asesoría", "Revisamos las necesidades de tu empresa y resolvemos dudas antes de contratar."],
              ["02", "Recibe tu código", "Te entregamos individualmente el código promocional aplicable."],
              ["03", "Contrata con Google", "Utilizas tu propio dominio, datos y tarjeta. Google proporciona y factura el servicio."],
              ["04", "Implementamos contigo", "J R Consulting cotiza por separado la configuración, migración y capacitación."]
            ].map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="workspace-referral">
        <div className="section-shell workspace-referral-grid">
          <div>
            <h2>{blocks.referral?.title || "Prueba Google Workspace durante 14 días."}</h2>
            <p>Regístrate con el vínculo de referencia de J R Consulting. Si deseas recibir un descuento exclusivo durante tu prueba, escríbenos para revisar disponibilidad y condiciones.</p>
          </div>
          <div className="workspace-official-buttons">
            <a href={referralUrl} target="_blank" rel="noreferrer" aria-label="Iniciar prueba gratis de Google Workspace">
              <Image src="https://storage.googleapis.com/referworkspace-asset/img/digitalbuttons/digital_button_es_419.png" alt="Iniciar prueba gratis de Google Workspace" width={320} height={90} unoptimized />
              <span>Iniciar prueba gratis <ArrowRight /></span>
            </a>
            <a href={gmailEmail} aria-label="Pregúnteme acerca de Gmail">
              <Image src="https://storage.googleapis.com/referworkspace-asset/img/digitalbuttons/digital_button_gmail_es_419.png" alt="Pregúnteme acerca de Gmail" width={320} height={90} unoptimized />
              <span>Pregúnteme acerca de Gmail <ArrowRight /></span>
            </a>
          </div>
        </div>
      </section>

      <section className="workspace-implementation section-pad">
        <div className="section-shell">
          <div><Users /><h2>{blocks.implementation?.title || "Implementación independiente, a tu medida."}</h2><p>{blocks.implementation?.body}</p><Link className="button button--outline" href="/contacto?servicio=Google%20Workspace">Solicitar propuesta de implementación <ArrowRight /></Link></div>
          <ul>
            <li><Check />Configuración de cuentas y dominio</li>
            <li><Check />Migración de correos y archivos</li>
            <li><Check />Seguridad, usuarios y dispositivos</li>
            <li><Check />Capacitación y adopción del equipo</li>
            <li><Check />Soporte y mejora continua</li>
          </ul>
        </div>
      </section>

      <section className="workspace-disclosure"><div className="section-shell"><ShieldCheck /><p>{legal}</p></div></section>
      <CmsAdditionalBlocks blocks={page.blocks} pageKey="workspace" />
    </main>
  );
}

function WorkspaceVisual() {
  return <div className="workspace-visual" aria-label="Representación de correo, archivos, reuniones y calendario">
    <div className="workspace-window workspace-mail"><div><Mail /><span>Correo empresarial</span></div><i /><i /><i /><i /></div>
    <div className="workspace-window workspace-drive"><div><Cloud /><span>Archivos compartidos</span></div><div className="workspace-files"><i /><i /><i /></div></div>
    <div className="workspace-window workspace-meet"><div><Users /><span>Reunión del equipo</span></div><div className="workspace-people"><i /><i /><i /></div></div>
    <div className="workspace-window workspace-calendar"><div><CalendarDays /><span>Calendario</span></div><b>14</b><small>Reunión de equipo</small></div>
    <div className="workspace-admin"><Settings /><span>Administración y seguridad</span></div>
  </div>;
}
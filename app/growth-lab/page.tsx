export const dynamic = "force-dynamic";
import { VisualPage } from "@/components/VisualPage";
import { editableTree } from "@/lib/editable-tree";
import { pageFor } from "@/lib/site-content";
import { getSiteContent } from "@/lib/storage";
import { CmsAdditionalBlocks } from "@/components/CmsAdditionalBlocks";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Globe2,
  MessageCircle,
  Search,
  Target,
  Workflow
} from "lucide-react";
import { BusinessSystemVisual } from "@/components/BusinessSystemVisual";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Marketing, automatización e IA para negocios | Growth Lab",
  "J R Consulting — Growth Lab conecta marketing, web, WhatsApp, CRM, automatización, datos e IA para convertir presencia digital en un sistema de captación y seguimiento.",
  "/growth-lab"
);

const agendaLocalComponents = [
  [Search, "Google Business", "Claridad local, reputación, datos consistentes y una ruta visible para contactar."],
  [Globe2, "Landing o website", "Una experiencia enfocada para explicar la oferta y llevar al prospecto al siguiente paso."],
  [MessageCircle, "WhatsApp Business", "Mensajes, etiquetas, respuestas y seguimiento organizados alrededor del proceso real."],
  [Workflow, "CRM ligero", "Etapas visibles para saber quién preguntó, quién respondió y qué acción sigue."],
  [Target, "Contenido y scripts", "Mensajes que educan, responden objeciones y apoyan una acción concreta."],
  [BarChart3, "Medición", "Indicadores prácticos para aprender qué canal genera oportunidades y dónde se pierden."]
] as const;

const method = [
  ["Diagnóstico", "Entendemos el negocio, los canales y la fuga principal."],
  ["Prioridad", "Elegimos la mejora con mejor relación entre impacto, costo y esfuerzo."],
  ["Implementación", "Construimos el flujo, activo o sistema acordado."],
  ["QA humano", "Una persona revisa hechos, marca, seguridad y funcionamiento."],
  ["Capacitación", "El cliente entiende qué se instaló y cómo usarlo."],
  ["Medición", "Registramos leads, citas, ventas o eficiencia cuando los datos lo permiten."],
  ["Mejora", "Documentamos lo aprendido y mejoramos el sistema."]
] as const;

export default async function GrowthLabPage() {
  const content = await getSiteContent();
  return <VisualPage pageKey="growthlab" initialPage={pageFor(content, "growthlab")}>{editableTree((
    <>
      <section className="home-hero">
        <div className="home-hero-grid section-shell">
          <div className="hero-copy">
            <h1>Haz que tu marketing deje de ser publicaciones sueltas y se convierta en un sistema.</h1>
            <p>
              J R Consulting — Growth Lab conecta marketing, web, WhatsApp, CRM, automatización,
              datos e inteligencia artificial para atraer oportunidades, darles seguimiento y medir qué funciona.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#auditoria">
                Solicitar auditoría <ArrowRight size={18} />
              </a>
              <a className="button button--outline" href="#agenda-local">Ver Agenda Local OS</a>
            </div>
          </div>
          <BusinessSystemVisual />
        </div>
      </section>

      <section className="section-pad">
        <div className="section-shell">
          <span className="label">El problema</span>
          <h2 className="section-heading">
            Tu negocio probablemente ya tiene herramientas. El problema es que no trabajan juntas.
          </h2>
          <div className="solution-lines">
            {[
              ["01", "Google", "Una persona te encuentra, pero no siempre existe un siguiente paso claro."],
              ["02", "Redes sociales", "Llegan mensajes que pueden quedarse aislados del proceso comercial."],
              ["03", "WhatsApp", "Las conversaciones dependen de memoria o seguimientos que se olvidan."],
              ["04", "Datos", "Sin registrar origen, avance y resultado, es difícil saber qué esfuerzo repetir."]
            ].map(([number, title, copy]) => (
              <article className="solution-line" key={title}>
                <span>{number}</span>
                <div><Workflow /><h3>{title}</h3><p>{copy}</p></div>
                <ul>
                  <li><Check /> Conectar</li>
                  <li><Check /> Dar seguimiento</li>
                  <li><Check /> Medir</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad soft-section" id="agenda-local">
        <div className="section-shell">
          <span className="label">Producto central</span>
          <h2 className="section-heading">
            Agenda Local OS: una ruta simple desde “te encontré” hasta “ya sé qué sigue”.
          </h2>
          <p className="section-intro">
            Auditamos primero y después instalamos únicamente los componentes que resuelven una fuga concreta.
            No obligamos al negocio a comprar software que todavía no necesita.
          </p>
          <div className="numbered-list web-value-list">
            {agendaLocalComponents.map(([Icon, title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3><Icon />{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-band section-pad">
        <div className="split-section section-shell">
          <div><Bot className="large-line-icon" /><h2>AI-first. Human-reviewed.</h2></div>
          <div>
            <p className="section-intro">
              Utilizamos IA para investigar, idear, redactar, programar, analizar y automatizar. Pero los entregables,
              cifras, claims, datos del cliente y cambios en producción pasan por revisión humana antes de salir.
            </p>
            <div className="capability-tags">
              {["Investigación", "Contenido", "Web", "Automatización", "Datos", "QA humano"].map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="section-shell">
          <span className="label">Cómo trabajamos</span>
          <h2 className="section-heading">Resolver primero. Automatizar después.</h2>
          <div className="numbered-list web-value-list">
            {method.map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="section-shell">
          <span className="label">También dentro de Growth Lab</span>
          <h2 className="section-heading">Una misma lógica para marketing, websites, automatización y datos.</h2>
          <div className="appointment-grid">
            <article>
              <Globe2 /><h3>Websites con un trabajo claro</h3>
              <p>Landing pages, sitios profesionales y activos digitales alrededor de una acción concreta.</p>
              <Link className="text-link" href="/websites">Conocer Websites <ArrowRight size={16} /></Link>
            </article>
            <article>
              <Workflow /><h3>CRM y automatización</h3>
              <p>Flujos ligeros y automatizaciones que reducen trabajo repetitivo sin sobrecargar la operación.</p>
              <Link className="text-link" href="/soluciones">Explorar soluciones <ArrowRight size={16} /></Link>
            </article>
            <article>
              <BarChart3 /><h3>Datos y dashboards</h3>
              <p>Información comercial y operativa convertida en indicadores que se puedan revisar y utilizar.</p>
              <Link className="text-link" href="/contacto">Hablar de mi caso <ArrowRight size={16} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad" id="auditoria">
        <div className="learn-form-grid section-shell">
          <div>
            <span className="label">Microauditoría inicial</span>
            <h2>Encuentra primero dónde se están perdiendo oportunidades.</h2>
            <p className="section-intro">
              Revisamos de forma inicial tu ecosistema digital y buscamos prioridades concretas.
              No necesitamos contraseñas para esta primera revisión y la auditoría no te obliga a contratar.
            </p>
            <div className="capability-tags">
              <span>Google</span><span>Redes</span><span>Website</span><span>WhatsApp</span><span>Seguimiento</span><span>Medición</span>
            </div>
          </div>
          <QuoteForm defaultService="Growth Lab — auditoría y crecimiento digital" source="growth-lab" />
        </div>
      </section>
      <CmsAdditionalBlocks blocks={content.pages.growthlab.blocks} pageKey="growthlab" />
    </>
  ), "growthlab")}</VisualPage>;
}

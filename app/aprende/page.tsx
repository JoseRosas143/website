import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Bot, BriefcaseBusiness, Code2, FileCheck2, Info, Map, Pencil, Search, Target, Wrench, Workflow } from "lucide-react";
import { LearningRoutes } from "@/components/LearningRoutes";
import { CalendarButton } from "@/components/CalendarButton";
import { CmsAdditionalBlocks } from "@/components/CmsAdditionalBlocks";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/storage";

export const metadata: Metadata = pageMetadata(
  "J R Aprende | Capacitación y rutas de certificación",
  "Rutas prácticas de habilidades digitales, IA, herramientas de Google, productividad, no-code y negocios para profesionales y equipos.",
  "/aprende"
);

const steps = [
  [Search, "Diagnóstico", "Entendemos tu punto de partida y tus metas."],
  [Map, "Ruta", "Diseñamos un plan paso a paso."],
  [Pencil, "Práctica", "Aplicas en proyectos con acompañamiento."],
  [FileCheck2, "Evidencia", "Documentas resultados reales."],
  [Target, "Siguiente paso", "Avanzas con una decisión clara."]
] as const;

const aprendeCalendar = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1lAe8HOMTXagBUdFssmbSgVF9PWXGLRKNp15AQd-Kah0In3wgvmIQnGBXAZOhWMpzQ66Y55NXJ?gv=true";

export default async function AprendePage() {
  const content = await getSiteContent();
  return (
    <>
      <section className="learn-hero">
        <div className="section-shell">
          <div className="learn-hero-grid">
            <div className="learn-hero-copy">
              <h1>{content.aprende.title}</h1>
              <p>{content.aprende.description}</p>
              <div className="hero-actions"><a className="button button--primary" href="#rutas">{content.aprende.primaryCta} <ArrowRight size={18} /></a><a className="button button--outline" href="#formulario-aprende">{content.aprende.secondaryCta} <ArrowRight size={18} /></a></div>
            </div>
            <div className="learn-path">
              {steps.map(([Icon, title, text]) => <article className="learn-step" key={title}><span><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
          <div className="focus-rail">
            {[[Bot, "IA aplicada"], [Workflow, "Herramientas de Google"], [BadgeCheck, "Productividad digital"], [Code2, "Web y no-code"], [BriefcaseBusiness, "Negocios y ventas"]].map(([Icon, title]) => { const C = Icon as typeof Bot; return <span key={title as string}><C />{title as string}</span>; })}
          </div>
        </div>
      </section>

      <section className="learn-principles">
        <h2>No coleccionamos cursos. Construimos trayectorias.</h2>
        <article><Target /><h3>Elegir con criterio</h3><p>Seleccionamos contenidos actuales y alineados con objetivos concretos.</p></article>
        <article><Wrench /><h3>Aprender haciendo</h3><p>Proyectos guiados, casos reales y acompañamiento durante la aplicación.</p></article>
        <article><BadgeCheck /><h3>Convertirlo en evidencia</h3><p>Entregables aplicados que muestran tu avance y abren nuevas puertas.</p></article>
      </section>

      <section className="section-shell" id="rutas"><LearningRoutes /><div className="cert-note"><Info /><span>Las certificaciones son emitidas por sus proveedores correspondientes. J R Aprende acompaña la preparación, selección de ruta y aplicación práctica; no afirma ser emisor oficial ni garantiza acreditaciones.</span></div></section>

      <section className="section-pad soft-section" id="formulario-aprende">
        <div className="learn-form-grid section-shell">
          <div><span className="label">Tu siguiente ruta</span><h2>Cuéntanos qué quieres aprender y para qué.</h2><p className="section-intro">Recomendaremos una ruta realista para ti o para tu equipo, con énfasis en aplicación práctica.</p><CalendarButton url={aprendeCalendar} color="#039BE5" label="Programar una cita" /><Link className="text-link" href="/contacto#agenda">Ver otras opciones de contacto <ArrowRight /></Link></div>
          <QuoteForm defaultService="J R Aprende — capacitación" source="aprende" />
        </div>
      </section>
      <CmsAdditionalBlocks blocks={content.aprende.blocks} pageKey="aprende" />
    </>
  );
}

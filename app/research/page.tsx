import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, FileSearch, Microscope, Scale, ShieldCheck, Waypoints } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/storage";

export const metadata: Metadata = pageMetadata(
  "J R Research | Asesoría para protocolos de investigación",
  "Acompañamiento metodológico para protocolos clínicos: pregunta, antecedentes, variables, muestra, análisis, ética, anexos y revisión de congruencia.",
  "/research"
);

export default async function ResearchPage() {
  const content = await getSiteContent();
  return (
    <>
      <section className="page-hero research-hero"><div className="page-hero-grid section-shell"><div className="page-hero-copy"><h1>{content.research.title}</h1><p>{content.research.description}</p><div className="hero-actions"><a className="button button--primary" href="#research-form">{content.research.primaryCta} <ArrowRight size={18} /></a><a className="button button--outline" href="#proceso">{content.research.secondaryCta}</a></div></div><div className="protocol-visual"><div><strong>Protocolo de investigación</strong>{["Pregunta y problema", "Objetivos e hipótesis", "Diseño y variables", "Muestra y análisis", "Ética y anexos"].map((item, index) => <span key={item}><i>{index + 1}</i>{item}</span>)}</div><Waypoints /></div></div></section>
      <section className="section-pad" id="proceso"><div className="section-shell"><span className="label">Acompañamiento metodológico</span><h2 className="section-heading">Del planteamiento a un documento congruente.</h2><div className="research-process">{[
        [FileSearch, "Delimitar", "Convertimos una inquietud clínica en una pregunta investigable y relevante."],
        [BookOpenCheck, "Sustentar", "Organizamos antecedentes pertinentes y verificables con referencias trazables."],
        [Microscope, "Diseñar", "Alineamos objetivos, hipótesis, población, variables, muestra y procedimientos."],
        [Scale, "Analizar", "Definimos un plan estadístico coherente con las variables y el propósito del estudio."],
        [ShieldCheck, "Proteger", "Integramos aspectos éticos, privacidad, anexos y límites de responsabilidad."]
      ].map(([Icon, title, copy], index) => { const C = Icon as typeof FileSearch; return <article key={title as string}><span>0{index + 1}</span><C /><h3>{title as string}</h3><p>{copy as string}</p></article>; })}</div></div></section>
      <section className="dark-band section-pad"><div className="split-section section-shell"><h2>Rigor sin perder claridad.</h2><div><p className="section-intro">El acompañamiento fortalece la estructura y congruencia del protocolo. Las decisiones clínicas, autoría, aprobación institucional, integridad de los datos y defensa del trabajo permanecen bajo responsabilidad del equipo investigador.</p><div className="research-scope">{["Protocolos clínicos", "Tesis y trabajos académicos", "Tablas de variables", "Instrumentos y anexos", "Revisión de congruencia", "Formato Vancouver"].map((item) => <span key={item}>{item}</span>)}</div></div></div></section>
      <section className="section-pad soft-section" id="research-form"><div className="learn-form-grid section-shell"><div><span className="label">Revisión inicial</span><h2>Cuéntanos en qué etapa está tu protocolo.</h2><p className="section-intro">Describe el tema, institución, especialidad, avance actual y fecha límite. Te diremos con claridad qué podemos trabajar.</p><Link className="text-link" href="/contacto#agenda">Prefiero agendar una conversación <ArrowRight /></Link></div><QuoteForm defaultService="J R Research — protocolo" source="research" /></div></section>
    </>
  );
}

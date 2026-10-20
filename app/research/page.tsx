import { ServiceStructuredData } from "@/components/ServiceStructuredData";
export const dynamic = "force-dynamic";
import { VisualPage } from "@/components/VisualPage";
import { editableTree } from "@/lib/editable-tree";
import { pageFor } from "@/lib/site-content";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, FileSearch, Microscope, Scale, ShieldCheck, Waypoints } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { CmsAdditionalBlocks } from "@/components/CmsAdditionalBlocks";
import { pageMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/storage";

export const metadata: Metadata = pageMetadata(
  "Asesoría para protocolos de investigación y tesis",
  "Asesoría metodológica para protocolos de investigación y tesis en salud. Revisa objetivos, variables y plan de análisis con J R Research. Solicita una revisión.",
  "/research"
);

export default async function ResearchPage() {
  const content = await getSiteContent();
  return <VisualPage pageKey="research" initialPage={pageFor(content, "research")}>{editableTree((
    <>
      <section className="page-hero research-hero"><div className="page-hero-grid section-shell"><div className="page-hero-copy"><h1>{content.research.title}</h1><p>{content.research.description}</p><div className="hero-actions"><a className="button button--primary" href="#research-form">{content.research.primaryCta} <ArrowRight size={18} /></a><a className="button button--outline" href="#proceso">{content.research.secondaryCta}</a></div></div><div className="protocol-visual"><div><strong>Protocolo de investigación</strong>{["Pregunta y problema", "Objetivos e hipótesis", "Diseño y variables", "Muestra y análisis", "Ética y anexos"].map((item, index) => <span key={item}><i>{index + 1}</i>{item}</span>)}</div><Waypoints /></div></div></section>
      <section className="section-pad" id="proceso"><div className="section-shell"><span className="label">Acompañamiento metodológico</span><h2 className="section-heading">Asesoría metodológica desde la pregunta hasta el plan de análisis.</h2><div className="research-process">{[
        [FileSearch, "Delimitar", "Convertimos una inquietud clínica en una pregunta investigable y relevante."],
        [BookOpenCheck, "Sustentar", "Organizamos antecedentes pertinentes y verificables con referencias trazables."],
        [Microscope, "Diseñar", "Alineamos objetivos, hipótesis, población, variables, muestra y procedimientos."],
        [Scale, "Analizar", "Definimos un plan estadístico coherente con las variables y el propósito del estudio."],
        [ShieldCheck, "Proteger", "Integramos aspectos éticos, privacidad, anexos y límites de responsabilidad."]
      ].map(([Icon, title, copy], index) => { const C = Icon as typeof FileSearch; return <article key={title as string}><span>0{index + 1}</span><C /><h3>{title as string}</h3><p>{copy as string}</p></article>; })}</div></div></section>
      <section className="dark-band section-pad"><div className="split-section section-shell"><h2>Rigor sin perder claridad.</h2><div><p className="section-intro">El acompañamiento fortalece la estructura y congruencia del protocolo. Las decisiones clínicas, autoría, aprobación institucional, integridad de los datos y defensa del trabajo permanecen bajo responsabilidad del equipo investigador.</p><div className="research-scope">{["Protocolos clínicos", "Tesis y trabajos académicos", "Tablas de variables", "Instrumentos y anexos", "Revisión de congruencia", "Formato Vancouver"].map((item) => <span key={item}>{item}</span>)}</div></div></div></section>
      <section className="section-pad soft-section" id="research-form"><div className="learn-form-grid section-shell"><div><span className="label">Revisión inicial</span><h2>Solicita una revisión inicial de tu protocolo o tesis.</h2><p className="section-intro">Cuéntanos tu tema, institución, especialidad, avance y fecha de entrega. Explica si necesitas delimitar la pregunta, atender observaciones o revisar la metodología. Con esa información podremos definir el alcance y una propuesta de trabajo. No incluyas datos identificables de pacientes.</p><Link className="text-link" href="/contacto#agenda">Prefiero agendar una conversación <ArrowRight /></Link></div><QuoteForm defaultService="J R Research — protocolo" source="research" /></div></section>
      <section className="section-pad"><div className="section-shell">
        <span className="label">Un punto de partida para cada etapa</span><h2 className="section-heading">¿Necesitas empezar tu protocolo o resolver observaciones?</h2>
        <div className="numbered-list">{[
          ["Tengo una idea de investigación", "Trabajamos la delimitación del problema y la pregunta. Revisamos cómo conectar lo que quieres conocer con objetivos, población y un diseño viable."],
          ["Mi asesor pidió correcciones", "Revisamos las observaciones y la congruencia entre secciones para organizar los ajustes. El objetivo es que entiendas qué cambiar y por qué."],
          ["Quiero revisar antes de entregar", "Contrastamos pregunta, objetivos, variables, muestra y plan de análisis. Identificamos inconsistencias y puntos que requieren aclaración antes de la revisión institucional."]
        ].map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div></section>
      <section className="section-pad soft-section"><div className="section-shell">
        <span className="label">Alcance claro desde el inicio</span><h2 className="section-heading">Qué podemos revisar en tu protocolo de investigación.</h2>
        <p className="section-intro">El acompañamiento se acuerda según tu avance, los requisitos de tu institución y las partes que necesitas trabajar. Estos son los temas que podemos abordar:</p>
        <ul className="service-scope-list">
          <li><strong>Pregunta, justificación y objetivos:</strong> delimitar el problema y revisar que el estudio responda a lo que planteas.</li>
          <li><strong>Antecedentes y referencias:</strong> organizar evidencia pertinente, verificar fuentes y revisar el formato Vancouver cuando corresponda.</li>
          <li><strong>Metodología y variables:</strong> revisar diseño, población, criterios de selección y tabla de operacionalización.</li>
          <li><strong>Muestra y plan estadístico:</strong> revisar su coherencia con los objetivos, las variables y la información disponible.</li>
          <li><strong>Ética, instrumentos y anexos:</strong> identificar los elementos que requiere tu protocolo para la revisión correspondiente.</li>
        </ul>
        <p>No ofrecemos aprobación garantizada ni sustituimos a tu asesor o comité. El trabajo busca que puedas comprender, explicar y defender las decisiones metodológicas de tu investigación.</p>
        <a className="button button--primary" href="#research-form">Consultar el alcance para mi proyecto <ArrowRight size={18} /></a>
      </div></section>
      <section className="section-pad"><div className="section-shell">
        <span className="label">Preguntas frecuentes</span><h2 className="section-heading">Antes de contratar asesoría para tu tesis o protocolo.</h2>
        <div className="service-faq">{[
          ["¿La asesoría es para protocolos clínicos y tesis en salud?", "Sí. J R Research se enfoca en acompañamiento metodológico para protocolos clínicos y trabajos académicos en salud. Revisamos tu tema y los requisitos institucionales antes de confirmar el alcance."],
          ["¿Puedo pedir apoyo solo para una parte del protocolo?", "Sí. Puedes solicitar revisión de la pregunta, objetivos, variables, metodología o plan de análisis. Primero identificamos qué necesitas y cómo se relaciona con el resto del documento."],
          ["¿Hacen la tesis por mí?", "El servicio es de acompañamiento y revisión metodológica. La autoría, el trabajo del equipo investigador y la integridad de los datos se mantienen bajo tu responsabilidad. No inventamos datos ni prometemos aprobación."],
          ["¿Cuánto cuesta y cuánto tarda la revisión?", "Depende del avance, la extensión, las observaciones y el alcance solicitado. Comparte tu situación y fecha límite para que podamos evaluar la viabilidad y preparar una propuesta; no publicamos un plazo único para todos los proyectos."],
          ["¿Qué información necesito para empezar?", "Tema, institución, especialidad, etapa actual y fecha de entrega. Si ya recibiste observaciones, descríbelas. Acordaremos cómo compartir documentos de trabajo sin información identificable de pacientes."],
          ["¿Cómo contacto a J R Research?", "Completa el formulario de esta página o agenda una conversación desde Contacto. Así podremos ubicar tu necesidad y explicarte el siguiente paso."]
        ].map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        <div className="hero-actions"><a className="button button--primary" href="#research-form">Quiero revisar mi protocolo <ArrowRight size={18} /></a><Link className="text-link" href="/aprende">Explorar capacitación con J R Aprende <ArrowRight size={18} /></Link></div>
      </div></section>
      <CmsAdditionalBlocks blocks={content.research.blocks} pageKey="research" />
      <ServiceStructuredData name="Asesoría para protocolos de investigación y tesis en salud" description="Acompañamiento metodológico en pregunta, objetivos, variables y plan de análisis." path="/research" />
    </>
  ), "research")}</VisualPage>;
}

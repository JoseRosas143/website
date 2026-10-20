import { ServiceStructuredData } from "@/components/ServiceStructuredData";
export const dynamic = "force-dynamic";
import { VisualPage } from "@/components/VisualPage";
import { editableTree } from "@/lib/editable-tree";
import { pageFor } from "@/lib/site-content";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Check, FileCheck2, MessageCircle, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { CmsAdditionalBlocks } from "@/components/CmsAdditionalBlocks";
import { pageMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/storage";

export const metadata: Metadata = pageMetadata(
  "Seguros de auto en Puebla | Cotiza y compara",
  "Cotiza tu seguro de auto en Puebla. Compara opciones, coberturas y deducibles con asesoría personal. Solicita tu cotización por WhatsApp o formulario.",
  "/seguros"
);

export default async function SegurosPage() {
  const content = await getSiteContent();
  const page = content.pages.seguros;
  return <VisualPage pageKey="seguros" initialPage={pageFor(content, "seguros")}>{editableTree((
    <>
      <section className="page-hero insurance-hero"><div className="page-hero-grid section-shell"><div className="page-hero-copy"><h1>{page.title}</h1><p>{page.description}</p><div className="hero-actions"><a className="button button--primary" href="#cotizar-seguro">{page.primaryCta} <ArrowRight size={18} /></a><Link className="button button--outline" href="https://wa.me/522213759147?text=Hola%2C%20quiero%20cotizar%20un%20seguro%20de%20auto." target="_blank">{page.secondaryCta} <MessageCircle size={18} /></Link></div></div><div className="insurance-visual"><Car /><div><span><ShieldCheck /> Coberturas claras</span><span><FileCheck2 /> Comparación acompañada</span><span><Check /> Atención personal</span></div></div></div></section>
      <section className="section-pad"><div className="section-shell"><span className="label">Asesoría antes y después</span><h2 className="section-heading">Compara seguros de auto con una explicación clara de lo que contratas.</h2><div className="insurer-rail">{["Quálitas", "MAPFRE", "Afirme", "Chubb", "HDI"].map((name) => <span key={name}>{name}</span>)}</div><div className="numbered-list">{[["Comparar", "Revisamos alternativas según vehículo, uso y prioridades."], ["Explicar", "Aterrizamos conceptos para que sepas qué estás contratando."], ["Acompañar", "Damos seguimiento a la emisión y orientamos ante dudas posteriores."]].map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="section-pad soft-section" id="cotizar-seguro"><div className="learn-form-grid section-shell"><div><span className="label">Cotización</span><h2>Solicita una cotización para tu auto.</h2><p className="section-intro">Comparte marca, modelo, año, versión, código postal y uso del vehículo. Si buscas renovar, indica cuándo vence tu póliza. Revisaremos tu solicitud y te contactaremos para precisar las opciones; enviar el formulario no contrata un seguro.</p></div><QuoteForm defaultService="Seguros" source="seguros" /></div></section>
      <section className="section-pad" id="comparar-coberturas"><div className="section-shell">
        <span className="label">Elige con información</span><h2 className="section-heading">¿Qué revisar al comparar un seguro de auto?</h2>
        <p className="section-intro">El precio importa, pero también lo que tendrías que pagar y resolver si ocurre un siniestro. Antes de elegir, revisa estos puntos en la propuesta y las condiciones de la póliza.</p>
        <div className="numbered-list">{[
          ["Coberturas y exclusiones", "Identifica qué riesgos contempla la propuesta y qué situaciones quedan fuera. Declara el uso real del vehículo para revisar una opción adecuada."],
          ["Deducibles y sumas aseguradas", "Compara cuánto aportarías en los supuestos que aplican y hasta qué monto responde cada cobertura. Una prima menor puede venir acompañada de condiciones distintas."],
          ["Asistencias y forma de pago", "Revisa los servicios incluidos, sus límites, el costo total y las condiciones del pago elegido. Pregunta antes de contratar si algo no queda claro."]
        ].map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <p className="service-note">Las coberturas, aceptación, costos y condiciones dependen de la aseguradora, el vehículo y la póliza contratada. Puedes consultar también el <a href="https://webappsos.condusef.gob.mx/SimuladorSeguroAutomovil/" target="_blank" rel="noreferrer">comparador de seguros de auto de CONDUSEF</a>.</p>
      </div></section>
      <section className="section-pad soft-section"><div className="section-shell">
        <span className="label">Antes de cotizar</span><h2 className="section-heading">Resolvemos tus dudas sobre seguros de auto.</h2>
        <div className="service-faq">{[
          ["¿Cuánto cuesta un seguro de auto en Puebla?", "No hay una tarifa única. La cotización depende del vehículo, el código postal, el uso y las coberturas solicitadas, entre otros datos. Envíanos la información de tu auto para revisar una propuesta concreta."],
          ["¿Puedo comparar distintas aseguradoras?", "Podemos orientarte sobre opciones de Quálitas, MAPFRE, Afirme, Chubb y HDI. La disponibilidad de una propuesta depende del vehículo y de las condiciones de cada compañía; no todas las opciones son equivalentes."],
          ["¿Me ayudan si mi póliza está por vencer?", "Sí. Indica la fecha de vencimiento y qué te gustaría revisar de tu cobertura actual. Podemos ayudarte a comparar antes de decidir sobre tu renovación."],
          ["¿Puedo solicitar atención por WhatsApp?", "Sí. Escríbenos al 221 375 9147 con los datos básicos del vehículo. Desde Puebla atendemos consultas a distancia; confirmaremos la disponibilidad según tu ubicación y solicitud."],
          ["¿Solicitar una cotización significa que ya estoy asegurado?", "No. La cotización es una propuesta. Antes de circular confiando en una cobertura, confirma la emisión, vigencia, pago y condiciones de la póliza con la aseguradora."]
        ].map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        <div className="hero-actions"><a className="button button--primary" href="#cotizar-seguro">Quiero comparar mi seguro <ArrowRight size={18} /></a><Link className="text-link" href="/contacto">Consultar con J R Consulting <ArrowRight size={18} /></Link></div>
      </div></section>
      <CmsAdditionalBlocks blocks={page.blocks} pageKey="seguros" />
      <ServiceStructuredData name="Asesoría y cotización de seguros de auto" description="Comparación de opciones, coberturas y deducibles con asesoría personal en Puebla." path="/seguros" />
    </>
  ), "seguros")}</VisualPage>;
}

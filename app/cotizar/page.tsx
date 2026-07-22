import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Solicita una cotización", "Cuéntanos qué quieres resolver y recibe una propuesta de alcance para consultoría, tecnología, websites, capacitación, investigación, RAMX o seguros.", "/cotizar");

export default async function CotizarPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const { servicio = "" } = await searchParams;
  const defaults: Record<string, string> = { website: "Website y presencia digital", tecnologia: "Soluciones tecnológicas e IA", aprende: "J R Aprende — capacitación", research: "J R Research — protocolo", ramx: "RAMX", seguros: "Seguros" };
  return (
    <section className="quote-page section-pad"><div className="quote-page-grid section-shell"><div><span className="label">Empecemos con contexto</span><h1>Una buena propuesta empieza con las preguntas correctas.</h1><p>Cuéntanos qué necesitas, qué has intentado y qué resultado buscas. Revisaremos el alcance antes de recomendar una solución.</p><div className="quote-expectations"><span>01 <b>Revisamos tu solicitud</b></span><span>02 <b>Aclaramos el alcance</b></span><span>03 <b>Proponemos el siguiente paso</b></span></div></div><QuoteForm defaultService={defaults[servicio] || ""} source="cotizar" /></div></section>
  );
}

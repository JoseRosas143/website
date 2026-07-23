import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Check, FileCheck2, MessageCircle, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { CmsAdditionalBlocks } from "@/components/CmsAdditionalBlocks";
import { pageMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/storage";

export const metadata: Metadata = pageMetadata(
  "Cotización de seguros de auto en Puebla y México",
  "Asesoría para comparar seguros de automóvil con Quálitas, MAPFRE, Afirme, Chubb y HDI. Atención por WhatsApp al 221 375 9147.",
  "/seguros"
);

export default async function SegurosPage() {
  const content = await getSiteContent();
  const page = content.pages.seguros;
  return (
    <>
      <section className="page-hero insurance-hero"><div className="page-hero-grid section-shell"><div className="page-hero-copy"><h1>{page.title}</h1><p>{page.description}</p><div className="hero-actions"><a className="button button--primary" href="#cotizar-seguro">{page.primaryCta} <ArrowRight size={18} /></a><Link className="button button--outline" href="https://wa.me/522213759147" target="_blank">{page.secondaryCta} <MessageCircle size={18} /></Link></div></div><div className="insurance-visual"><Car /><div><span><ShieldCheck /> Coberturas claras</span><span><FileCheck2 /> Comparación acompañada</span><span><Check /> Atención personal</span></div></div></div></section>
      <section className="section-pad"><div className="section-shell"><span className="label">Asesoría antes y después</span><h2 className="section-heading">Una póliza debe entenderse antes de necesitarse.</h2><div className="insurer-rail">{["Quálitas", "MAPFRE", "Afirme", "Chubb", "HDI"].map((name) => <span key={name}>{name}</span>)}</div><div className="numbered-list">{[["Comparar", "Revisamos alternativas según vehículo, uso y prioridades."], ["Explicar", "Aterrizamos conceptos para que sepas qué estás contratando."], ["Acompañar", "Damos seguimiento a la emisión y orientamos ante dudas posteriores."]].map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="section-pad soft-section" id="cotizar-seguro"><div className="learn-form-grid section-shell"><div><span className="label">Cotización</span><h2>Cuéntanos qué vehículo quieres proteger.</h2><p className="section-intro">Ten a la mano marca, modelo, año, versión, código postal y edad del conductor habitual.</p></div><QuoteForm defaultService="Seguros" source="seguros" /></div></section>
      <CmsAdditionalBlocks blocks={page.blocks} pageKey="seguros" />
    </>
  );
}

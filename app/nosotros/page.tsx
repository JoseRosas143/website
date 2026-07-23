import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";
import { CmsAdditionalBlocks } from "@/components/CmsAdditionalBlocks";
import { getSiteContent } from "@/lib/storage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Nosotros | J R Consulting", "Conoce la historia, propósito y valores de J R Consulting en Puebla, México.", "/nosotros");

export default async function NosotrosPage() {
  const content = await getSiteContent();
  const page = content.pages.nosotros;
  const story = page.blocks.find((block) => block.type === "story" && block.enabled);
  const values = page.blocks.find((block) => block.type === "rich-text" && block.enabled);

  return <>
    <section className="about-hero"><div className="section-shell"><span>J R Consulting</span><h1>{page.title}</h1><p>{page.description}</p><Link className="button button--light" href="/contacto">{page.primaryCta} <ArrowRight size={17} /></Link></div></section>
    <section className="about-story section-shell"><div><span className="label">{story?.title || "Nuestra historia"}</span><h2>Creemos que nadie debería sentir que crecer es algo reservado para unos cuantos.</h2></div><div><p>{story?.body || "J R Consulting nace al ver de cerca a profesionistas, emprendedores y negocios con talento, esfuerzo e ideas valiosas, pero sin una ruta clara para convertirlas en avance sostenible."}</p><p>Por eso reunimos estrategia, tecnología, educación y acompañamiento en una firma que escucha primero. No buscamos entregar documentos que se quedan guardados: buscamos que cada persona y cada equipo se vaya con mayor claridad, mejores herramientas y capacidad para seguir avanzando.</p></div></section>
    <section className="values-band"><div className="section-shell"><span className="label">{values?.title || "Lo que nos guía"}</span>{values?.body && <p className="section-intro">{values.body}</p>}<div className="value-grid">{[[HeartHandshake,"Cercanía", "Entendemos el contexto antes de proponer una solución."],[Lightbulb,"Claridad", "Hacemos lo complejo entendible para tomar mejores decisiones."],[ShieldCheck,"Responsabilidad", "Recomendamos lo que podemos sostener y cumplimos lo que acordamos."]].map(([Icon,title,text]) => { const I=Icon as typeof HeartHandshake; return <article key={title as string}><I /><h3>{title as string}</h3><p>{text as string}</p></article>; })}</div></div></section>
    <section className="section-pad section-shell"><span className="label">Nuestra forma de trabajar</span><div className="about-commitment"><h2>No te vendemos ruido. Construimos contigo el siguiente paso.</h2><p>Escuchamos, diseñamos una ruta realista e implementamos con intención. Queremos que la solución funcione hoy y que te deje preparado para lo que viene después.</p><Link className="text-link" href="/soluciones">Conocer soluciones <ArrowRight /></Link></div></section>
    <CmsAdditionalBlocks blocks={page.blocks} pageKey="nosotros" />
  </>;
}

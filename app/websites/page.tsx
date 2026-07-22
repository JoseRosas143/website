import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Gauge, LockKeyhole, PenTool, Search, Smartphone, Target } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { WebsiteMockup } from "@/components/WebsiteMockup";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Diseño de páginas web profesionales y SEO en Puebla",
  "Websites rápidos, seguros, administrables y orientados a conversión para profesionales, emprendedores y pequeñas empresas en México.",
  "/websites"
);

export default function WebsitesPage() {
  return (
    <>
      <section className="page-hero website-page-hero">
        <div className="page-hero-grid section-shell">
          <div className="page-hero-copy"><h1>Tu website debe explicar, convencer y convertir.</h1><p>Unimos estrategia, contenido, UX/UI, desarrollo, SEO técnico y analítica para construir una presencia digital que trabaje contigo.</p><div className="hero-actions"><Link className="button button--primary" href="#cotizar-website">Cotizar mi website <ArrowRight size={18} /></Link><a className="button button--outline" href="#metodo">Conocer el método</a></div></div>
          <WebsiteMockup />
        </div>
      </section>
      <section className="section-pad" id="metodo"><div className="section-shell"><span className="label">Filosofía de trabajo</span><h2 className="section-heading">Diseño con intención, tecnología con propósito.</h2><div className="numbered-list web-value-list">
        {[
          [Target, "Claridad estratégica", "Antes de diseñar definimos audiencia, propuesta, recorrido y acción principal."],
          [PenTool, "Experiencia y contenido", "Estructuramos páginas y mensajes para que la oferta se entienda sin esfuerzo."],
          [Gauge, "Velocidad real", "Optimizamos imágenes, código y carga para una experiencia rápida en móvil."],
          [Search, "SEO desde la estructura", "Metadatos, semántica, contenido y rastreo se consideran desde el inicio."],
          [BarChart3, "Medición", "Configuramos eventos y objetivos para aprender qué atrae y qué convierte."],
          [LockKeyhole, "Seguridad y autonomía", "Entregamos una base mantenible y un panel para editar sin tocar código."]
        ].map(([Icon, title, text], index) => { const C = Icon as typeof Target; return <article key={title as string}><span>0{index + 1}</span><h3><C />{title as string}</h3><p>{text as string}</p></article>; })}
      </div></div></section>
      <section className="dark-band section-pad"><div className="split-section section-shell"><h2>Mobile-first no significa “que se vea”. Significa que funcione.</h2><div><Smartphone className="large-line-icon" /><p className="section-intro">La mayor parte de tus prospectos llegará desde un teléfono. Priorizamos lectura, velocidad, navegación, accesibilidad y formularios sin fricción antes de agregar efectos.</p><div className="capability-tags">{["Responsive", "Accesible", "Rápido", "Seguro", "Administrable", "Medible"].map((item) => <span key={item}>{item}</span>)}</div></div></div></section>
      <section className="section-pad soft-section" id="cotizar-website"><div className="learn-form-grid section-shell"><div><span className="label">Cotización</span><h2>Construyamos un website que tenga un trabajo claro.</h2><p className="section-intro">Cuéntanos si necesitas lanzar, rediseñar o corregir tu sitio. La propuesta se ajustará al alcance real.</p></div><QuoteForm defaultService="Website y presencia digital" source="websites" /></div></section>
    </>
  );
}

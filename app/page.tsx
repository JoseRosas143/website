import Link from "next/link";
import { ArrowRight, BarChart3, Crosshair, PenTool } from "lucide-react";
import { BusinessSystemVisual } from "@/components/BusinessSystemVisual";
import { ServiceRail } from "@/components/ServiceRail";
import { WebsiteMockup } from "@/components/WebsiteMockup";
import { getSiteContent } from "@/lib/storage";

export default async function Home() {
  const content = await getSiteContent();
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-grid section-shell">
          <div className="hero-copy">
            <h1>{content.home.title}</h1>
            <p>{content.home.description}</p>
            <div className="hero-actions">
              <Link className="button button--primary" href="/contacto">{content.home.primaryCta} <ArrowRight size={18} /></Link>
              <Link className="button button--outline" href="/soluciones">{content.home.secondaryCta} <ArrowRight size={18} /></Link>
            </div>
          </div>
          <BusinessSystemVisual />
        </div>
        <ServiceRail />
      </section>

      <section className="process-section">
        <div className="process-grid section-shell">
          <h2>Un socio para convertir complejidad en avance.</h2>
          <div className="process-steps">
            {[
              ["1", "Entender", "Escuchamos, analizamos y diagnosticamos tu situación actual."],
              ["2", "Diseñar", "Creamos la estrategia, el sistema y la experiencia que necesitas."],
              ["3", "Implementar", "Ejecutamos con método, automatizamos y medimos resultados."]
            ].map(([number, title, text]) => <div className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="websites-feature section-pad">
        <div className="website-grid section-shell">
          <div className="website-copy">
            <h2>Un website no es un folleto. Es una herramienta de negocio.</h2>
            <p>Diseñamos sitios rápidos, claros y preparados para atraer, explicar y convertir.</p>
            <Link className="button button--primary" href="/cotizar?servicio=website">Cotizar mi website <ArrowRight size={18} /></Link>
          </div>
          <WebsiteMockup />
        </div>
        <div className="section-shell">
          <div className="philosophies">
            {[
              [Crosshair, "Claridad antes que decoración", "Estructuramos la información para que tu mensaje sea entendido en segundos."],
              [PenTool, "Diseño con intención", "Cada decisión visual y de contenido responde a un objetivo de negocio."],
              [BarChart3, "Medir para mejorar", "Implementamos analítica para optimizar lo que realmente importa."]
            ].map(([Icon, title, copy]) => {
              const C = Icon as typeof Crosshair;
              return <article className="philosophy" key={title as string}><span><C /></span><div><h3>{title as string}</h3><p>{copy as string}</p></div></article>;
            })}
          </div>
          <div className="capability-rail">{["Estrategia", "UX/UI", "Desarrollo", "SEO técnico", "Analítica", "Autonomía"].map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="ecosystem-section section-pad">
        <div className="section-shell">
          <h2 className="section-heading ecosystem-heading">Una firma. Distintas formas de hacer avanzar una idea.</h2>
          <div className="ecosystem-row">
            <span>01</span><h3>J R Aprende</h3>
            <div className="ecosystem-row-copy"><p>Capacitación práctica para transformar habilidades en oportunidades.</p><Link className="text-link" href="/aprende">Conocer Aprende <ArrowRight /></Link></div>
            <div className="ecosystem-art learning-path-mini"><span>Fundamentos</span><i /><span>Aplicación</span><i /><span>Proyecto</span><i /><span>Evidencia</span></div>
          </div>
          <div className="ecosystem-row">
            <span>02</span><h3>J R Research</h3>
            <div className="ecosystem-row-copy"><p>Acompañamiento metodológico para protocolos claros, viables y defendibles.</p><Link className="text-link" href="/research">Explorar Research <ArrowRight /></Link></div>
            <div className="ecosystem-art"><div className="protocol-mini"><strong>Protocolo de investigación</strong>{["Planteamiento del problema", "Objetivos", "Metodología", "Plan de análisis", "Consideraciones éticas"].map((item) => <span key={item}>{item}</span>)}</div></div>
          </div>
          <div className="ecosystem-row">
            <span>03</span><h3>RAMX</h3>
            <div className="ecosystem-row-copy"><p>Identidad digital y herramientas para proteger y gestionar la vida de las mascotas.</p><Link className="text-link" href="/ramx">Conocer RAMX <ArrowRight /></Link></div>
            <div className="ecosystem-art"><div className="pet-profile-mini"><div className="pet-avatar">R</div><div><strong>Perfil RAMX</strong><small>Identificación digital</small></div><div className="pet-modules"><span>QR · NFC</span><span>Salud</span><span>Contacto</span><span>Alertas</span></div></div></div>
          </div>
          <div className="ecosystem-row" id="jr-os">
            <span>04</span><h3>J R OS</h3>
            <div className="ecosystem-row-copy"><p>El sistema operativo para ordenar y hacer crecer pequeños negocios.</p><span className="text-link">Próximamente</span></div>
            <div className="ecosystem-art"><div className="os-modules">{["Clientes", "Ventas", "Operaciones", "Finanzas", "Reportes", "Integraciones"].map((item) => <span key={item}>{item}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section className="ecosystem-cta"><h2>Cuéntanos qué quieres construir.</h2><Link className="button button--light" href="/contacto">Agenda una conversación <ArrowRight size={18} /></Link></section>
    </>
  );
}

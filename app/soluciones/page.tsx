import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, BriefcaseBusiness, Check, Layers3, MonitorSmartphone, ShieldCheck, Workflow } from "lucide-react";
import { CalendarButton } from "@/components/CalendarButton";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Consultoría estratégica, tecnología e inteligencia artificial",
  "Diagnóstico, automatización, IA, procesos, herramientas digitales y acompañamiento para pequeñas empresas y profesionales en México.",
  "/soluciones"
);

const techCalendar = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Zd_jfa8D1LGNYzTQuE9S4Ck5h_Qk065T8Z3UfvI9W51H66YlYi9B9Orw4IZZv-Xaq0pVe9-Va?gv=true";
const businessCalendar = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ177WE3fqbQwp0m8QhRkYMirdk2OpLQPJS4XaVlyb9d4KXWiffxHk48lELTuzwtdGxudkKa6s8z?gv=true";

export default function SolucionesPage() {
  return (
    <>
      <section className="page-hero"><div className="page-hero-grid section-shell"><div className="page-hero-copy"><h1>Soluciones que ordenan, conectan y hacen avanzar tu negocio.</h1><p>No partimos de una herramienta. Partimos de lo que quieres resolver y elegimos la combinación correcta de estrategia, procesos y tecnología.</p><div className="hero-actions"><Link className="button button--primary" href="/cotizar">Solicitar diagnóstico <ArrowRight size={18} /></Link><a className="button button--outline" href="#agenda">Agendar una cita</a></div></div><div className="page-hero-art solution-orbit"><Layers3 /><span>Estrategia</span><span>Operación</span><span>Tecnología</span></div></div></section>
      <section className="section-pad"><div className="section-shell"><span className="label">Áreas de trabajo</span><h2 className="section-heading">La solución debe adaptarse al problema, no al revés.</h2><div className="solution-lines">
        {[
          ["estrategia", BriefcaseBusiness, "Estrategia y crecimiento", "Clarificamos propuesta, prioridades, procesos y plan de implementación.", ["Diagnóstico de negocio", "Oferta y posicionamiento", "Ruta de crecimiento", "Indicadores prácticos"]],
          ["tecnologia", Bot, "Tecnología e IA", "Integramos herramientas que ahorran trabajo, reducen errores y mejoran la atención.", ["Automatización de procesos", "Asistentes con IA", "Integraciones", "Capacitación del equipo"]],
          ["operacion", Workflow, "Sistemas de operación", "Convertimos información dispersa en flujos visibles, responsables y repetibles.", ["CRM y seguimiento", "Formularios y bases de datos", "Tableros operativos", "Documentación"]],
          ["digital", MonitorSmartphone, "Presencia digital", "Diseñamos activos digitales que comunican con claridad y generan oportunidades.", ["Website y landing pages", "SEO técnico", "Analítica", "Captación de leads"]],
          ["riesgo", ShieldCheck, "Protección y continuidad", "Ayudamos a proteger activos, operación y decisiones con información comprensible.", ["Seguros", "Privacidad y accesos", "Respaldos", "Buenas prácticas"]]
        ].map(([id, Icon, title, copy, items], index) => { const C = Icon as typeof Bot; return <article className="solution-line" id={id as string} key={title as string}><span>0{index + 1}</span><div><C /><h3>{title as string}</h3><p>{copy as string}</p></div><ul>{(items as string[]).map((item) => <li key={item}><Check />{item}</li>)}</ul></article>; })}
      </div></div></section>
      <section className="dark-band section-pad" id="jr-os"><div className="section-shell os-preview"><div><span className="label">Próximamente</span><h2>J R OS</h2><p>Un sistema operativo para pequeños negocios: clientes, ventas, operación, finanzas, tareas e información conectadas en una misma lógica.</p><Link className="button button--light" href="/contacto">Quiero recibir novedades <ArrowRight size={18} /></Link></div><div className="os-board">{["Clientes", "Ventas", "Operaciones", "Finanzas", "Tareas", "Reportes"].map((item, i) => <span key={item}><i>0{i + 1}</i>{item}</span>)}</div></div></section>
      <section className="section-pad" id="agenda"><div className="section-shell"><span className="label">Elige el punto de partida</span><h2 className="section-heading">Una conversación enfocada desde el inicio.</h2><div className="appointment-grid"><article><Bot /><h3>Soluciones tecnológicas</h3><p>Para websites, automatización, inteligencia artificial, integraciones o sistemas.</p><CalendarButton url={techCalendar} /></article><article><BriefcaseBusiness /><h3>Necesidades del negocio</h3><p>Para ordenar prioridades, oferta, crecimiento, operación o tomar una decisión estratégica.</p><CalendarButton url={businessCalendar} /></article></div></div></section>
    </>
  );
}

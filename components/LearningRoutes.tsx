"use client";

import { ArrowLeft, ArrowRight, Bot, BriefcaseBusiness, Code2, LineChart, Workflow } from "lucide-react";
import { useRef } from "react";

const routes = [
  { icon: Bot, title: "Fundamentos de IA aplicada", copy: "Comprende conceptos clave y úsalos con criterio en tareas reales.", level: "Inicial" },
  { icon: Workflow, title: "Google Workspace esencial", copy: "Colabora mejor y automatiza flujos cotidianos de trabajo.", level: "Inicial" },
  { icon: Code2, title: "Web con no-code", copy: "Crea páginas, formularios y automatizaciones sin escribir código.", level: "Práctico" },
  { icon: LineChart, title: "Ventas consultivas digitales", copy: "Atrae, conversa y da seguimiento con un sistema claro.", level: "Aplicado" },
  { icon: BriefcaseBusiness, title: "Operación digital para negocios", copy: "Ordena herramientas, información y responsabilidades del equipo.", level: "Aplicado" }
];

export function LearningRoutes() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => rail.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  return (
    <div className="learning-carousel">
      <div className="carousel-heading"><div><h2>Rutas destacadas</h2><p>Recorridos recomendados para avanzar con enfoque y orden.</p></div><div><button onClick={() => scroll(-1)} aria-label="Ruta anterior"><ArrowLeft /></button><button onClick={() => scroll(1)} aria-label="Siguiente ruta"><ArrowRight /></button></div></div>
      <div className="learning-rail" ref={rail}>
        {routes.map((route) => { const Icon = route.icon; return (
          <article key={route.title} className="learning-card"><Icon /><span>{route.level}</span><h3>{route.title}</h3><p>{route.copy}</p><a href="#formulario-aprende">Quiero esta ruta <ArrowRight /></a></article>
        ); })}
      </div>
    </div>
  );
}

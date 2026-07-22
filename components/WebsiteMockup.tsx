"use client";

import { ArrowRight, BarChart3, Code2, PenTool, Search, Target } from "lucide-react";
import { useState } from "react";

const tabs = [
  { name: "Inicio", title: "Una propuesta clara desde el primer segundo.", body: "Jerarquía, mensaje y acción alineados con tu objetivo comercial.", icon: Target },
  { name: "Servicios", title: "Explicar bien también es vender.", body: "Cada servicio responde qué resuelve, para quién y cuál es el siguiente paso.", icon: PenTool },
  { name: "Casos", title: "La evidencia genera confianza.", body: "Resultados, proceso y contexto presentados con honestidad y estructura.", icon: BarChart3 },
  { name: "Nosotros", title: "Una marca con criterio y personalidad.", body: "La identidad se traduce en decisiones visuales consistentes y memorables.", icon: Code2 },
  { name: "Contacto", title: "Menos fricción. Mejores conversaciones.", body: "Formularios y agendas diseñados para convertir interés en una oportunidad real.", icon: Search }
];

export function WebsiteMockup() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  const Icon = tab.icon;
  return (
    <div className="website-demo">
      <div className="browser-frame website-browser">
        <div className="browser-bar"><span className="traffic-lights"><i /><i /><i /></span><span>tuempresa.mx</span><span className="browser-tools">↗ ＋ □</span></div>
        <div className="demo-site-nav"><strong>Tu marca</strong><span>{tabs.map((item, index) => <button key={item.name} onClick={() => setActive(index)} className={index === active ? "is-active" : ""}>{item.name}</button>)}</span></div>
        <div className="demo-site-body" key={tab.name}>
          <div>
            <small>{tab.name}</small>
            <h3>{tab.title}</h3>
            <p>{tab.body}</p>
            <button>Conocer más <ArrowRight size={15} /></button>
          </div>
          <div className={`demo-art demo-art--${active}`}><Icon /><span /><span /><span /></div>
        </div>
      </div>
      <div className="stacked-tabs" aria-hidden="true"><i /><i /><i /></div>
      <div className="demo-pagination">
        <span>0{active + 1}</span><div>{tabs.map((item, index) => <button key={item.name} aria-label={`Mostrar ${item.name}`} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} />)}</div><span>0{tabs.length}</span>
      </div>
    </div>
  );
}

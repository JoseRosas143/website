"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

const services = [
  ["01", "Estrategia y crecimiento", "Alineamos propósito, oferta y operación para crecer con foco.", "/soluciones#estrategia"],
  ["02", "Tecnología e IA", "Implementamos herramientas y automatizaciones que optimizan tu negocio.", "/soluciones#tecnologia"],
  ["03", "Websites", "Sitios rápidos, seguros y orientados a convertir.", "/websites"],
  ["04", "J R Aprende", "Capacitación práctica para ti y tu equipo.", "/aprende"],
  ["05", "J R Research", "Metodología aplicada para protocolos congruentes.", "/research"]
];

export function ServiceRail() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => rail.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  return (
    <div className="service-rail-wrap">
      <button className="circle-button rail-back" onClick={() => scroll(-1)} aria-label="Servicios anteriores"><ArrowLeft /></button>
      <div className="service-rail" ref={rail}>
        {services.map(([number, name, description, href]) => (
          <Link href={href} className="service-rail-item" key={name}>
            <span>{number}</span><h3>{name}</h3><p>{description}</p><i />
          </Link>
        ))}
      </div>
      <button className="circle-button rail-next" onClick={() => scroll(1)} aria-label="Siguientes servicios"><ArrowRight /></button>
    </div>
  );
}

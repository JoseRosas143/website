"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const groups = [
  {
    title: "Consulting",
    links: [
      ["Soluciones", "/soluciones"],
      ["Websites", "/websites"],
      ["Seguros", "/seguros"],
      ["Cotizar", "/cotizar"]
    ]
  },
  {
    title: "Ecosistema",
    links: [
      ["J R Aprende", "/aprende"],
      ["J R Research", "/research"],
      ["RAMX", "/ramx"],
      ["J R OS — próximamente", "/soluciones#jr-os"]
    ]
  },
  {
    title: "Información",
    links: [
      ["Contacto", "/contacto"],
      ["Nosotros", "/nosotros"],
      ["Blog", "/blog"],
      ["Aviso de privacidad", "/aviso-de-privacidad"],
      ["Términos", "/terminos"],
      ["Administración", "/admin"]
    ]
  }
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="site-footer">
      <div className="footer-top section-shell">
        <div className="footer-intro">
          <Logo inverted />
          <p>Estrategia, tecnología y conocimiento para crecer con dirección.</p>
          <a className="footer-phone" href="https://wa.me/522213759147" target="_blank" rel="noreferrer">
            221 375 9147 <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-links">
          {groups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <span>© {new Date().getFullYear()} J R Consulting. Puebla, México.</span>
        <span>Creces tú y crecemos todos.</span>
      </div>
    </footer>
  );
}

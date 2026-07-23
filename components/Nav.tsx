"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/soluciones", label: "Soluciones" },
  { href: "/google-workspace", label: "Google Workspace" },
  { href: "/seguros", label: "Seguros" },
  { href: "/websites", label: "Websites" },
  { href: "/aprende", label: "J R Aprende" },
  { href: "/research", label: "J R Research" },
  { href: "/ramx", label: "RAMX" },
  { href: "/nosotros", label: "Nosotros" }
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Navegación principal">
          {links.map((link) => (
            <Link key={link.href} onClick={() => setOpen(false)} className={pathname === link.href ? "is-active" : ""} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link onClick={() => setOpen(false)} href="/contacto">Contacto</Link>
          <Link onClick={() => setOpen(false)} className="button button--outline nav-cta" href="/contacto#agenda">Agenda una cita <span>→</span></Link>
        </nav>
        <button className="mobile-menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Cerrar menú" : "Abrir menú"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BellRing, HeartPulse, MapPin, PawPrint, QrCode, Radio, ShieldCheck, Smartphone } from "lucide-react";
import { CalendarButton } from "@/components/CalendarButton";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/storage";

export const metadata: Metadata = pageMetadata(
  "RAMX | Identidad digital para mascotas",
  "Registro Animal MX conecta perfiles digitales de mascotas con QR, NFC y microchip para identificación, salud, contacto y alertas de extravío.",
  "/ramx"
);

export default async function RamxPage() {
  const content = await getSiteContent();
  const ramxCalendar = process.env.NEXT_PUBLIC_RAMX_APPOINTMENT_URL;
  return (
    <>
      <section className="page-hero ramx-hero"><div className="page-hero-grid section-shell"><div className="page-hero-copy"><h1>{content.ramx.title}</h1><p>{content.ramx.description}</p><div className="hero-actions"><a className="button button--primary" href="https://ramx.bonica.com.mx" target="_blank" rel="noreferrer">{content.ramx.primaryCta} <ArrowRight size={18} /></a><a className="button button--outline" href="#ramx-contacto">{content.ramx.secondaryCta}</a></div></div><div className="ramx-profile"><div className="ramx-pet"><PawPrint /><strong>Luna</strong><span>Perfil activo</span></div><div className="ramx-id"><QrCode /><div><strong>RAMX-IDENTIDAD</strong><small>Perfil digital vinculado</small></div></div><div className="ramx-links"><span><HeartPulse />Salud</span><span><MapPin />Ubicación</span><span><BellRing />Alertas</span><span><ShieldCheck />Contacto</span></div></div></div></section>
      <section className="section-pad"><div className="section-shell"><span className="label">Una identidad que acompaña</span><h2 className="section-heading">Información útil justo cuando más se necesita.</h2><div className="ramx-feature-grid">{[
        [QrCode, "Perfil público", "Datos de identificación y contacto accesibles al escanear la placa."],
        [Radio, "QR, NFC y microchip", "Distintas formas de vincular una mascota con su identidad digital."],
        [HeartPulse, "Información de salud", "Vacunas, alergias, notas y documentos organizados para el tutor."],
        [BellRing, "Modo extraviado", "Alertas y herramientas para aumentar las posibilidades de volver a casa."],
        [MapPin, "Última ubicación", "Registro de avistamientos y ubicación compartida por quien encuentra la mascota."],
        [Smartphone, "Desde cualquier dispositivo", "Experiencia mobile-first, sin exigir una app para escanear el perfil."]
      ].map(([Icon, title, copy]) => { const C = Icon as typeof QrCode; return <article key={title as string}><C /><h3>{title as string}</h3><p>{copy as string}</p></article>; })}</div></div></section>
      <section className="dark-band section-pad"><div className="split-section section-shell"><h2>Del registro gratuito a un ecosistema de protección.</h2><div><p className="section-intro">RAMX inicia con identidad digital, perfiles, alertas y expediente básico. La red veterinaria ampliará el ecosistema en una siguiente etapa sin prometer funciones que todavía están en desarrollo.</p><a className="button button--light" href="https://ramx.bonica.com.mx/tienda/order" target="_blank" rel="noreferrer">Conocer productos RAMX <ArrowRight size={18} /></a></div></div></section>
      <section className="section-pad soft-section" id="ramx-contacto"><div className="learn-form-grid section-shell"><div><span className="label">RAMX</span><h2>¿Quieres registrar, distribuir o colaborar?</h2><p className="section-intro">Cuéntanos si eres tutor, veterinaria, asociación, distribuidor o aliado potencial.</p>{ramxCalendar ? <CalendarButton url={ramxCalendar} label="Agendar cita RAMX" /> : <Link className="button button--outline" href="https://wa.me/522213759147?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20RAMX" target="_blank">Hablar por WhatsApp <ArrowRight size={18} /></Link>}</div><QuoteForm defaultService="RAMX" source="ramx" /></div></section>
    </>
  );
}

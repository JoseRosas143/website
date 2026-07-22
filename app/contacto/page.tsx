import type { Metadata } from "next";
import { Bot, BriefcaseBusiness, MessageCircle, Phone } from "lucide-react";
import { CalendarButton } from "@/components/CalendarButton";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Contacto y citas", "Agenda una cita o solicita una cotización con J R Consulting. Atención en Puebla y proyectos en todo México.", "/contacto");

const techCalendar = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Zd_jfa8D1LGNYzTQuE9S4Ck5h_Qk065T8Z3UfvI9W51H66YlYi9B9Orw4IZZv-Xaq0pVe9-Va?gv=true";
const businessCalendar = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ177WE3fqbQwp0m8QhRkYMirdk2OpLQPJS4XaVlyb9d4KXWiffxHk48lELTuzwtdGxudkKa6s8z?gv=true";

export default function ContactoPage() {
  return (
    <><section className="contact-hero section-pad"><div className="section-shell"><h1>Hablemos de lo que quieres resolver.</h1><div className="contact-intro"><p>No necesitas llegar con la solución definida. Cuéntanos el contexto y te ayudaremos a identificar el siguiente paso más útil.</p><div><a href="tel:+522213759147"><Phone />221 375 9147</a><a href="https://wa.me/522213759147" target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></div></div></div></section>
      <section className="section-pad soft-section" id="agenda"><div className="section-shell"><span className="label">Agenda directa</span><h2 className="section-heading">Elige la conversación adecuada.</h2><div className="appointment-grid"><article><Bot /><h3>Soluciones tecnológicas</h3><p>Websites, automatización, IA, integraciones, herramientas o sistemas digitales.</p><CalendarButton url={techCalendar} /></article><article><BriefcaseBusiness /><h3>Necesidades del negocio</h3><p>Estrategia, oferta, operación, crecimiento, prioridades o acompañamiento general.</p><CalendarButton url={businessCalendar} /></article></div></div></section>
      <section className="section-pad"><div className="learn-form-grid section-shell"><div><span className="label">Cotización o consulta</span><h2>También puedes dejarnos el contexto por escrito.</h2><p className="section-intro">Responderemos con preguntas concretas y, cuando aplique, una propuesta de alcance.</p></div><QuoteForm source="contacto" /></div></section></>
  );
}

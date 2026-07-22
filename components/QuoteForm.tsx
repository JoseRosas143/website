"use client";

import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { serviceOptions } from "@/lib/site-content";

type Status = "idle" | "sending" | "sent" | "fallback";

export function QuoteForm({ defaultService = "", compact = false, source = "website" }: { defaultService?: string; compact?: boolean; source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "", phone: "", company: "", service: defaultService, message: "" });
  const whatsappUrl = useMemo(() => {
    const text = `Hola, soy ${values.name || "un prospecto"}. Me interesa: ${values.service || "una solución de J R Consulting"}. ${values.message}`;
    return `https://wa.me/522213759147?text=${encodeURIComponent(text.trim())}`;
  }, [values]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source })
      });
      setStatus(response.ok ? "sent" : "fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status">
        <span><Check /></span>
        <h3>Recibimos tu solicitud.</h3>
        <p>Revisaremos la información y nos pondremos en contacto contigo. Si quieres avanzar ahora, también puedes escribirnos por WhatsApp.</p>
        <a className="button button--primary" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Abrir WhatsApp</a>
      </div>
    );
  }

  return (
    <form className={`quote-form${compact ? " quote-form--compact" : ""}`} onSubmit={submit}>
      <div className="field-grid">
        <label>Nombre completo<input required autoComplete="name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} /></label>
        <label>Correo electrónico<input required type="email" autoComplete="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} /></label>
        <label>Teléfono o WhatsApp<input required inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} /></label>
        <label>Negocio u organización <span>(opcional)</span><input autoComplete="organization" value={values.company} onChange={(e) => setValues({ ...values, company: e.target.value })} /></label>
      </div>
      <label>¿En qué podemos ayudarte?
        <select required value={values.service} onChange={(e) => setValues({ ...values, service: e.target.value })}>
          <option value="" disabled>Selecciona una opción</option>
          {serviceOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label>Cuéntanos brevemente qué necesitas<textarea required rows={compact ? 3 : 5} value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} placeholder="Objetivo, situación actual y fecha ideal…" /></label>
      <div className="form-submit-row">
        <p>Al enviar aceptas nuestro <Link href="/aviso-de-privacidad">aviso de privacidad</Link>.</p>
        <button className="button button--primary" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar solicitud"} <ArrowRight size={18} /></button>
      </div>
      {status === "fallback" ? (
        <div className="form-fallback" role="alert">
          No pudimos guardar la solicitud en este momento. No pierdas la información: <a href={whatsappUrl} target="_blank" rel="noreferrer">envíala por WhatsApp</a>.
        </div>
      ) : null}
    </form>
  );
}

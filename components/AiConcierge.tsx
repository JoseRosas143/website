"use client";

import { Bot, MessageCircle, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";

type Message = { role: "assistant" | "user"; text: string };
export function AiConcierge() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); const [input, setInput] = useState(""); const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Hola, soy el asistente de J R Consulting. Puedo orientarte sobre seguros, websites, tecnología, capacitación, investigación o RAMX. ¿Qué necesitas resolver?" }]);
  async function send(event: FormEvent) { event.preventDefault(); const question = input.trim(); if (!question || loading) return; const next = [...messages, { role: "user" as const, text: question }]; setMessages(next); setInput(""); setLoading(true); try { const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: question, history: next.slice(-6) }) }); const data = await response.json(); setMessages((current) => [...current, { role: "assistant", text: response.ok ? data.reply : "En este momento no pude responder. Puedes escribirnos al 221 375 9147 y te atendemos personalmente." }]); } catch { setMessages((current) => [...current, { role: "assistant", text: "Puedes escribirnos al 221 375 9147 y te atendemos personalmente." }]); } finally { setLoading(false); } }
  if (pathname.startsWith("/admin")) return null;
  return <div className="ai-concierge"><button className="ai-launcher" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar asistente" : "Abrir asistente virtual"}>{open ? <X /> : <MessageCircle />}<span>Asistente virtual</span></button>{open && <section className="ai-window"><header><span><Bot />J R Assistant</span><button onClick={() => setOpen(false)} aria-label="Cerrar"><X size={18} /></button></header><div className="ai-messages">{messages.map((message, index) => <p className={message.role} key={index}>{message.text}</p>)}{loading && <p className="assistant">Estoy revisando la información…</p>}</div><form onSubmit={send}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu pregunta…" /><button aria-label="Enviar" disabled={loading}><Send size={17} /></button></form><small>Al continuar aceptas que usemos esta conversación para atender tu solicitud.</small></section>}</div>;
}

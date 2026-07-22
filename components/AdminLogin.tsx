"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { Mark } from "@/components/Logo";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (response.ok) window.location.href = "/admin";
    else { setError("La contraseña no es correcta."); setLoading(false); }
  }
  return <main className="admin-login"><div className="admin-login-card"><Mark /><span className="admin-login-icon"><LockKeyhole /></span><h1>Panel de administración</h1><p>Edita textos y revisa solicitudes sin tocar el código.</p><form onSubmit={submit}><label>Contraseña<input autoFocus required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>{error ? <span className="admin-error">{error}</span> : null}<button className="button button--primary" disabled={loading}>{loading ? "Verificando…" : "Entrar"}<ArrowRight size={18} /></button></form><small>En desarrollo local, si no configuraste una clave, usa <code>demo</code>.</small></div></main>;
}

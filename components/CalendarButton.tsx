"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    calendar?: {
      schedulingButton: {
        load: (options: { url: string; color: string; label: string; target: HTMLElement }) => void;
      };
    };
  }
}

const loaded = new Promise<void>((resolve) => {
  if (typeof window === "undefined") return;
  if (window.calendar) return resolve();
  const existing = document.querySelector<HTMLScriptElement>("script[data-google-calendar-scheduling]");
  if (existing) {
    existing.addEventListener("load", () => resolve(), { once: true });
    return;
  }
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
  document.head.appendChild(stylesheet);
  const script = document.createElement("script");
  script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
  script.async = true;
  script.dataset.googleCalendarScheduling = "true";
  script.addEventListener("load", () => resolve(), { once: true });
  document.head.appendChild(script);
});

export function CalendarButton({
  url,
  label = "Programar una cita",
  color = "#0AAFB0"
}: {
  url: string;
  label?: string;
  color?: string;
}) {
  const target = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let active = true;
    const timeout = window.setTimeout(() => active && setFallback(true), 5000);
    loaded.then(() => {
      if (!active || !target.current || !window.calendar) return;
      target.current.innerHTML = "";
      window.calendar.schedulingButton.load({ url, color, label, target: target.current });
      window.clearTimeout(timeout);
    });
    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [color, label, url]);

  return (
    <div className="calendar-button-wrap" ref={target}>
      {fallback ? (
        <a className="button button--primary" href={url} target="_blank" rel="noreferrer"><CalendarDays size={18} /> {label}</a>
      ) : (
        <span className="calendar-loading"><CalendarDays size={18} /> Cargando agenda…</span>
      )}
    </div>
  );
}

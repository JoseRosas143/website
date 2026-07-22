export type EditablePage = {
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export type SiteContent = {
  home: EditablePage;
  aprende: EditablePage;
  research: EditablePage;
  ramx: EditablePage;
  contact: {
    phone: string;
    whatsapp: string;
  };
};

export const defaultContent: SiteContent = {
  home: {
    title: "Estrategia, tecnología y conocimiento para crecer con dirección.",
    description:
      "Diseñamos e implementamos soluciones que ordenan tu negocio, mejoran tu presencia digital y convierten ideas en sistemas que sí funcionan.",
    primaryCta: "Hablemos de tu proyecto",
    secondaryCta: "Explorar soluciones"
  },
  aprende: {
    title: "Aprender para abrir oportunidades reales.",
    description:
      "Rutas prácticas para desarrollar habilidades digitales, avanzar hacia certificaciones reconocidas y aplicar lo aprendido desde el primer proyecto.",
    primaryCta: "Explorar rutas",
    secondaryCta: "Capacitación para equipos"
  },
  research: {
    title: "Protocolos claros, viables y defendibles.",
    description:
      "Acompañamiento metodológico para transformar una pregunta clínica en un protocolo congruente, ético y listo para revisión.",
    primaryCta: "Revisar mi protocolo",
    secondaryCta: "Conocer el proceso"
  },
  ramx: {
    title: "Identidad digital que ayuda a proteger a cada mascota.",
    description:
      "RAMX conecta el perfil de tu mascota con placas QR, NFC y microchip para reunir identificación, salud y contacto en un solo lugar.",
    primaryCta: "Conocer RAMX",
    secondaryCta: "Solicitar información"
  },
  contact: {
    phone: "2213759147",
    whatsapp: "522213759147"
  }
};

export const editablePageLabels: Record<keyof Omit<SiteContent, "contact">, string> = {
  home: "Inicio",
  aprende: "J R Aprende",
  research: "J R Research",
  ramx: "RAMX"
};

export function mergeSiteContent(value: unknown): SiteContent {
  if (!value || typeof value !== "object") return defaultContent;
  const incoming = value as Partial<SiteContent>;
  return {
    home: { ...defaultContent.home, ...incoming.home },
    aprende: { ...defaultContent.aprende, ...incoming.aprende },
    research: { ...defaultContent.research, ...incoming.research },
    ramx: { ...defaultContent.ramx, ...incoming.ramx },
    contact: { ...defaultContent.contact, ...incoming.contact }
  };
}

export const serviceOptions = [
  "Estrategia y crecimiento",
  "Soluciones tecnológicas e IA",
  "Website y presencia digital",
  "J R Aprende — capacitación",
  "J R Research — protocolo",
  "RAMX",
  "Seguros",
  "Otro"
] as const;

export type Lead = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  status?: "nuevo" | "en_revision" | "contactado" | "cerrado";
  source?: string;
  created_at?: string;
};

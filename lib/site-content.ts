export type EditablePage = { title: string; description: string; primaryCta: string; secondaryCta: string };

export type CmsBlock = {
  id: string;
  type: "hero" | "insurance" | "services" | "story" | "ecosystem" | "benefits" | "process" | "referral" | "implementation" | "legal" | "cta" | "rich-text";
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  mediaUrl?: string;
  enabled: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  imageUrl?: string;
  published: boolean;
  publishedAt: string;
};

export type KnowledgeItem = {
  id: string;
  question: string;
  answer: string;
  topic: string;
  sourceName?: string;
  updatedAt?: string;
};

export type ManagedPage = EditablePage & { blocks: CmsBlock[] };
export type PageKey = "home" | "soluciones" | "workspace" | "websites" | "seguros" | "aprende" | "research" | "ramx" | "nosotros" | "contacto";

export type SiteContent = {
  home: ManagedPage;
  aprende: ManagedPage;
  research: ManagedPage;
  ramx: ManagedPage;
  pages: Record<Exclude<PageKey, "home" | "aprende" | "research" | "ramx">, ManagedPage>;
  blog: BlogPost[];
  knowledge: KnowledgeItem[];
  contact: { phone: string; whatsapp: string };
};

const standardBlocks = (items: Array<[CmsBlock["type"], string, string]>) => items.map(([type, title, body], index) => ({ id: `${type}-${index + 1}`, type, title, body, enabled: true }));

export const defaultContent: SiteContent = {
  home: {
    title: "Estrategia, tecnología y conocimiento para crecer con dirección.",
    description: "Diseñamos e implementamos soluciones que ordenan tu negocio, mejoran tu presencia digital y convierten ideas en sistemas que sí funcionan.",
    primaryCta: "Hablemos de tu proyecto", secondaryCta: "Explorar soluciones",
    blocks: standardBlocks([
      ["hero", "Estrategia que se convierte en avance", "Unimos claridad, tecnología y ejecución para que las buenas ideas se conviertan en negocios más fuertes."],
      ["insurance", "Seguros que sí responden", "Protegemos tus vehículos y lo que has construido con atención cercana y opciones de Quálitas, MAPFRE, Afirme, Chubb y HDI."],
      ["services", "Soluciones con propósito", "Consultoría, IA, websites, capacitación y servicios profesionales para construir capacidades reales."],
      ["story", "Nuestra historia", "J R Consulting nace de una convicción sencilla: el crecimiento debe ser accesible, humano y aplicable, no una promesa lejana."],
      ["ecosystem", "Un ecosistema para avanzar", "J R Aprende, J R Research, RAMX y próximamente J R OS conectan conocimiento, tecnología y acción."],
      ["cta", "Hablemos de lo que sigue", "Cuéntanos en qué punto estás y diseñemos una ruta que tenga sentido para ti."],
    ])
  },
  aprende: { title: "Aprender para abrir oportunidades reales.", description: "Rutas prácticas para desarrollar habilidades digitales, avanzar hacia certificaciones reconocidas y aplicar lo aprendido desde el primer proyecto.", primaryCta: "Explorar rutas", secondaryCta: "Capacitación para equipos", blocks: standardBlocks([["hero", "Aprender para avanzar", "Capacitación útil, acompañamiento y evidencia de lo que sabes hacer."]]) },
  research: { title: "Protocolos claros, viables y defendibles.", description: "Acompañamiento metodológico para transformar una pregunta clínica en un protocolo congruente, ético y listo para revisión.", primaryCta: "Revisar mi protocolo", secondaryCta: "Conocer el proceso", blocks: standardBlocks([["hero", "Investigación que se sostiene", "Orden metodológico para llevar una idea clínica a un protocolo viable."]]) },
  ramx: { title: "Identidad digital que ayuda a proteger a cada mascota.", description: "RAMX conecta el perfil de tu mascota con placas QR, NFC y microchip para reunir identificación, salud y contacto en un solo lugar.", primaryCta: "Conocer RAMX", secondaryCta: "Solicitar información", blocks: standardBlocks([["hero", "Una identidad que acompaña", "Tecnología para proteger la historia de cada mascota."]]) },
  pages: {
    soluciones: { title: "Soluciones que hacen que tu negocio avance.", description: "Estrategia, presencia digital y sistemas para convertir el trabajo diario en progreso medible.", primaryCta: "Hablar de mi negocio", secondaryCta: "Ver servicios", blocks: standardBlocks([["services", "Soluciones estratégicas", "Construimos sistemas claros para crecer con dirección."]]) },
    workspace: {
      title: "Google Workspace para empresas",
      description: "Correo profesional, colaboración y administración para que tu equipo trabaje mejor, con acompañamiento independiente de J R Consulting.",
      primaryCta: "Contratar directamente con Google",
      secondaryCta: "Solicitar asesoría",
      blocks: standardBlocks([
        ["hero", "Google Workspace para empresas", "Correo profesional, colaboración y administración para que tu equipo trabaje mejor, con acompañamiento independiente de J R Consulting."],
        ["benefits", "Todo lo que tu equipo necesita para trabajar mejor", "Correo empresarial con tu dominio, acceso desde cualquier lugar y herramientas de administración de nivel empresarial."],
        ["process", "Así trabajamos contigo", "Solicita asesoría, recibe individualmente tu código promocional, contrata directamente con Google y recibe acompañamiento de implementación."],
        ["referral", "Prueba Google Workspace", "Inicia una prueba de 14 días con el vínculo de referencia de J R Consulting o escríbenos si deseas recibir un descuento exclusivo durante tu prueba."],
        ["implementation", "Implementación independiente, a tu medida", "Configuración, migración, seguridad, capacitación y adopción se cotizan por separado según las necesidades de tu empresa."],
        ["legal", "Declaración de independencia", "J R Consulting es una firma de consultoría independiente y participa en el Programa de Referencias de Google Workspace. Google Workspace es contratado, proporcionado y facturado directamente por Google. Google y Google Workspace son marcas de Google LLC."]
      ])
    },
    websites: { title: "Websites que explican, atraen y convierten.", description: "Diseño y desarrollo pensado para hacer visible el valor de tu negocio.", primaryCta: "Cotizar mi website", secondaryCta: "Conocer el proceso", blocks: standardBlocks([["hero", "Tu sitio trabaja contigo", "No es un folleto: es una herramienta para explicar, atraer y convertir."]]) },
    seguros: { title: "Protección cercana para lo que más importa.", description: "Cotizamos seguros de auto con acompañamiento humano para tomar decisiones claras.", primaryCta: "Cotizar mi seguro", secondaryCta: "Hablar por WhatsApp", blocks: standardBlocks([["insurance", "Seguros que sí responden", "Opciones de Quálitas, MAPFRE, Afirme, Chubb y HDI para proteger tu camino."]]) },
    nosotros: { title: "Crecemos contigo, no desde lejos.", description: "Somos una firma que une consultoría, tecnología, educación y acompañamiento para hacer posible el siguiente paso.", primaryCta: "Conocer nuestras soluciones", secondaryCta: "Hablemos", blocks: standardBlocks([["story", "Nuestra historia", "J R Consulting nació para acercar herramientas, método y acompañamiento a quienes están construyendo algo importante."], ["rich-text", "Nuestros valores", "Escuchamos antes de proponer. Hacemos lo complejo entendible. Cumplimos con cercanía y construimos soluciones que dejan capacidad instalada."]]) },
    contacto: { title: "Hablemos de lo que quieres construir.", description: "Cuéntanos qué necesitas y te ayudaremos a definir el siguiente paso.", primaryCta: "Enviar solicitud", secondaryCta: "Escribir por WhatsApp", blocks: standardBlocks([["cta", "Conversemos", "Selecciona la línea de trabajo que te interesa y comparte el contexto de tu proyecto."]]) }
  },
  blog: [],
  knowledge: [
    { id: "jr-general", topic: "J R Consulting", question: "¿Qué hace J R Consulting?", answer: "J R Consulting acompaña a emprendedores, profesionistas y pequeñas empresas con estrategia, tecnología, IA, websites, capacitación y soluciones digitales." },
    { id: "jr-insurance", topic: "Seguros", question: "¿Qué seguros manejan?", answer: "Podemos orientar y cotizar seguros de auto con Quálitas, MAPFRE, Afirme, Chubb y HDI. El siguiente paso es solicitar una cotización." },
    { id: "jr-contact", topic: "Contacto", question: "¿Cómo puedo hablar con el equipo?", answer: "Puedes solicitar una cita desde el sitio o escribir por WhatsApp al 221 375 9147." }
  ],
  contact: { phone: "2213759147", whatsapp: "522213759147" }
};

export const editablePageLabels: Record<PageKey, string> = {
  home: "Inicio",
  soluciones: "Soluciones",
  workspace: "Google Workspace",
  seguros: "Seguros",
  websites: "Websites",
  aprende: "J R Aprende",
  research: "J R Research",
  ramx: "RAMX",
  nosotros: "Nosotros / Acerca de",
  contacto: "Contacto"
};

const blockTypes = new Set<CmsBlock["type"]>(["hero", "insurance", "services", "story", "ecosystem", "benefits", "process", "referral", "implementation", "legal", "cta", "rich-text"]);

function normalizeBlocks(value: unknown, fallback: CmsBlock[]): CmsBlock[] {
  if (!Array.isArray(value)) return fallback;
  return value.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const block = item as Partial<CmsBlock>;
    if (!block.type || !blockTypes.has(block.type)) return [];
    return [{
      id: typeof block.id === "string" && block.id ? block.id : `${block.type}-restored-${index + 1}`,
      type: block.type,
      title: typeof block.title === "string" ? block.title : "Bloque sin título",
      body: typeof block.body === "string" ? block.body : "",
      ctaLabel: typeof block.ctaLabel === "string" ? block.ctaLabel : "",
      ctaHref: typeof block.ctaHref === "string" ? block.ctaHref : "",
      mediaUrl: typeof block.mediaUrl === "string" ? block.mediaUrl : "",
      enabled: block.enabled !== false
    }];
  });
}

function mergePage(base: ManagedPage, value: unknown): ManagedPage {
  if (!value || typeof value !== "object") return base;
  const candidate = value as Partial<ManagedPage>;
  return {
    ...base,
    title: typeof candidate.title === "string" ? candidate.title : base.title,
    description: typeof candidate.description === "string" ? candidate.description : base.description,
    primaryCta: typeof candidate.primaryCta === "string" ? candidate.primaryCta : base.primaryCta,
    secondaryCta: typeof candidate.secondaryCta === "string" ? candidate.secondaryCta : base.secondaryCta,
    blocks: normalizeBlocks(candidate.blocks, base.blocks)
  };
}

export function mergeSiteContent(value: unknown): SiteContent {
  if (!value || typeof value !== "object") return defaultContent;
  const incoming = value as Partial<SiteContent>;
  return {
    home: mergePage(defaultContent.home, incoming.home), aprende: mergePage(defaultContent.aprende, incoming.aprende), research: mergePage(defaultContent.research, incoming.research), ramx: mergePage(defaultContent.ramx, incoming.ramx),
    pages: {
      soluciones: mergePage(defaultContent.pages.soluciones, incoming.pages?.soluciones),
      workspace: mergePage(defaultContent.pages.workspace, incoming.pages?.workspace),
      websites: mergePage(defaultContent.pages.websites, incoming.pages?.websites),
      seguros: mergePage(defaultContent.pages.seguros, incoming.pages?.seguros),
      nosotros: mergePage(defaultContent.pages.nosotros, incoming.pages?.nosotros),
      contacto: mergePage(defaultContent.pages.contacto, incoming.pages?.contacto)
    },
    blog: Array.isArray(incoming.blog) ? incoming.blog : defaultContent.blog,
    knowledge: Array.isArray(incoming.knowledge) ? incoming.knowledge : defaultContent.knowledge,
    contact: { ...defaultContent.contact, ...incoming.contact }
  };
}

export function pageFor(content: SiteContent, key: PageKey): ManagedPage { return key in content.pages ? content.pages[key as keyof typeof content.pages] : content[key as "home" | "aprende" | "research" | "ramx"]; }
export const serviceOptions = ["Estrategia y crecimiento", "Google Workspace", "Soluciones tecnológicas e IA", "Website y presencia digital", "J R Aprende — capacitación", "J R Research — protocolo", "RAMX", "Seguros", "Otro"] as const;
export type Lead = { id?: string; name: string; email: string; phone: string; company?: string; service: string; message: string; status?: "nuevo" | "en_revision" | "contactado" | "cerrado"; source?: string; created_at?: string; };

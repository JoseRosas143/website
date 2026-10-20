export const serviceCopy = {
  seguros: {
    title: "Seguros de auto en Puebla: cotiza y compara con asesoría personal.",
    description: "Encuentra una opción para tu vehículo y presupuesto. En J R Consulting te ayudamos a comparar seguros de auto, entender coberturas y deducibles, y solicitar tu cotización por WhatsApp o formulario.",
    primaryCta: "Solicitar cotización de auto",
    secondaryCta: "Cotizar por WhatsApp",
  },
  research: {
    title: "Asesoría para protocolos de investigación y tesis en salud.",
    description: "Convierte tu idea clínica o los comentarios de tu asesor en un plan de trabajo claro. J R Research te acompaña en pregunta de investigación, objetivos, variables, metodología y plan de análisis para preparar un protocolo congruente para revisión.",
    primaryCta: "Solicitar revisión de mi protocolo",
    secondaryCta: "Ver cómo trabajamos",
  },
} as const;

const previousCopy = {
  seguros: {
    title: "Protección cercana para lo que más importa.",
    description: "Cotizamos seguros de auto con acompañamiento humano para tomar decisiones claras.",
    primaryCta: "Cotizar mi seguro", secondaryCta: "Hablar por WhatsApp",
  },
  research: {
    title: "Protocolos claros, viables y defendibles.",
    description: "Acompañamiento metodológico para transformar una pregunta clínica en un protocolo congruente, ético y listo para revisión.",
    primaryCta: "Revisar mi protocolo", secondaryCta: "Conocer el proceso",
  },
} as const;

/** Upgrade only known template copy in saved CMS records; preserve custom wording and visual IDs. */
export function upgradeServiceCopy<T extends { title: string; description: string; primaryCta: string; secondaryCta: string }>(key: keyof typeof serviceCopy, page: T): T {
  const result = { ...page };
  for (const field of ["title", "description", "primaryCta", "secondaryCta"] as const) {
    if (result[field] === previousCopy[key][field]) result[field] = serviceCopy[key][field];
  }
  return result;
}

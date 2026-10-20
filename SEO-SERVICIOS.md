# Contenido SEO y conversión: Seguros y Research

## Cambios preparados

- /seguros: intención principal «seguros de auto en Puebla», con variaciones naturales «cotizar seguro de auto», «comparar seguros», «coberturas y deducibles» y «renovación». Explica la información necesaria, qué revisar, opciones de contacto y preguntas frecuentes. No promete precio mínimo, cobertura universal ni emisión automática.
- /research: intención principal «asesoría para protocolos de investigación», con «asesoría metodológica», «tesis en salud», «variables» y «plan de análisis». Explica para quién es, etapas, alcance, límites y cómo solicitar una propuesta. No ofrece aprobación, resultados inventados ni escritura académica sustitutiva.
- Inicio y carrusel: textos descriptivos que enlazan a las páginas de servicio.
- Títulos y descripciones específicos; Service y BreadcrumbList en JSON-LD, coherentes con la oferta visible. No se han inventado reseñas, calificaciones, precios, certificaciones o afiliaciones.
- Dominio de respaldo: https://www.jrconsulting.com.mx, coincidente con la canónica observada en el sitio público. NEXT_PUBLIC_SITE_URL sigue teniendo prioridad. Se elimina la barra final para no duplicar separadores.
- Sitemap dinámico para incluir artículos nuevos. Se elimina lastModified calculado con cada petición para páginas cuya fecha real no se conoce.
- Los textos predeterminados antiguos guardados en el CMS se actualizan por coincidencia exacta; se conservan textos personalizados y visualEdits. Las secciones originales mantienen sus posiciones para preservar las claves visuales. Las secciones nuevas se añaden después de las originales.

## Criterio editorial

Estas intenciones son una propuesta basada en los servicios existentes, no una investigación de volúmenes ni una garantía de ranking. Se mantiene el enfoque en seguros de auto porque es la oferta documentada; otros ramos requieren confirmar oferta y alcance antes de anunciarlos.

Fuentes de referencia:
- Google: contenido útil para personas: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google: títulos descriptivos: https://developers.google.com/search/docs/appearance/title-link
- Google: sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- CONDUSEF: comparar seguros de auto: https://webappsos.condusef.gob.mx/SimuladorSeguroAutomovil/

## Después de publicar

1. Confirmar que /seguros y /research responden 200 y muestran los nuevos textos. Si existe una personalización visual previa, revisarla en el administrador: se conserva y puede tener prioridad sobre el nuevo texto base.
2. Confirmar NEXT_PUBLIC_SITE_URL=https://www.jrconsulting.com.mx y una sola variante pública principal con redirecciones de las demás. No se modificó DNS en esta tarea.
3. En la propiedad correspondiente de Google Search Console, enviar https://www.jrconsulting.com.mx/sitemap.xml y solicitar inspección/indexación de ambas páginas. No se ha enviado desde esta tarea ni se dispone de confirmación de indexación.
4. Revisar consultas, impresiones, clics y solicitudes reales por servicio para decidir ajustes. No se han inventado volúmenes, conversiones ni plazos de posicionamiento.

## Validación

Pruebas de compatibilidad de contenido guardado, preservación de personalizaciones, canónicas y regresiones del editor. La sesión no dispone de navegador conectado; la validación visual queda pendiente. La comprobación HTTP del HTML generado y la compilación se documentan en la propuesta de integración.

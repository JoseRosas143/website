# Editor visual y blog

## Uso

En Administración → Páginas, el selector incluye Growth Lab. La vista usa la página real: selecciona un texto, una imagen o la flecha de un enlace para editarlo. La lista lateral permite ordenar u ocultar las secciones de la plantilla. Los bloques adicionales se editan en el panel lateral. Deshacer y Rehacer conservan los cambios de la sesión; Publicar cambios guarda el contenido. Salir con cambios pendientes muestra una advertencia. No hay guardado automático persistente de borradores de páginas.

El menú global, pie de página, formularios, calendarios y gráficos programados aparecen como referencia y no tienen edición visual interna en esta versión. La vista previa bloquea navegación y envío de formularios.

En Blog, usa la barra de formato o pega Markdown. Los artículos ya existentes con **negritas**, listas, encabezados y tablas se interpretan sin reescribir su contenido. El HTML crudo no se ejecuta. Añade etiquetas separadas por comas; se eliminan duplicados y se conservan hasta 20 etiquetas de 60 caracteres por artículo. Los visitantes pueden filtrar por etiqueta. Categoría sigue siendo un campo independiente.

## Compatibilidad y almacenamiento

El contenido JSON conserva los campos anteriores. La normalización incorpora Growth Lab y campos opcionales visualEdits, sectionOrder, hiddenSections y blog[].tags. No requiere migración SQL. Se mantiene el almacenamiento existente: Supabase en producción y archivo local únicamente en desarrollo o con la configuración explícita ya existente.

Las claves visuales proceden de la estructura de la plantilla. Al reorganizar JSX en futuras versiones se deben migrar las claves guardadas; no deben interpretarse como identificadores permanentes independientes del código. Los componentes propios que renderizan internamente texto requieren instrumentación explícita para hacerlo editable.

Las rutas de contenido se renderizan dinámicamente para reflejar lo guardado. La publicación actual guarda el documento completo; esta versión no incorpora resolución de conflictos entre administradores simultáneos.

## Validación

12 pruebas automatizadas, revisión de tipos, lint y compilación de producción. Prueba en navegador de Growth Lab: seleccionar texto, previsualizar sin cambiar la página pública, publicar en almacenamiento local y recargar la página pública. Prueba de blog: crear artículo, guardar etiquetas, navegar al filtro y comprobar negritas/listas en escritorio y móvil. Los datos de prueba están aislados y no se incluyen en el cambio. La conexión de producción y la subida de imágenes a Supabase requieren comprobación en el entorno desplegado.

## Pegado enriquecido, imágenes y fórmulas

Pega con Ctrl+V desde el contenido renderizado de ChatGPT, Word u otra página: el editor convierte HTML en Markdown conservando encabezados, listas, énfasis, enlaces, citas y tablas rectangulares. El botón Copiar de algunas aplicaciones entrega Markdown sin HTML: ese contenido también se acepta. La vista previa muestra el mismo componente que el artículo público. No replica colores, fuentes o diseños arbitrarios del origen.

Puedes pegar una imagen del portapapeles, arrastrar archivos al campo o usar Imagen para seleccionar archivos. PNG/JPG/WebP hasta 4 MB por archivo y 20 imágenes por operación. Se usa la carga autenticada existente y se inserta una URL persistente dentro del cuerpo; no cambia la portada. Publicar queda desactivado durante la importación. Un fallo conserva el texto anterior; las cargas completadas antes de un fallo posterior pueden quedar como archivos sin referencia.

Las imágenes remotas con URL pública se conservan como enlaces externos. Las imágenes temporales, privadas o con ruta relativa se sustituyen por un aviso para subir el archivo original. Las imágenes incrustadas PNG/JPG/WebP se suben automáticamente. No se descargan URLs externas desde el servidor. El almacenamiento de producción sigue dependiendo de Supabase cms-assets.

Usa Fórmula para insertar un bloque LaTeX. Se aceptan $...$, $$...$$, \(...\) y \[...\]; se preserva el TeX original cuando el HTML copiado contiene anotaciones KaTeX/MathML. Una imagen de una fórmula se conserva como imagen: no hay reconocimiento OCR. Para precios que pudieran confundirse con fórmulas, escapa el símbolo de moneda como \$ o escribe MXN. Las fórmulas inválidas conservan una representación visible sin impedir leer el artículo. KaTeX tiene trust desactivado y límites de expansión.

Las tablas con celdas combinadas se simplifican y generan un aviso; revisa la vista previa. La primera fila se interpreta como encabezado. Las tablas anchas y las fórmulas admiten desplazamiento horizontal. Los scripts, formularios, HTML activo y enlaces peligrosos no se publican.

Validación de esta ampliación: 21 pruebas, revisión de tipos y lint; comprobación en navegador del pegado conjunto de una tabla, negritas, cita, fórmula KaTeX e imagen incrustada, carga local de la imagen, vista previa y persistencia en el artículo público local. Los contenidos y archivos de prueba no forman parte del cambio.

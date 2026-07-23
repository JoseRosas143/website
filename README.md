# J R Consulting — sitio corporativo

Sitio profesional, responsive y optimizado para SEO construido con Next.js 16. Incluye J R Consulting, Google Workspace para empresas, Websites, J R Aprende, J R Research, RAMX, Seguros y la presentación de J R OS como próximo lanzamiento.

## Incluye

- Rutas comerciales con metadata, canonical, sitemap, robots y datos estructurados.
- Mockup de website con pestañas funcionales.
- Carruseles accesibles para servicios y rutas de aprendizaje.
- Dos agendas de Google Calendar: soluciones tecnológicas y necesidades del negocio.
- Formularios de cotización con respaldo por WhatsApp.
- Panel `/admin` con páginas completas, bloques reordenables, Blog, base de conocimientos del asistente y prospectos.
- Página `/google-workspace` con beneficios, planes, flujo de referencia, botones oficiales y declaración de independencia.
- Carga de imágenes para bloques y artículos mediante Supabase Storage.
- Asistente virtual flotante con OpenAI, diseñado para orientar y convertir conversaciones en oportunidades.
- Persistencia con Supabase en producción y JSON local en desarrollo.
- Migración SQL con RLS habilitado y sin políticas públicas.

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`. En desarrollo, si no configuraste `ADMIN_PASSWORD`, el panel acepta temporalmente la contraseña `demo`. En producción no existe contraseña predeterminada.

## Panel de administración

El panel está disponible en:

- Desarrollo: `http://localhost:3000/admin`
- Producción: `https://tu-dominio.com/admin`

### Acceso local

1. Ejecuta `npm run dev`.
2. Abre `/admin` en el navegador.
3. Si todavía no definiste `ADMIN_PASSWORD`, usa `demo` únicamente durante el desarrollo.

### Acceso en producción

Antes de desplegar, crea estas dos variables de entorno en Vercel:

```env
ADMIN_PASSWORD=una-clave-larga-y-unica
ADMIN_SESSION_SECRET=otro-secreto-largo-y-aleatorio
```

`ADMIN_PASSWORD` es la contraseña que escribirás al iniciar sesión. `ADMIN_SESSION_SECRET` firma la sesión; no es otra contraseña para introducir en pantalla. Ambas deben mantenerse privadas y no deben comenzar con `NEXT_PUBLIC_`.

Después de guardarlas, vuelve a desplegar el proyecto y visita `/admin`. Al entrar puedes:

- Elegir y editar todas las páginas: Inicio, Soluciones, Google Workspace, Seguros, Websites, J R Aprende, J R Research, RAMX, Nosotros y Contacto.
- Arrastrar bloques desde la biblioteca hasta la posición deseada en el lienzo visual.
- Alternar entre la biblioteca y la vista de capas; seleccionar, duplicar, ocultar, eliminar y reordenar bloques.
- Previsualizar los cambios sin publicar en escritorio, tableta y móvil.
- Deshacer y rehacer cambios antes de publicarlos.
- Cambiar el título, contenido, imagen y llamadas a la acción desde el inspector lateral.
- Crear, editar, publicar o eliminar artículos del Blog y subir su imagen de portada.
- Alimentar la base de conocimientos manualmente o importando archivos TXT, MD, CSV y JSON de hasta 1.5 MB.
- Consultar las solicitudes enviadas mediante los formularios.
- Cerrar la sesión desde el menú lateral.

Los cambios realizados desde el panel se reflejan en el contenido público. El CMS controla contenido y orden de bloques; el sistema visual, calendarios y funcionalidades de la aplicación se mantienen protegidos en el código para evitar que se rompan por accidente.

### Seguridad del panel

- En producción no existe una contraseña predeterminada.
- La sesión se guarda en una cookie `httpOnly`, por lo que JavaScript del navegador no puede leerla.
- Las operaciones administrativas se ejecutan en el servidor.
- Cambia `ADMIN_PASSWORD` y `ADMIN_SESSION_SECRET` si sospechas que fueron expuestos.
- No publiques `.env.local` ni la llave `SUPABASE_SERVICE_ROLE_KEY`.

## ¿Por qué usamos Supabase?

Next.js y Vercel sirven muy bien el sitio, pero el sistema de archivos de un despliegue no es una base de datos persistente. Supabase proporciona un lugar permanente y centralizado para guardar:

- `site_content`: los textos editados desde el panel.
- `leads`: nombre, contacto, servicio solicitado, mensaje, origen, estado y fecha de cada prospecto.
- `cms-assets`: imágenes de bloques y portadas del Blog en Supabase Storage.

Esto permite que los cambios, artículos, conocimiento del asistente y formularios sobrevivan a nuevos despliegues, funcionen desde varias instancias del sitio y estén disponibles para el administrador en cualquier dispositivo.

La integración es exclusivamente del lado del servidor. La llave con privilegios elevados nunca se envía al navegador. Las tablas tienen Row Level Security activado y no incluyen políticas públicas; únicamente las rutas seguras del sitio pueden leer o escribir con la `SUPABASE_SERVICE_ROLE_KEY`.

En desarrollo, el proyecto puede funcionar sin Supabase y guardar datos en archivos JSON locales. Ese modo sirve para pruebas, pero no debe utilizarse en producción porque los datos podrían perderse durante un despliegue.

## Configurar Supabase para producción

1. Crea un proyecto en Supabase.
2. Abre **SQL Editor**, crea una consulta y ejecuta completo `supabase/migrations/001_jr_consulting_cms.sql`. Si ya habías ejecutado una versión anterior, vuelve a ejecutar el archivo completo: es idempotente y añadirá el bucket `cms-assets`.
3. En **Project Settings → API**, copia la URL del proyecto y la llave `service_role`.
4. Configura en Vercel:
   - `NEXT_PUBLIC_SITE_URL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY` (la llave creada para el asistente; también debe agregarse manualmente en Vercel, porque `.env.local` no se despliega)
5. No uses el prefijo `NEXT_PUBLIC_` para la service role.
6. Haz un nuevo despliegue y entra a `/admin`.

Para comprobar la instalación:

1. Envía una cotización desde el sitio público.
2. Confirma en Supabase que apareció una fila en `leads`.
3. Entra a `/admin` y verifica que el prospecto sea visible.
4. Edita un texto, guárdalo y recarga la página pública correspondiente.
5. Desde Blog, sube una imagen de prueba y confirma que aparece dentro de **Storage → cms-assets**.

Si el sitio puede mostrarse pero no guarda cambios o formularios, revisa primero que las dos variables de Supabase existan en el entorno correcto de Vercel y que hayas hecho un nuevo despliegue después de configurarlas.

## Asistente virtual con OpenAI

El widget flotante está presente en todas las páginas públicas. Su API se ejecuta exclusivamente en el servidor y utiliza `OPENAI_API_KEY`; la llave nunca llega al navegador.

La llave local ya está en `.env.local`. Para que funcione después de publicar en Vercel, agrega ahí la misma variable de entorno mediante el panel de Variables de entorno y vuelve a desplegar. No subas `.env.local` a Git ni la copies en una variable con prefijo `NEXT_PUBLIC_`.

Desde `/admin`, abre **Base de conocimientos** para incorporar respuestas verificadas, servicios, procesos, horarios y criterios comerciales. El agente está instruido para no inventar precios, coberturas o certificaciones y para dirigir a la agenda, formulario o WhatsApp cuando una persona necesita atención.

Las agendas de soluciones tecnológicas, necesidades del negocio, J R Aprende y RAMX están integradas directamente con el botón oficial de Google Calendar y una apertura directa como respaldo.

## Scripts

```bash
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
```

## Identidad

Los logos entregados están en `public/brand`. La navegación usa una versión code-native del monograma para conservar nitidez a cualquier escala. Se puede sustituir desde `components/Logo.tsx` sin tocar el resto del sitio.

## Estrategia

La auditoría de posicionamiento, estructura, textos, SEO y llamadas a la acción está en `docs/estrategia-contenido.md`.

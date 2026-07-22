<<<<<<< HEAD
# website
J R  Consulting Website
=======
# J R Consulting — sitio corporativo

Sitio profesional, responsive y optimizado para SEO construido con Next.js 16. Incluye J R Consulting, Websites, J R Aprende, J R Research, RAMX, Seguros y la presentación de J R OS como próximo lanzamiento.

## Incluye

- Rutas comerciales con metadata, canonical, sitemap, robots y datos estructurados.
- Mockup de website con pestañas funcionales.
- Carruseles accesibles para servicios y rutas de aprendizaje.
- Dos agendas de Google Calendar: soluciones tecnológicas y necesidades del negocio.
- Formularios de cotización con respaldo por WhatsApp.
- Panel `/admin` para editar los textos principales y revisar prospectos.
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

- Editar títulos, descripciones y llamadas a la acción de las páginas principales.
- Ver una vista previa del contenido antes de guardarlo.
- Consultar las solicitudes enviadas mediante los formularios.
- Cerrar la sesión desde el menú lateral.

Los cambios realizados desde el panel se reflejan en el sitio público. El panel actual es un CMS sencillo para textos y prospectos; no modifica componentes, estilos, agendas ni archivos del código.

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

Esto permite que los cambios y formularios sobrevivan a nuevos despliegues, funcionen desde varias instancias del sitio y estén disponibles para el administrador en cualquier dispositivo. También deja una base preparada para ampliar después el CRM, el chatbot y la gestión de prospectos.

La integración es exclusivamente del lado del servidor. La llave con privilegios elevados nunca se envía al navegador. Las tablas tienen Row Level Security activado y no incluyen políticas públicas; únicamente las rutas seguras del sitio pueden leer o escribir con la `SUPABASE_SERVICE_ROLE_KEY`.

En desarrollo, el proyecto puede funcionar sin Supabase y guardar datos en archivos JSON locales. Ese modo sirve para pruebas, pero no debe utilizarse en producción porque los datos podrían perderse durante un despliegue.

## Configurar Supabase para producción

1. Crea un proyecto en Supabase.
2. Abre **SQL Editor**, crea una consulta y ejecuta completo `supabase/migrations/001_jr_consulting_cms.sql`.
3. En **Project Settings → API**, copia la URL del proyecto y la llave `service_role`.
4. Configura en Vercel:
   - `NEXT_PUBLIC_SITE_URL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. No uses el prefijo `NEXT_PUBLIC_` para la service role.
6. Haz un nuevo despliegue y entra a `/admin`.

Para comprobar la instalación:

1. Envía una cotización desde el sitio público.
2. Confirma en Supabase que apareció una fila en `leads`.
3. Entra a `/admin` y verifica que el prospecto sea visible.
4. Edita un texto, guárdalo y recarga la página pública correspondiente.

Si el sitio puede mostrarse pero no guarda cambios o formularios, revisa primero que las dos variables de Supabase existan en el entorno correcto de Vercel y que hayas hecho un nuevo despliegue después de configurarlas.

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
>>>>>>> 8adb881 (feat: launch J R Consulting website)

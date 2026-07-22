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

## Configuración de producción

1. Crea un proyecto de Supabase.
2. Ejecuta `supabase/migrations/001_jr_consulting_cms.sql` en SQL Editor.
3. Configura en Vercel:
   - `NEXT_PUBLIC_SITE_URL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. No uses el prefijo `NEXT_PUBLIC_` para la service role.
5. Despliega y entra a `/admin`.

La URL de agenda RAMX no fue incluida en el material recibido. Cuando exista, agrégala como `NEXT_PUBLIC_RAMX_APPOINTMENT_URL`; mientras tanto el sitio usa WhatsApp.

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

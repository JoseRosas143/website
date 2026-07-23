-- CMS mínimo y captación de solicitudes para J R Consulting.
-- Ejecutar en Supabase SQL Editor. Las operaciones públicas se realizan
-- únicamente desde rutas de servidor con SUPABASE_SERVICE_ROLE_KEY.

create table if not exists public.site_content (
  key text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  service text not null,
  message text not null,
  source text not null default 'website',
  status text not null default 'nuevo' check (status in ('nuevo', 'en_revision', 'contactado', 'cerrado')),
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

alter table public.site_content enable row level security;
alter table public.leads enable row level security;

-- No se crean políticas públicas. La service role del servidor omite RLS.
-- Nunca expongas SUPABASE_SERVICE_ROLE_KEY con prefijo NEXT_PUBLIC_.

insert into public.site_content (key, content)
values ('global', '{}'::jsonb)
on conflict (key) do nothing;

-- Recursos visuales cargados desde el panel. Las escrituras pasan
-- exclusivamente por la ruta autenticada del servidor.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-assets',
  'cms-assets',
  true,
  4194304,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

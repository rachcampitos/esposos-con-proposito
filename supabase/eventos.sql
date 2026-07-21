-- Banco de fotos/videos por evento (retiros, etc.)
-- Correr una sola vez en el SQL Editor de Supabase.

create extension if not exists pgcrypto;

create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  fecha date,
  descripcion text,
  portada_path text,
  estado text not null default 'borrador' check (estado in ('borrador', 'publicado')),
  creado_en timestamptz not null default now()
);

create table if not exists medios (
  id uuid primary key default gen_random_uuid(),
  evento_id uuid not null references eventos(id) on delete cascade,
  tipo text not null check (tipo in ('foto', 'video')),
  storage_path text not null,
  orden integer not null default 0,
  creado_en timestamptz not null default now(),
  unique (evento_id, storage_path)
);

create index if not exists medios_evento_id_orden_idx on medios (evento_id, orden);

alter table eventos enable row level security;
alter table medios enable row level security;

-- Solo eventos publicados (y sus medios) son visibles para la app.
-- Las escrituras las hace el script de carga con la service role key,
-- que no pasa por RLS.
drop policy if exists "eventos publicados son visibles" on eventos;
create policy "eventos publicados son visibles"
  on eventos for select
  using (estado = 'publicado');

drop policy if exists "medios de eventos publicados son visibles" on medios;
create policy "medios de eventos publicados son visibles"
  on medios for select
  using (
    exists (
      select 1 from eventos
      where eventos.id = medios.evento_id
      and eventos.estado = 'publicado'
    )
  );

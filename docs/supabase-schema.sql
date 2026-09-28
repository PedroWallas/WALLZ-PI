-- WALLZ — schema inicial do Supabase
-- Copiar e executar no SQL Editor do Supabase.
-- Não inclui RLS/policies de escrita: CRUD e autenticação ainda não foram implementados.

create extension if not exists "pgcrypto";

create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  price_cents integer not null,
  collection_id uuid references collections (id),
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists product_sizes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  size text not null,
  stock_quantity integer not null default 0,
  created_at timestamptz not null default now(),
  unique (product_id, size)
);

-- Bucket de Storage para imagens de produto (upload fica para uma etapa futura).
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

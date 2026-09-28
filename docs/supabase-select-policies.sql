-- WALLZ — policies de leitura pública (SELECT) para o catálogo
-- Habilita apenas leitura para o role anon. Não mexe em INSERT/UPDATE/DELETE
-- nem em dados existentes.

create policy "public read collections"
  on collections
  for select
  to anon
  using (true);

create policy "public read products"
  on products
  for select
  to anon
  using (true);

create policy "public read product_sizes"
  on product_sizes
  for select
  to anon
  using (true);

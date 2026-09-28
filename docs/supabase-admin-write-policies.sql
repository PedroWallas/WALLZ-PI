-- WALLZ — policies de escrita para o Admin (ainda sem autenticação real)
-- Necessárias para o Admin criar/editar produtos, atualizar estoque por tamanho
-- e fazer upload de imagem para o bucket "product-images".
--
-- Como o Admin ainda não tem login, essas policies liberam escrita para o role
-- anon (o mesmo usado pelo frontend hoje). Isso é intencionalmente temporário:
-- quando a autenticação do Admin existir, essas policies devem ser substituídas
-- por regras que checam o usuário autenticado, e não mais abertas para "anon".

create policy "admin insert products"
  on products
  for insert
  to anon
  with check (true);

create policy "admin update products"
  on products
  for update
  to anon
  using (true)
  with check (true);

create policy "admin insert product_sizes"
  on product_sizes
  for insert
  to anon
  with check (true);

create policy "admin update product_sizes"
  on product_sizes
  for update
  to anon
  using (true)
  with check (true);

create policy "admin upload product images"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'product-images');

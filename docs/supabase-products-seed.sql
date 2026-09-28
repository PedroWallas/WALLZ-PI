-- WALLZ — carga inicial dos 23 produtos existentes em src/data/products.js
-- Idempotente: usa ON CONFLICT DO NOTHING, não sobrescreve nem duplica registros existentes.
-- image_url fica NULL (upload de imagens é uma etapa futura); stock_quantity fica 0 (sem dado real de estoque na origem).

insert into collections (name, slug)
values ('Bootlegs', 'bootlegs')
on conflict (slug) do nothing;

with product_seed (slug, title) as (
  values
    ('all-eyes-on-me', 'Camiseta Oversized All Eyes On Me'),
    ('asap-iii-bootleg', 'Camiseta Oversized Asap Iii Bootleg'),
    ('pele-the-king-bootleg', 'Camiseta Oversized Pele The King Bootleg'),
    ('young-thug-ii-bootleg', 'Camiseta Oversized Young Thug Ii Bootleg'),
    ('cardi-b-bootleg', 'Camiseta Oversized Cardi B Bootleg'),
    ('tory-lanez-bootleg', 'Camiseta Oversized Tory Lanez Bootleg'),
    ('aaliyah-bootleg', 'Camiseta Oversized Aaliyah Bootleg'),
    ('kendrick-lamar-bootleg', 'Camiseta Oversized Kendrick Lamar Bootleg'),
    ('bad-bunny-bootleg', 'Camiseta Oversized Bad Bunny Bootleg'),
    ('young-dolph-bootleg', 'Camiseta Oversized Young Dolph Bootleg'),
    ('lil-pump-bootleg', 'Camiseta Oversized Lil Pump Bootleg'),
    ('godfather-corleone-bootleg', 'Camiseta Oversized Godfather Corleone Bootleg'),
    ('bob-marley-bootleg', 'Camiseta Oversized Bob Marley Bootleg'),
    ('notorious-big-ii-bootleg', 'Camiseta Oversized Notorious Big Ii Bootleg'),
    ('paul-walker-ii-bootleg', 'Camiseta Oversized Paul Walker Ii Bootleg'),
    ('travis-scott-la-flame', 'Camiseta Oversized Travis Scott La Flame'),
    ('alicia-keys', 'Camiseta Oversized Alicia Keys'),
    ('travis-scott-ii-bootleg', 'Camiseta Oversized Travis Scott Ii Bootleg'),
    ('snoop-dogg-doggystyle-bootleg', 'Camiseta Oversized Snoop Dogg Doggystyle Bootleg'),
    ('notorious-pop-kelloggs-bootleg', 'Camiseta Oversized Notorious Pop Kelloggs Bootleg'),
    ('lil-wayne-bootleg', 'Camiseta Oversized Lil Wayne Bootleg'),
    ('billie-eilish-bootleg', 'Camiseta Oversized Billie Eilish Bootleg'),
    ('super-oversized-asap-iv-bootleg', 'Camiseta Super Oversized Asap Iv Bootleg')
)
insert into products (slug, title, description, price_cents, collection_id, image_url)
select
  ps.slug,
  ps.title,
  'Camiseta oversized WALLZ, confeccionada em algodão fio 30.1 penteado, com gola ribana e reforço ombro a ombro. Modelagem ampla e despojada, pensada para quem busca conforto sem abrir mão de atitude.',
  12990,
  c.id,
  null
from product_seed ps
join collections c on c.slug = 'bootlegs'
on conflict (slug) do nothing;

insert into product_sizes (product_id, size, stock_quantity)
select p.id, s.size, 0
from products p
cross join (values ('P'), ('M'), ('G'), ('GG'), ('XG')) as s(size)
where p.slug in (
  'all-eyes-on-me', 'asap-iii-bootleg', 'pele-the-king-bootleg', 'young-thug-ii-bootleg',
  'cardi-b-bootleg', 'tory-lanez-bootleg', 'aaliyah-bootleg', 'kendrick-lamar-bootleg',
  'bad-bunny-bootleg', 'young-dolph-bootleg', 'lil-pump-bootleg', 'godfather-corleone-bootleg',
  'bob-marley-bootleg', 'notorious-big-ii-bootleg', 'paul-walker-ii-bootleg', 'travis-scott-la-flame',
  'alicia-keys', 'travis-scott-ii-bootleg', 'snoop-dogg-doggystyle-bootleg', 'notorious-pop-kelloggs-bootleg',
  'lil-wayne-bootleg', 'billie-eilish-bootleg', 'super-oversized-asap-iv-bootleg'
)
on conflict (product_id, size) do nothing;

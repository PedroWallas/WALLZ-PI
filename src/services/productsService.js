import { supabase } from '../lib/supabase.js'

export function formatCentsToBRL(cents) {
  const formatted = (cents / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `R$ ${formatted}`
}

function toProduct(row) {
  const sizes = row.product_sizes ?? []

  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    price: formatCentsToBRL(row.price_cents),
    installment: `3x de ${formatCentsToBRL(Math.round(row.price_cents / 3))} sem juros`,
    collection: row.collection?.name ?? null,
    image: row.image_url,
    sizes: sizes.map((s) => s.size),
    sizesStock: sizes.map((s) => ({ size: s.size, stock_quantity: s.stock_quantity })),
  }
}

const PRODUCT_COLUMNS = `
  slug,
  title,
  description,
  price_cents,
  image_url,
  created_at,
  collection:collections ( name ),
  product_sizes ( size, stock_quantity )
`

export async function getActiveProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_COLUMNS)
    .eq('active', true)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(`Falha ao buscar produtos no Supabase: ${error.message}`)
  }

  return data.map(toProduct)
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_COLUMNS)
    .eq('active', true)
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    throw new Error(`Falha ao buscar produto no Supabase: ${error.message}`)
  }

  return data ? toProduct(data) : null
}

const ADMIN_PRODUCT_COLUMNS = `
  id,
  slug,
  title,
  description,
  price_cents,
  image_url,
  active,
  collection_id,
  collection:collections ( id, name ),
  product_sizes ( id, size, stock_quantity )
`

export async function getAdminProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(ADMIN_PRODUCT_COLUMNS)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(`Falha ao buscar produtos no Supabase: ${error.message}`)
  }

  return data
}

export async function getCollections() {
  const { data, error } = await supabase.from('collections').select('id, name').order('name')

  if (error) {
    throw new Error(`Falha ao buscar coleções no Supabase: ${error.message}`)
  }

  return data
}

export async function uploadProductImage(file, slug) {
  const extension = file.name.split('.').pop()
  const path = `${slug}-${Date.now()}.${extension}`

  const { error } = await supabase.storage.from('product-images').upload(path, file)
  if (error) {
    throw new Error(`Falha ao enviar imagem: ${error.message}`)
  }

  const { data } = supabase.storage.from('product-images').getPublicUrl(path)
  return data.publicUrl
}

export async function saveProduct({ id, slug, title, description, priceCents, collectionId, active, imageUrl, sizes }) {
  const productRow = {
    slug,
    title,
    description,
    price_cents: priceCents,
    collection_id: collectionId,
    active,
    image_url: imageUrl,
  }

  let productId = id

  if (id) {
    const { error } = await supabase.from('products').update(productRow).eq('id', id)
    if (error) throw new Error(`Falha ao atualizar produto: ${error.message}`)
  } else {
    const { data, error } = await supabase.from('products').insert(productRow).select('id').single()
    if (error) throw new Error(`Falha ao criar produto: ${error.message}`)
    productId = data.id
  }

  const sizeRows = sizes.map(({ size, stock_quantity }) => ({
    product_id: productId,
    size,
    stock_quantity,
  }))

  const { error: sizesError } = await supabase
    .from('product_sizes')
    .upsert(sizeRows, { onConflict: 'product_id,size' })

  if (sizesError) {
    throw new Error(`Falha ao salvar estoque: ${sizesError.message}`)
  }

  return productId
}

import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getAdminProducts,
  getCollections,
  saveProduct,
  uploadProductImage,
  formatCentsToBRL,
} from '../services/productsService.js'

const SIZES = ['P', 'M', 'G', 'GG', 'XG']

function emptyForm() {
  return {
    title: '',
    slug: '',
    description: '',
    price: '',
    collectionId: '',
    active: true,
    imageFile: null,
    imageUrl: null,
    sizes: { P: 0, M: 0, G: 0, GG: 0, XG: 0 },
  }
}

function Admin() {
  const [products, setProducts] = useState([])
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const [productsData, collectionsData] = await Promise.all([getAdminProducts(), getCollections()])
      setProducts(productsData)
      setCollections(collectionsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const imagePreview = useMemo(
    () => (form.imageFile ? URL.createObjectURL(form.imageFile) : form.imageUrl),
    [form.imageFile, form.imageUrl]
  )

  function openCreateForm() {
    setEditingId(null)
    setForm(emptyForm())
    setSaveError(null)
    setFormOpen(true)
  }

  function openEditForm(product) {
    setEditingId(product.id)
    setForm({
      title: product.title,
      slug: product.slug,
      description: product.description ?? '',
      price: (product.price_cents / 100).toFixed(2),
      collectionId: product.collection_id ?? '',
      active: product.active,
      imageFile: null,
      imageUrl: product.image_url,
      sizes: SIZES.reduce((acc, size) => {
        const row = (product.product_sizes ?? []).find((s) => s.size === size)
        acc[size] = row ? row.stock_quantity : 0
        return acc
      }, {}),
    })
    setSaveError(null)
    setFormOpen(true)
  }

  async function handleSave() {
    setSaving(true)
    setSaveError(null)
    try {
      let imageUrl = form.imageUrl
      if (form.imageFile) {
        imageUrl = await uploadProductImage(form.imageFile, form.slug.trim())
      }

      await saveProduct({
        id: editingId,
        slug: form.slug.trim(),
        title: form.title.trim(),
        description: form.description.trim() || null,
        priceCents: Math.round(Number(form.price) * 100),
        collectionId: form.collectionId || null,
        active: form.active,
        imageUrl,
        sizes: SIZES.map((size) => ({ size, stock_quantity: Number(form.sizes[size]) || 0 })),
      })

      setFormOpen(false)
      await loadData()
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="wz-admin">
      <header className="wz-admin-topbar">
        <Link to="/" className="wz-logo">WALLZ</Link>
        <span className="wz-admin-topbar-label">Painel Administrativo</span>
      </header>

      <main className="container wz-admin-main">
        <div className="wz-admin-header-row">
          <h1 className="wz-admin-title">Produtos</h1>
          <button type="button" className="wz-add-to-cart-btn wz-admin-add-btn" onClick={openCreateForm}>
            <i className="fa-solid fa-plus me-2"></i>
            Adicionar produto
          </button>
        </div>

        {formOpen && (
          <div className="wz-admin-form-panel">
            <h2 className="wz-admin-subtitle" style={{ marginTop: 0 }}>
              {editingId ? 'Editar produto' : 'Novo produto'}
            </h2>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Título</label>
                <input
                  className="form-control"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Slug</label>
                <input
                  className="form-control"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Descrição</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-control"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Coleção</label>
                <select
                  className="form-select"
                  value={form.collectionId}
                  onChange={(e) => setForm((f) => ({ ...f, collectionId: e.target.value }))}
                >
                  <option value="">Selecione...</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 d-flex align-items-end">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="admin-active"
                    checked={form.active}
                    onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                  />
                  <label className="form-check-label" htmlFor="admin-active">Produto ativo</label>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => setForm((f) => ({ ...f, imageFile: e.target.files?.[0] ?? null }))}
                />
              </div>
              <div className="col-md-6 d-flex align-items-end">
                {imagePreview && (
                  <img src={imagePreview} alt="Pré-visualização" className="wz-admin-image-preview" />
                )}
              </div>

              <div className="col-12">
                <label className="form-label">Estoque por tamanho</label>
                <div className="row g-2">
                  {SIZES.map((size) => (
                    <div className="col-auto" key={size}>
                      <label className="form-label">{size}</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        style={{ width: 80 }}
                        value={form.sizes[size]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, sizes: { ...f.sizes, [size]: e.target.value } }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {saveError && <p className="text-danger mt-3 mb-0">{saveError}</p>}

            <div className="wz-admin-form-actions">
              <button
                type="button"
                className="wz-add-to-cart-btn wz-admin-add-btn"
                onClick={handleSave}
                disabled={saving || !form.title.trim() || !form.slug.trim() || !form.price}
              >
                {saving ? 'Salvando...' : 'Salvar produto'}
              </button>
              <button
                type="button"
                className="wz-admin-icon-btn"
                style={{ width: 'auto', padding: '0 16px' }}
                onClick={() => setFormOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {loading && <p className="wz-admin-placeholder">Carregando produtos...</p>}
        {error && <p className="wz-admin-placeholder">Não foi possível carregar os produtos.</p>}

        {!loading && !error && (
          <div className="table-responsive wz-admin-table-wrap">
            <table className="table wz-admin-table align-middle">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Coleção</th>
                  <th>Preço</th>
                  <th>Status</th>
                  <th>Estoque</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const totalStock = (product.product_sizes ?? []).reduce(
                    (sum, s) => sum + s.stock_quantity,
                    0
                  )

                  return (
                    <tr key={product.id}>
                      <td className="wz-admin-product-cell">
                        <img src={product.image_url ?? ''} alt={product.title} className="wz-admin-thumb" />
                        <span>{product.title}</span>
                      </td>
                      <td>{product.collection?.name ?? '—'}</td>
                      <td>{formatCentsToBRL(product.price_cents)}</td>
                      <td>
                        <span className={`wz-admin-badge ${product.active ? '' : 'wz-admin-badge-inactive'}`}>
                          {product.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>{totalStock}</td>
                      <td className="wz-admin-actions">
                        <button
                          type="button"
                          className="wz-admin-icon-btn"
                          aria-label="Editar produto"
                          onClick={() => openEditForm(product)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button type="button" className="wz-admin-icon-btn wz-admin-icon-btn-danger" aria-label="Excluir produto">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="wz-admin-subtitle">Pedidos</h2>
        <p className="wz-admin-placeholder">
          Listagem de pedidos entra quando o backend (Supabase) estiver conectado.
        </p>
      </main>
    </div>
  )
}

export default Admin

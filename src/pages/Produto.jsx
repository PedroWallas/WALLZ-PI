import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug } from '../services/productsService.js'
import { useCart } from '../context/CartContext.jsx'

function Produto() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setSelectedSize(null)
    setQuantity(1)

    getProductBySlug(slug)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="container wz-section text-center">
        <p>Carregando produto...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container wz-section text-center">
        <p>Não foi possível carregar o produto.</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container wz-section text-center">
        <p>Produto não encontrado.</p>
        <Link to="/produtos" className="wz-nav-link">Voltar para produtos</Link>
      </div>
    )
  }

  const selectedSizeStock = product.sizesStock?.find((s) => s.size === selectedSize)?.stock_quantity ?? 0

  function handleAddToCart() {
    addItem({
      slug: product.slug,
      title: product.title,
      image: product.image,
      price: product.price,
      size: selectedSize,
      quantity,
      stock: selectedSizeStock,
    })
    setQuantity(1)
  }

  return (
    <div className="container wz-section">
      <div className="row">
        <div className="col-lg-6">
          <div className="wz-product-image-wrap wz-pdp-image">
            <img src={product.image} alt={product.title} className="wz-product-img" />
          </div>
        </div>

        <div className="col-lg-6 wz-pdp-info">
          <h1 className="wz-pdp-title">{product.title}</h1>
          {product.collection && <p className="wz-pdp-collection">Coleção: {product.collection}</p>}

          <div className="wz-product-price-row wz-pdp-price-row">
            <span className="wz-pdp-price">{product.price}</span>
          </div>
          {product.installment && <div className="wz-product-installment">{product.installment}</div>}

          {product.description && <p className="wz-pdp-description">{product.description}</p>}

          <p className="wz-pdp-label">Selecione uma Cor</p>
          <div className="wz-color-swatch" aria-label="Preto"></div>

          {product.sizesStock?.length > 0 && (
            <>
              <p className="wz-pdp-label">Selecione um Tamanho</p>
              <div className="wz-size-options">
                {product.sizesStock.map(({ size, stock_quantity }) => (
                  <button
                    key={size}
                    type="button"
                    className={`wz-size-option ${selectedSize === size ? 'wz-size-option-selected' : ''}`}
                    onClick={() => {
                      setSelectedSize(size)
                      setQuantity(1)
                    }}
                    disabled={stock_quantity <= 0}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="wz-pdp-actions">
            <div className="wz-qty-control">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade">-</button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => (selectedSize ? Math.min(q + 1, selectedSizeStock) : q + 1))}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>

            <button type="button" className="wz-add-to-cart-btn" disabled={!selectedSize} onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Produto

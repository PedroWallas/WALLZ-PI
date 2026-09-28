import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function parsePrice(price) {
  return Number(price.replace('R$', '').trim().replace('.', '').replace(',', '.'))
}

function formatPrice(value) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

const STEPS = [
  { label: 'Carrinho', active: true },
  { label: 'Entrega', active: false },
  { label: 'Pagamento', active: false },
]

function Carrinho() {
  const { items, increment, decrement, removeItem } = useCart()

  const total = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)

  return (
    <div className="container wz-section">
      <ul className="wz-cart-steps">
        {STEPS.map((step, i) => (
          <li key={step.label} className={`wz-cart-step ${step.active ? 'wz-cart-step-active' : ''}`}>
            <span className="wz-cart-step-number">{i + 1}</span>
            {step.label}
          </li>
        ))}
      </ul>

      {items.length === 0 ? (
        <div className="wz-cart-empty">
          <i className="fa-solid fa-cart-shopping"></i>
          <p className="wz-cart-empty-title">Seu carrinho está vazio.</p>
          <p className="wz-cart-empty-text">Entre na galeria de produtos e conheça as melhores ofertas.</p>
          <Link to="/produtos" className="wz-cart-empty-btn">Ver produtos</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {items.map((item) => {
              const subtotal = parsePrice(item.price) * item.quantity

              return (
                <div className="wz-cart-item" key={`${item.slug}-${item.size}`}>
                  <div className="wz-product-image-wrap wz-cart-item-image">
                    <img src={item.image} alt={item.title} className="wz-product-img" />
                  </div>

                  <div className="wz-cart-item-info">
                    <p className="wz-cart-item-title">{item.title}</p>
                    <p className="wz-cart-item-size">Tamanho: {item.size}</p>
                    <p className="wz-cart-item-price">{item.price}</p>
                  </div>

                  <div className="wz-qty-control wz-cart-item-qty">
                    <button
                      type="button"
                      onClick={() => decrement(item.slug, item.size)}
                      aria-label="Diminuir quantidade"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increment(item.slug, item.size)}
                      aria-label="Aumentar quantidade"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <div className="wz-cart-item-subtotal">{formatPrice(subtotal)}</div>

                  <button
                    type="button"
                    className="wz-cart-remove"
                    onClick={() => removeItem(item.slug, item.size)}
                    aria-label="Remover produto"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              )
            })}
          </div>

          <div className="col-lg-4">
            <div className="wz-cart-summary">
              <div className="wz-cart-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="wz-cart-summary-row wz-cart-summary-total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button type="button" className="wz-add-to-cart-btn wz-cart-checkout-btn">
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carrinho

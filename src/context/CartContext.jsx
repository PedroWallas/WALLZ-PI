import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'wallz-cart'

const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function sameItem(item, slug, size) {
  return item.slug === slug && item.size === size
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // localStorage indisponível — carrinho segue funcionando só nesta sessão.
    }
  }, [items])

  function addItem({ slug, title, image, price, size, quantity, stock }) {
    setItems((current) => {
      const existing = current.find((item) => sameItem(item, slug, size))
      if (existing) {
        return current.map((item) =>
          sameItem(item, slug, size)
            ? { ...item, quantity: Math.min(item.quantity + quantity, stock), stock }
            : item
        )
      }
      return [...current, { slug, title, image, price, size, quantity: Math.min(quantity, stock), stock }]
    })
  }

  function increment(slug, size) {
    setItems((current) =>
      current.map((item) =>
        sameItem(item, slug, size) ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } : item
      )
    )
  }

  function decrement(slug, size) {
    setItems((current) =>
      current.map((item) =>
        sameItem(item, slug, size) ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    )
  }

  function removeItem(slug, size) {
    setItems((current) => current.filter((item) => !sameItem(item, slug, size)))
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, increment, decrement, removeItem, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }
  return context
}

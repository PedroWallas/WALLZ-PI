import { useEffect, useState } from 'react'
import BenefitsBar from '../components/BenefitsBar.jsx'
import ProductCarousel from '../components/ProductCarousel.jsx'
import { getActiveProducts } from '../services/productsService.js'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getActiveProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const exclusiveProducts = products.slice(0, 8)
  const featuredProducts = products.slice(8, 18)

  return (
    <>
      <BenefitsBar />

      {loading && <p className="text-center py-5">Carregando produtos...</p>}
      {error && <p className="text-center py-5">Não foi possível carregar os produtos.</p>}

      {!loading && !error && (
        <>
          <div className="container wz-section">
            <h2 className="wz-section-title">Produtos Exclusivos</h2>
            <ProductCarousel products={exclusiveProducts} />
          </div>

          <div className="container wz-section">
            <h2 className="wz-section-title">Produtos em Destaque</h2>
            <ProductCarousel products={featuredProducts} />
          </div>
        </>
      )}
    </>
  )
}

export default Home

import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { getActiveProducts } from '../services/productsService.js'

const PAGE_SIZE = 8

function Catalogo() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getActiveProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(products.length / PAGE_SIZE)
  const pageProducts = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="container wz-section">
      <h1 className="wz-section-title">Produtos</h1>

      {loading && <p className="text-center py-5">Carregando produtos...</p>}
      {error && <p className="text-center py-5">Não foi possível carregar os produtos.</p>}

      {!loading && !error && (
        <>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
            {pageProducts.map((product) => (
              <div className="col" key={product.slug}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <ul className="wz-pagination">
            {page > 1 && (
              <li>
                <button type="button" className="wz-page-link wz-page-nav" onClick={() => setPage(page - 1)} aria-label="Página anterior">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
              </li>
            )}
            <li>
              <span className="wz-page-link wz-page-text">{page} de {totalPages}</span>
            </li>
            {page < totalPages && (
              <li>
                <button type="button" className="wz-page-link wz-page-nav" onClick={() => setPage(page + 1)} aria-label="Próxima página">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  )
}

export default Catalogo

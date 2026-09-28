import { Link } from 'react-router-dom'

function ProductCard({ image, title, price, installment, slug }) {
  return (
    <div className="wz-product-card">
      <Link to={`/produtos/${slug}`} className="wz-product-image-wrap">
        <img src={image} alt={title} className="wz-product-img" />
      </Link>
      <div className="wz-product-info">
        <Link to={`/produtos/${slug}`} className="wz-product-title">
          {title}
        </Link>
        <div className="wz-product-price-row">
          <span className="wz-product-price">{price}</span>
        </div>
        {installment && <div className="wz-product-installment">{installment}</div>}
      </div>
    </div>
  )
}

export default ProductCard

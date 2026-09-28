import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import ProductCard from './ProductCard.jsx'

function ProductCarousel({ products }) {
  return (
    <div className="wz-product-carousel">
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.wz-carousel-prev',
          nextEl: '.wz-carousel-next',
          disabledClass: 'wz-carousel-nav-disabled',
        }}
        slidesPerView={1.3}
        spaceBetween={16}
        breakpoints={{
          576: { slidesPerView: 2.2, spaceBetween: 20 },
          768: { slidesPerView: 2.6, spaceBetween: 20 },
          992: { slidesPerView: 3.2, spaceBetween: 25 },
          1200: { slidesPerView: 4, spaceBetween: 25 },
          1400: { slidesPerView: 4.5, spaceBetween: 25 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.slug}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button type="button" className="wz-carousel-nav wz-carousel-prev" aria-label="Produtos anteriores">
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button type="button" className="wz-carousel-nav wz-carousel-next" aria-label="Próximos produtos">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  )
}

export default ProductCarousel

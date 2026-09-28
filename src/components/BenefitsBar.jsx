import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const BENEFITS = [
  { icon: 'fa-credit-card', title: 'Parcelamento', text: 'Em até 3x sem juros' },
  { icon: 'fa-arrows-rotate', title: 'Troca Grátis', text: 'Para a primeira compra' },
  { icon: 'fa-shield-halved', title: 'Garantia', text: '30 dias de garantia' },
]

function BenefitsBar() {
  return (
    <section className="wz-benefits">
      <div className="container">
        <Swiper
          className="wz-benefits-swiper"
          slidesPerView={1.15}
          spaceBetween={16}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {BENEFITS.map((benefit) => (
            <SwiperSlide key={benefit.title}>
              <div className="wz-benefit-item">
                <div className="wz-benefit-icon">
                  <i className={`fa-solid ${benefit.icon}`}></i>
                </div>
                <div>
                  <p className="wz-benefit-title">{benefit.title}</p>
                  <p className="wz-benefit-text">{benefit.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default BenefitsBar

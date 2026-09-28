function Footer() {
  return (
    <footer className="wz-footer">
      <div className="container pt-3">
        <div className="row mt-4">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <span className="wz-logo wz-footer-logo">WALLZ</span>
            <p className="wz-footer-text mt-2">
              A WALLZ é uma marca de streetwear com estampas exclusivas e identidade urbana.
              Peças pensadas para quem não segue padrões. WALLZ OR NOTHING.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <p className="wz-footer-title">Nossos Contatos</p>
            <p className="wz-footer-text">
              <i className="fa-solid fa-envelope me-2"></i>
              contato@wallz.com.br
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <p className="wz-footer-title">Siga nas redes sociais</p>
            <p>
              <a href="#" className="wz-social-btn" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="wz-social-btn" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="wz-social-btn" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#" className="wz-social-btn" aria-label="TikTok">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </p>
            <p className="wz-footer-title">Formas de pagamento</p>
            <p className="wz-footer-text">A confirmar</p>
          </div>
        </div>
      </div>

      <div className="text-center wz-footer-legal">
        <a href="#" className="wz-terms-link">Termos de Uso</a>
        <span className="wz-terms-sep">|</span>
        <a href="#" className="wz-terms-link">Política de Privacidade</a>
      </div>

      <div className="text-center wz-footer-bottom">
        <p className="wz-footer-copy">2026 © Todos os direitos reservados - WALLZ</p>
      </div>
    </footer>
  )
}

export default Footer

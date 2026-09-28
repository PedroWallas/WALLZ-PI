import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchForm from './SearchForm.jsx'
import OffcanvasMenu from './OffcanvasMenu.jsx'
import { useCart } from '../context/CartContext.jsx'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <>
      <header className="wz-header">
        <div className="container h-100">
          <div className="row h-100 align-items-center flex-nowrap g-0">
            <div className="col-auto">
              <Link to="/" className="wz-logo">WALLZ</Link>
            </div>

            <div className="col wz-nav-search d-none d-lg-block">
              <SearchForm />
            </div>

            <div className="col-auto ms-auto">
              <div className="wz-nav-actions">
                <Link to="/produtos" className="wz-nav-link d-none d-lg-flex">
                  Produtos
                </Link>

                <div className="wz-dropdown d-none d-lg-block">
                  <button type="button" className="wz-nav-link">
                    Atendimento
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                  <div className="wz-dropdown-menu">
                    <p className="wz-dropdown-title">E-mail</p>
                    <p className="wz-dropdown-text">contato@wallz.com.br</p>
                    <hr className="wz-dropdown-hr" />
                    <p className="wz-dropdown-title">Central de Ajuda</p>
                    <a className="wz-dropdown-text" href="#">
                      Dúvidas Frequentes
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                    <hr className="wz-dropdown-hr" />
                    <p className="wz-dropdown-title">Enviar mensagem</p>
                    <a className="wz-dropdown-text" href="#">
                      Formulário de contato
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>

                <Link to="/login" className="wz-login-link d-none d-lg-flex">
                  <span className="wz-login-icon">
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  </span>
                  Login
                </Link>

                <Link to="/carrinho" className="wz-cart-btn">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <span className="wz-cart-count">{itemCount}</span>
                </Link>

                <button
                  type="button"
                  className="wz-menu-btn d-lg-none"
                  aria-label="Abrir menu"
                  onClick={() => setMenuOpen(true)}
                >
                  <i className="fa-solid fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <OffcanvasMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

export default Header

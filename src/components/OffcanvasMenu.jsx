import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchForm from './SearchForm.jsx'

function OffcanvasMenu({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div
        className={`offcanvas-backdrop fade ${open ? 'show' : ''}`}
        style={{ display: open ? 'block' : 'none' }}
        onClick={onClose}
      />
      <div
        className={`offcanvas offcanvas-end wz-offcanvas ${open ? 'show' : ''}`}
        tabIndex={-1}
        aria-hidden={!open}
      >
        <div className="offcanvas-body wz-offcanvas-body">
          <div className="wz-canvas-top">
            <Link to="/" className="wz-logo" onClick={onClose}>WALLZ</Link>
            <button type="button" className="wz-offcanvas-close" onClick={onClose} aria-label="Fechar menu">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="wz-canvas-search">
            <SearchForm />
          </div>

          <nav className="wz-canvas-links">
            <Link to="/" className="wz-link-mobile" onClick={onClose}>
              Home
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
            <Link to="/produtos" className="wz-link-mobile" onClick={onClose}>
              Produtos
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
            <a href="#" className="wz-link-mobile" onClick={onClose}>
              Central de ajuda
              <i className="fa-solid fa-chevron-right"></i>
            </a>
            <a href="#" className="wz-link-mobile" onClick={onClose}>
              Contato
              <i className="fa-solid fa-chevron-right"></i>
            </a>
            <Link to="/login" className="wz-link-mobile" onClick={onClose}>
              Login
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default OffcanvasMenu

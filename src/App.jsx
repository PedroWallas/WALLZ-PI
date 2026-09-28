import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Catalogo from './pages/Catalogo.jsx'
import Produto from './pages/Produto.jsx'
import Carrinho from './pages/Carrinho.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Catalogo />} />
            <Route path="/produtos/:slug" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Route>
          {/* Login e Admin não usam o chrome da loja (TopBar/Header/Footer) — a
              própria referência mostra o login como página cheia sem header/footer,
              e um admin é uma ferramenta interna, não uma página da vitrine. */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App

import { Outlet } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function Layout() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="wz-main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout

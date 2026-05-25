import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { AddressProvider } from './context/AddressContext'
import { OrderProvider } from './context/OrderContext'
import { PageProvider, usePage } from './context/PageContext'
import { Toast } from './components/Toast'
import { RequireAuth } from './components/RequireAuth'
import { AppShell, TabLayout, PageShell } from './components/PhoneLayout'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { ProductDetail } from './pages/ProductDetail'
import { Login } from './pages/Login'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { Profile } from './pages/Profile'
import { Orders } from './pages/Orders'
import { Addresses } from './pages/Addresses'

function Protected({ children }: { children: React.ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>
}

function PageContent() {
  const { currentPage, params } = usePage()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'shop':
        return <Shop id={params.id} />
      case 'product-detail':
        return <ProductDetail id={params.id} />
      case 'cart':
        return <Cart />
      case 'checkout':
        return (
          <Protected>
            <Checkout />
          </Protected>
        )
      case 'profile':
        return <Profile />
      case 'orders':
        return (
          <Protected>
            <Orders />
          </Protected>
        )
      case 'addresses':
        return (
          <Protected>
            <Addresses />
          </Protected>
        )
      case 'login':
        return <Login />
      default:
        return <Home />
    }
  }

  const showTabBar = ['home', 'cart', 'profile'].includes(currentPage)

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <PageShell showTab={showTabBar}>
          {renderPage()}
        </PageShell>
        {showTabBar && <TabLayout />}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AddressProvider>
        <OrderProvider>
          <CartProvider>
            <PageProvider>
              <PageContent />
              <Toast />
            </PageProvider>
          </CartProvider>
        </OrderProvider>
      </AddressProvider>
    </AuthProvider>
  )
}
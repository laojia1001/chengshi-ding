import { useCart } from '../context/CartContext'
import { usePage } from '../context/PageContext'
import { IconCart, IconHome, IconUser } from './Icons'

export function TabBar() {
  const { cartCount } = useCart()
  const { currentPage, navigate } = usePage()

  return (
    <nav className="tab-bar">
      <button
        className={`tab-item${currentPage === 'home' ? ' active' : ''}`}
        onClick={() => navigate('home')}
      >
        <IconHome />
        <span>首页</span>
      </button>
      <button
        className={`tab-item${currentPage === 'cart' ? ' active' : ''}`}
        onClick={() => navigate('cart')}
      >
        <IconCart />
        {cartCount > 0 && <span className="tab-badge">{cartCount > 99 ? '99+' : cartCount}</span>}
        <span>购物车</span>
      </button>
      <button
        className={`tab-item${currentPage === 'profile' ? ' active' : ''}`}
        onClick={() => navigate('profile')}
      >
        <IconUser />
        <span>我的</span>
      </button>
    </nav>
  )
}
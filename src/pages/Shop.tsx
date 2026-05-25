import { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import { usePage } from '../context/PageContext'
import { StatusBar } from '../components/StatusBar'
import { AppImage } from '../components/AppImage'
import { IconBack, IconHeart } from '../components/Icons'
import { getRestaurant, shopMenus } from '../data/mock'

interface ShopProps {
  id?: string
}

export function Shop({ id: propId }: ShopProps) {
  const { params, goBack, navigate } = usePage()
  const shopId = propId ?? params.id ?? ''
  const { addItem, cartCount } = useCart()
  const shop = getRestaurant(shopId)
  const menus = shopMenus[shopId] ?? []
  const [activeCat, setActiveCat] = useState(0)
  const [fav, setFav] = useState(false)

  const shopCartQty = useMemo(() => {
    return cartCount
  }, [cartCount])

  if (!shop) {
    return (
      <div className="page empty-page">
        <p>店铺不存在</p>
        <button type="button" className="btn-primary" onClick={() => navigate('home')}>
          返回首页
        </button>
      </div>
    )
  }

  const currentMenu = menus[activeCat]

  return (
    <div className="page shop-page">
      <div className="page-scroll has-footer">
        <div className="shop-cover-wrap">
          <AppImage src={shop.image} alt={shop.name} className="shop-cover" kind="shop" label={shop.name} />
          <StatusBar light />
          <nav className="shop-nav">
            <button type="button" className="nav-back light" onClick={goBack} aria-label="返回">
              <IconBack />
            </button>
            <button type="button" className="nav-icon-btn light" onClick={() => setFav(!fav)}>
              <IconHeart filled={fav} />
            </button>
          </nav>
        </div>

        <div className="shop-info card flat">
          <AppImage src={shop.logo} alt={shop.name} className="shop-logo" kind="shop" label={shop.name} />
          <div className="shop-meta">
            <h1>{shop.name}</h1>
            <p>
              <span className="star">★ {shop.rating}</span> · {shop.monthlySales} · {shop.deliveryTime} ·{' '}
              {shop.distance}
            </p>
            <p className="shop-delivery-info">
              起送 ¥{shop.minOrder} · 配送约 ¥{shop.deliveryFee}
            </p>
            <div className="shop-tags">
              {shop.tags.map((t) => (
                <span key={t} className="shop-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="shop-notice">📢 {shop.notice}</div>

        <div className="shop-menu-layout">
          <aside className="menu-categories">
            {menus.map((m, i) => (
              <button
                key={m.category}
                type="button"
                className={`menu-cat${activeCat === i ? ' active' : ''}`}
                onClick={() => setActiveCat(i)}
              >
                {m.category}
              </button>
            ))}
          </aside>
          <div className="menu-items">
            <h3 className="menu-cat-title">{currentMenu?.category}</h3>
            {currentMenu?.items.map((item) => (
              <div key={item.id} className="menu-item-row">
                <button type="button" className="menu-item-link" onClick={() => navigate('product-detail', { id: item.id })}>
                  <AppImage src={item.image} alt={item.name} className="menu-item-img" kind="food" label={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                    <span className="sales">{item.sales}</span>
                    <span className="price price-sm">¥{item.price}</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="add-btn-sm"
                  onClick={() =>
                    addItem({
                      productId: item.id,
                      storeId: shop.id,
                      storeName: shop.name,
                      name: item.name,
                      spec: '默认规格',
                      price: item.price,
                      image: item.image,
                    })
                  }
                  aria-label="加购"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {shopCartQty > 0 && (
        <footer className="sticky-footer shop-cart-bar">
          <button type="button" className="shop-cart-link" onClick={() => navigate('cart')}>
            <span className="cart-ball">{shopCartQty > 99 ? '99+' : shopCartQty}</span>
            <span>查看购物车</span>
          </button>
          <button type="button" className="btn-primary" onClick={() => navigate('cart')}>
            去结算
          </button>
        </footer>
      )}
    </div>
  )
}
import { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import { usePage } from '../context/PageContext'
import { StatusBar } from '../components/StatusBar'
import { QuantityStepper } from '../components/QuantityStepper'
import { AppImage } from '../components/AppImage'
import { IconBack, IconHeart, IconShare } from '../components/Icons'
import { products, getRestaurant } from '../data/mock'

interface ProductDetailProps {
  id?: string
}

export function ProductDetail({ id: propId }: ProductDetailProps) {
  const { params, goBack, navigate } = usePage()
  const productId = propId ?? params.id ?? ''
  const { addItem } = useCart()
  const product = products[productId] ?? products.crawfish

  const [spice, setSpice] = useState(product.spiceOptions?.[1] ?? product.spiceOptions?.[0] ?? '默认')
  const [sugar, setSugar] = useState(product.sugarOptions?.[2] ?? product.sugarOptions?.[0] ?? '默认')
  const [qty, setQty] = useState(1)
  const [fav, setFav] = useState(false)

  const store = getRestaurant(product.storeId)
  const spec = useMemo(() => {
    const parts: string[] = []
    if (product.spiceOptions?.length) parts.push(spice)
    if (product.sugarOptions?.length) parts.push(sugar)
    return parts.length ? parts.join(' / ') : '默认规格'
  }, [product, spice, sugar])

  const total = (product.price * qty).toFixed(2)

  const handleAdd = () => {
    addItem({
      productId: product.id,
      storeId: product.storeId,
      storeName: store?.name ?? '橙食订',
      name: product.name,
      spec,
      price: product.price,
      image: product.image,
      qty,
    })
    navigate('cart')
  }

  return (
    <div className="page">
      <div className="page-scroll has-footer">
        <StatusBar />
        <nav className="nav-bar">
          <button type="button" className="nav-back" onClick={goBack} aria-label="返回">
            <IconBack />
          </button>
          <h1>商品详情</h1>
          <div className="nav-actions">
            <button type="button" className="nav-icon-btn" onClick={() => setFav(!fav)}>
              <IconHeart filled={fav} />
            </button>
            <button type="button" className="nav-icon-btn">
              <IconShare />
            </button>
          </div>
        </nav>

        <div className="product-hero">
          <AppImage src={product.image} alt={product.name} className="product-hero-img" kind="food" label={product.name} />
          {product.tags?.includes('TOP1') && <span className="hot-badge">TOP 1 热销</span>}
        </div>

        <div className="product-summary card flat">
          <div className="product-price-row">
            <div>
              <span className="price price-lg">¥{product.price}</span>
              {product.originalPrice && (
                <span className="price-original">¥{product.originalPrice}</span>
              )}
            </div>
            <span className="sales">{product.sales}</span>
          </div>
          <h2 className="product-name">{product.name}</h2>
          {store && (
            <button type="button" className="store-link" onClick={() => navigate('shop', { id: store.id })}>
              {store.name} ›
            </button>
          )}
          {product.tags && (
            <div className="tag-row">
              {product.tags.filter((t) => t !== 'TOP1').map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          )}
          {product.rating && (
            <div className="rating-box">
              <span className="star">★</span> {product.rating}
            </div>
          )}
        </div>

        <section className="detail-section card flat">
          <h3>
            <span className="info-dot">i</span> 菜品简介
          </h3>
          <p className="detail-desc">{product.desc}</p>
        </section>

        {product.spiceOptions && product.spiceOptions.length > 0 && (
          <section className="detail-section card flat">
            <h3>辣度选择</h3>
            <div className="pill-group">
              {product.spiceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`pill${spice === opt ? ' active' : ''}`}
                  onClick={() => setSpice(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </section>
        )}

        {product.sugarOptions && product.sugarOptions.length > 0 && (
          <section className="detail-section card flat">
            <h3>甜度偏好</h3>
            <div className="pill-group">
              {(product.sugarOptions).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`pill${sugar === opt ? ' active' : ''}`}
                  onClick={() => setSugar(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="detail-section card flat qty-section">
          <h3>购买数量</h3>
          <QuantityStepper value={qty} onChange={setQty} />
        </section>
      </div>

      <footer className="sticky-footer product-footer">
        <div className="footer-price">
          <span className="label">预估总价</span>
          <span className="price price-lg">¥{total}</span>
        </div>
        <button type="button" className="btn-primary" onClick={handleAdd}>
          加入购物车
        </button>
      </footer>
    </div>
  )
}
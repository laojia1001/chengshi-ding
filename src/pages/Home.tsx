import { useEffect, useMemo, useState } from 'react'
import { usePage } from '../context/PageContext'
import { useCart } from '../context/CartContext'
import { StatusBar } from '../components/StatusBar'
import { PageShell } from '../components/PhoneLayout'
import { AppImage } from '../components/AppImage'
import { CategoryIcon, IconBolt, IconPin, IconSearch } from '../components/Icons'
import { banners, categories, homeFoods, restaurants, specialDeals } from '../data/mock'

export function Home() {
  const { navigate } = usePage()
  const { addItem } = useCart()
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery')
  const [sort, setSort] = useState('综合排序')
  const [activeCategory, setActiveCategory] = useState('food')
  const [bannerIndex, setBannerIndex] = useState(0)
  const [keyword, setKeyword] = useState('')

  const filteredFoods = useMemo(() => {
    let list = [...homeFoods]
    if (keyword.trim()) {
      const k = keyword.trim().toLowerCase()
      list = list.filter((f) => f.name.toLowerCase().includes(k) || f.desc.toLowerCase().includes(k))
    }
    if (sort === '销量优先') {
      const num = (s: string) => parseInt(s.replace(/\D/g, ''), 10) || 0
      list = [...list].sort((a, b) => num(b.sales) - num(a.sales))
    }
    if (sort === '好评榜单') list = [...list].reverse()
    return list
  }, [keyword, sort])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBannerIndex((i) => (i + 1) % banners.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <PageShell showTab>
      <StatusBar />
      <header className="home-header">
        <div className="home-brand">
          <span className="brand-logo">
            <IconBolt className="icon icon-fill" />
          </span>
        </div>
        <div className="home-search">
          <IconSearch />
          <input
            type="search"
            placeholder="搜索商家、美食"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </header>

      <div className="home-location">
        <div className="location-text">
          <IconPin />
          <span>朝阳区望京SOHO</span>
          <span className="chevron">›</span>
        </div>
        <div className="mode-toggle">
          <button
            type="button"
            className={deliveryMode === 'delivery' ? 'active' : ''}
            onClick={() => setDeliveryMode('delivery')}
          >
            外卖
          </button>
          <button
            type="button"
            className={deliveryMode === 'pickup' ? 'active' : ''}
            onClick={() => setDeliveryMode('pickup')}
          >
            自提
          </button>
        </div>
      </div>

      <div className="category-scroll">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-item${activeCategory === cat.id ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <div className="category-icon-wrap">
              <CategoryIcon type={cat.icon} />
            </div>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="banner-carousel card">
        <div
          className="banner-track"
          style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
        >
          {banners.map((b) => (
            <div key={b.id} className="banner-slide" style={{ background: b.color }}>
              <AppImage src={b.image} alt={b.title} kind="banner" label={b.title} className="banner-img" />
              <div className="banner-text">
                <strong>{b.title}</strong>
                <span>{b.sub}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="banner-dots">
          {banners.map((b, i) => (
            <button
              key={b.id}
              type="button"
              className={bannerIndex === i ? 'active' : ''}
              onClick={() => setBannerIndex(i)}
              aria-label={`轮播${i + 1}`}
            />
          ))}
        </div>
      </div>

      <section className="section-block">
        <div className="section-head">
          <h2>附近商家</h2>
          <span className="more-link">查看更多 ›</span>
        </div>
        <ul className="restaurant-list">
          {restaurants.map((r) => (
            <li key={r.id}>
              <button type="button" className="restaurant-card" onClick={() => navigate('shop', { id: r.id })}>
                <AppImage src={r.logo} alt={r.name} className="rest-logo" kind="shop" label={r.name} />
                <div className="rest-info">
                  <h3>{r.name}</h3>
                  <p>
                    <span className="star">★ {r.rating}</span> {r.monthlySales} · {r.deliveryTime} ·{' '}
                    {r.distance}
                  </p>
                  <p className="rest-meta">
                    起送¥{r.minOrder} · 配送¥{r.deliveryFee}
                  </p>
                  <div className="rest-tags">
                    {r.tags.slice(0, 2).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-block">
        <div className="section-head">
          <h2>限时特价</h2>
        </div>
        <div className="deals-scroll">
          {specialDeals.map((deal) => (
            <button key={deal.id} type="button" className="deal-card" onClick={() => navigate('product-detail', { id: deal.id })}>
              <AppImage src={deal.image} alt={deal.name} kind="food" label={deal.name} className="deal-img" />
              <h4>{deal.name}</h4>
              <div className="deal-price">
                <span className="price">¥{deal.price}</span>
                {deal.originalPrice && (
                  <span className="price-original">¥{deal.originalPrice}</span>
                )}
              </div>
              <span className="deal-sales">{deal.sales}</span>
            </button>
          ))}
        </div>
      </section>

      <h2 className="section-title">精选美味</h2>
      <div className="sort-tabs">
        {['综合排序', '销量优先', '好评榜单'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`sort-tab${sort === tab ? ' active' : ''}`}
            onClick={() => setSort(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredFoods.length === 0 ? (
        <p className="empty-hint">暂无匹配美食，换个关键词试试</p>
      ) : (
        <ul className="food-list">
          {filteredFoods.map((item) => {
            const rest = restaurants.find((r) => r.id === item.storeId)
            return (
              <li key={item.id} className="food-item">
                <button type="button" className="food-item-link" onClick={() => navigate('product-detail', { id: item.id })}>
                  <AppImage src={item.image} alt={item.name} className="food-thumb" kind="food" label={item.name} />
                  <div className="food-info">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    {rest && <span className="food-store">{rest.name}</span>}
                    <div className="food-meta">
                      <span className="price price-sm">¥ {item.price}</span>
                      <span className="sales">{item.sales}</span>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  className="add-btn"
                  aria-label="加购"
                  onClick={() =>
                    addItem({
                      productId: item.id,
                      storeId: item.storeId,
                      storeName: rest?.name ?? '橙食订',
                      name: item.name,
                      spec: '默认规格',
                      price: item.price,
                      image: item.image,
                    })
                  }
                >
                  +
                </button>
              </li>
            )
          })}
        </ul>
      )}
      <p className="list-footer">正在为您搜寻更多美食...</p>
    </PageShell>
  )
}

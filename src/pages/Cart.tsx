import { useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { usePage } from '../context/PageContext'
import { AppImage } from '../components/AppImage'
import { StatusBar } from '../components/StatusBar'
import { PageShell } from '../components/PhoneLayout'
import { QuantityStepper } from '../components/QuantityStepper'

export function Cart() {
  const { navigate } = usePage()
  const { isLoggedIn } = useAuth()
  const {
    items,
    toggleItem,
    toggleAll,
    updateQty,
    removeItem,
    checkedItems,
    subtotal,
    packagingFee,
    deliveryFee,
    deliveryFeeOriginal,
    promoDiscount,
    deliveryGapAmount,
  } = useCart()

  const [editing, setEditing] = useState(false)
  const [couponOn, setCouponOn] = useState(true)

  const selectAll = items.length > 0 && items.every((i) => i.checked)
  const storeName = items[0]?.storeName ?? '橙味小厨'
  const effectiveDiscount = couponOn ? promoDiscount : 0
  const payTotal = Math.max(0, subtotal + packagingFee + deliveryFee - effectiveDiscount)

  const estimatedTime = useMemo(() => {
    const d = new Date()
    d.setMinutes(d.getMinutes() + 35)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }, [])

  const handleCheckout = () => {
    if (checkedItems.length === 0) return
    if (!isLoggedIn) {
      navigate('login')
      return
    }
    navigate('checkout')
  }

  if (items.length === 0) {
    return (
      <PageShell showTab>
        <StatusBar />
        <nav className="nav-bar cart-nav">
          <h1>购物车</h1>
        </nav>
        <div className="empty-cart">
          <p>购物车是空的</p>
          <button type="button" className="btn-primary" onClick={() => navigate('home')}>
            去首页逛逛
          </button>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell showTab>
      <StatusBar />
      <nav className="nav-bar cart-nav">
        <h1>购物车</h1>
        <button type="button" className="edit-btn" onClick={() => setEditing(!editing)}>
          {editing ? '完成' : '编辑'}
        </button>
      </nav>

      <div className="delivery-tip card flat">
        <span className="tip-icon">ⓘ</span>
        现在下单，预计 <strong>{estimatedTime}</strong> 送达
      </div>

      <div className="store-row card flat">
        <span className="store-name">{storeName}</span>
        <span className="delivery-tag">美团配送</span>
        {deliveryGapAmount > 0 && (
          <span className="store-hint">还差 ¥{deliveryGapAmount.toFixed(1)} 免配送费</span>
        )}
      </div>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item card">
            {!editing && (
              <button
                type="button"
                className={`checkbox${item.checked ? ' checked' : ''}`}
                onClick={() => toggleItem(item.id)}
                aria-label="选择"
              />
            )}
            <AppImage src={item.image} alt={item.name} className="cart-item-img" kind="food" label={item.name} />
            <div className="cart-item-body">
              <div className="cart-item-top">
                <h3>{item.name}</h3>
                {editing ? (
                  <button type="button" className="delete-btn" onClick={() => removeItem(item.id)}>
                    删除
                  </button>
                ) : (
                  <button type="button" className="delete-btn" onClick={() => removeItem(item.id)}>
                    删除
                  </button>
                )}
              </div>
              <p className="spec">{item.spec}</p>
              <div className="cart-item-bottom">
                <span className="price">¥{item.price.toFixed(1)}</span>
                <QuantityStepper value={item.qty} onChange={(q) => updateQty(item.id, q)} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button type="button" className="coupon-row card" onClick={() => setCouponOn(!couponOn)}>
        <span>🎫 优惠券</span>
        <span className="coupon-val">
          {couponOn && effectiveDiscount > 0 ? `-¥${effectiveDiscount.toFixed(2)}` : '暂无可用'}
        </span>
        <span className="chevron">›</span>
      </button>

      <div className="fee-card card">
        <div className="fee-row">
          <span>包装费</span>
          <span>¥{packagingFee.toFixed(2)}</span>
        </div>
        <div className="fee-row">
          <span>配送费</span>
          <span>
            {deliveryFee < deliveryFeeOriginal && (
              <span className="price-original">¥{deliveryFeeOriginal.toFixed(2)}</span>
            )}{' '}
            ¥{deliveryFee.toFixed(2)}
          </span>
        </div>
        {effectiveDiscount > 0 && (
          <div className="fee-row discount">
            <span>
              满减优惠 <em className="promo-tag">周年庆</em>
            </span>
            <span className="discount-val">-¥{effectiveDiscount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <p className="safety-tip">🛡 食品安全保障 · 准时宝已开启</p>
      <p className="list-end">— 已经到底啦 —</p>

      <footer className="sticky-footer cart-footer with-tab">
        {!editing && (
          <>
            <button
              type="button"
              className={`checkbox${selectAll ? ' checked' : ''}`}
              onClick={() => toggleAll(!selectAll)}
            />
            <span className="select-label">全选</span>
          </>
        )}
        <div className="cart-total">
          <div>
            合计: <span className="price">¥{payTotal.toFixed(2)}</span>
          </div>
          {effectiveDiscount > 0 && (
            <span className="saved">已优惠 ¥{effectiveDiscount.toFixed(2)}</span>
          )}
        </div>
        <button
          type="button"
          className={`btn-primary checkout-btn${checkedItems.length === 0 ? ' disabled' : ''}`}
          disabled={checkedItems.length === 0}
          onClick={handleCheckout}
        >
          去结算{checkedItems.length > 0 ? `(${checkedItems.length})` : ''}
        </button>
      </footer>
    </PageShell>
  )
}
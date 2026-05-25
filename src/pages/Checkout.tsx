import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { maskPhoneDisplay, useAddress } from '../context/AddressContext'
import { useOrders } from '../context/OrderContext'
import { usePage } from '../context/PageContext'
import { StatusBar } from '../components/StatusBar'
import { IconAlipay, IconBack, IconWechat } from '../components/Icons'

export function Checkout() {
  const { navigate, goBack } = usePage()
  const { selectedAddress } = useAddress()
  const { addOrder } = useOrders()
  const {
    checkedItems,
    subtotal,
    packagingFee,
    deliveryFee,
    promoDiscount,
    total,
    clearChecked,
    showToast,
  } = useCart()
  const [payment, setPayment] = useState<'wechat' | 'alipay'>('wechat')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const storeName = checkedItems[0]?.storeName ?? '橙食订精选店'
  const address = selectedAddress

  if (checkedItems.length === 0 && !submitted) {
    return (
      <div className="page">
        <div className="empty-cart" style={{ paddingTop: 80 }}>
          <p>请先选择要结算的商品</p>
          <button type="button" className="btn-primary" onClick={() => navigate('cart')}>
            返回购物车
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = () => {
    if (!address) {
      showToast('请先选择收货地址')
      navigate('addresses')
      return
    }
    addOrder({
      storeName,
      items: checkedItems.map((i) => ({
        name: i.name,
        spec: i.spec,
        qty: i.qty,
        price: i.price,
        image: i.image,
      })),
      subtotal,
      packagingFee,
      deliveryFee,
      promoDiscount,
      total,
      address,
      payment,
      note: note.trim(),
      status: 'pending_accept',
    })
    setSubmitted(true)
    showToast('订单提交成功！')
    clearChecked()
  }

  if (submitted) {
    return (
      <div className="page">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2>支付成功</h2>
          <p>预计 30 分钟内送达，请耐心等待</p>
          <button type="button" className="btn-primary block" onClick={() => navigate('orders')}>
            查看订单
          </button>
          <button
            type="button"
            className="btn-outline block"
            style={{ marginTop: 10 }}
            onClick={() => navigate('home')}
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-scroll has-footer">
        <StatusBar />
        <nav className="nav-bar">
          <button type="button" className="nav-back" onClick={goBack} aria-label="返回">
            <IconBack />
          </button>
          <h1>确认订单</h1>
        </nav>

        <button type="button" className="card address-card address-link" onClick={() => navigate('addresses')}>
          <span className="pin-icon">📍</span>
          {address ? (
            <div className="address-body">
              <div className="address-top">
                <strong>{address.name}</strong>
                <span>{maskPhoneDisplay(address.phone)}</span>
                <span className="addr-tag">{address.tag}</span>
              </div>
              <p>{address.detail}</p>
            </div>
          ) : (
            <div className="address-body">
              <p className="addr-placeholder">请添加收货地址</p>
            </div>
          )}
          <span className="chevron">›</span>
        </button>

        <div className="card time-card">
          <span>预计送达时间</span>
          <span className="time-val">今天 12:45 (约 30 分钟)</span>
        </div>

        <div className="card order-card">
          <h3 className="merchant-title">
            <span className="bar" />
            商家: {storeName}
          </h3>
          <ul className="order-items">
            {checkedItems.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <span className="spec">{item.spec}</span>
                </div>
                <div className="order-right">
                  <span>x{item.qty}</span>
                  <span className="price">¥{(item.price * item.qty).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="note-row">
            <span>💬</span>
            <span>订单备注</span>
            <input
              className="note-input"
              placeholder="口味、餐具等要求"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div className="card fee-summary">
          <div className="fee-row">
            <span>商品合计</span>
            <span>¥{subtotal.toFixed(2)}</span>
          </div>
          <div className="fee-row">
            <span>打包费</span>
            <span>¥{packagingFee.toFixed(2)}</span>
          </div>
          <div className="fee-row">
            <span>配送费</span>
            <span>¥{deliveryFee.toFixed(2)}</span>
          </div>
          {promoDiscount > 0 && (
            <div className="fee-row discount">
              <span>优惠</span>
              <span className="discount-val">-¥{promoDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="fee-row total-row">
            <span>实付总额</span>
            <span className="price price-lg">¥{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="card payment-card">
          <h3>💳 支付方式</h3>
          <button
            type="button"
            className={`pay-option${payment === 'wechat' ? ' active' : ''}`}
            onClick={() => setPayment('wechat')}
          >
            <IconWechat />
            <span>微信支付</span>
            <span className={`radio${payment === 'wechat' ? ' checked' : ''}`} />
          </button>
          <button
            type="button"
            className={`pay-option${payment === 'alipay' ? ' active' : ''}`}
            onClick={() => setPayment('alipay')}
          >
            <IconAlipay />
            <span>支付宝</span>
            <span className={`radio${payment === 'alipay' ? ' checked' : ''}`} />
          </button>
        </div>
      </div>

      <footer className="sticky-footer checkout-footer">
        <button type="button" className="btn-primary block" onClick={handleSubmit}>
          提交订单支付 ¥{total.toFixed(2)}
        </button>
      </footer>
    </div>
  )
}
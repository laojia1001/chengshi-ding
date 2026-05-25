import { useMemo, useState } from 'react'
import { AppImage } from '../components/AppImage'
import { StatusBar } from '../components/StatusBar'
import { IconBack } from '../components/Icons'
import { usePage } from '../context/PageContext'
import { statusLabels, useOrders, type OrderStatus } from '../context/OrderContext'

const tabs: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'pending_pay', label: '待付款' },
  { key: 'pending_accept', label: '待接单' },
  { key: 'delivering', label: '配送中' },
  { key: 'completed', label: '已完成' },
  { key: 'refund', label: '退款' },
]

function formatTime(ts: number) {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

export function Orders() {
  const { goBack, navigate } = usePage()
  const [tab, setTab] = useState<OrderStatus | 'all'>('all')
  const { orders } = useOrders()

  const filtered = useMemo(() => {
    if (tab === 'all') return orders
    return orders.filter((o) => o.status === tab)
  }, [orders, tab])

  return (
    <div className="page">
      <div className="page-scroll">
        <StatusBar />
        <nav className="nav-bar">
          <button type="button" className="nav-back" onClick={goBack} aria-label="返回">
            <IconBack />
          </button>
          <h1>我的订单</h1>
        </nav>

        <div className="order-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`order-tab${tab === t.key ? ' active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-cart">
            <p>暂无相关订单</p>
            <button type="button" className="btn-primary" onClick={() => navigate('home')}>
              去下单
            </button>
          </div>
        ) : (
          <ul className="order-list">
            {filtered.map((order) => (
              <li key={order.id} className="card order-card-item">
                <div className="order-card-head">
                  <span className="store-name">{order.storeName}</span>
                  <span className={`order-status status-${order.status}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>
                <p className="order-no">订单号 {order.orderNo}</p>
                <p className="order-time">{formatTime(order.createdAt)}</p>
                <ul className="order-preview-items">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <li key={idx}>
                      <AppImage
                        src={item.image}
                        alt={item.name}
                        className="order-item-thumb"
                        kind="food"
                        label={item.name}
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <span className="spec">{item.spec} x{item.qty}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="order-card-foot">
                  <span>
                    共 {order.items.reduce((s, i) => s + i.qty, 0)} 件
                  </span>
                  <span className="price">实付 ¥{order.total.toFixed(2)}</span>
                </div>
                {order.status === 'pending_pay' && (
                  <div className="order-actions">
                    <button type="button" className="btn-outline">
                      取消订单
                    </button>
                    <button type="button" className="btn-primary btn-sm">
                      去支付
                    </button>
                  </div>
                )}
                {order.status === 'completed' && (
                  <div className="order-actions">
                    <button type="button" className="btn-outline">
                      再来一单
                    </button>
                    <button type="button" className="btn-primary btn-sm">
                      去评价
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
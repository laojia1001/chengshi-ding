import { formatUserPhone, useAuth } from '../context/AuthContext'
import { usePage } from '../context/PageContext'
import { StatusBar } from '../components/StatusBar'
import { PageShell } from '../components/PhoneLayout'

const orderStatus = [
  { label: '待付款', icon: '💳', tab: 'pending_pay' },
  { label: '待接单', icon: '📋', tab: 'pending_accept' },
  { label: '配送中', icon: '🛵', tab: 'delivering' },
  { label: '待评价', icon: '⭐', tab: 'completed' },
  { label: '退款', icon: '↩', tab: 'refund' },
]

const menus = [
  { label: '我的订单', path: 'orders' },
  { label: '优惠券', path: 'orders' },
  { label: '收藏店铺', path: 'home' },
  { label: '收货地址管理', path: 'addresses' },
  { label: '客服与帮助', path: 'home' },
  { label: '设置', path: 'addresses' },
]

export function Profile() {
  const { navigate } = usePage()
  const { user, logout, isLoggedIn } = useAuth()

  const avatarChar = user?.nickname?.slice(0, 1) ?? '客'

  return (
    <PageShell showTab>
      <StatusBar />
      <div className="profile-header">
        <div className="profile-user">
          <div className="avatar">{avatarChar}</div>
          <div>
            <h2>{user?.nickname ?? '未登录'}</h2>
            <span className="member-tag">黄金会员</span>
            {user && <p className="profile-phone">{formatUserPhone(user)}</p>}
          </div>
        </div>
        {isLoggedIn ? (
          <button type="button" className="settings-link" onClick={logout}>
            退出
          </button>
        ) : (
          <button type="button" className="settings-link btn-login-top" onClick={() => navigate('login')}>
            登录
          </button>
        )}
      </div>

      {!isLoggedIn && (
        <div className="login-banner card">
          <p>登录后享受优惠券、订单同步等服务</p>
          <button type="button" className="btn-primary btn-sm" onClick={() => navigate('login')}>
            立即登录
          </button>
        </div>
      )}

      <div className="order-status-row card">
        {orderStatus.map((s) => (
          <button
            key={s.label}
            type="button"
            className="status-item"
            onClick={() =>
              isLoggedIn
                ? navigate('orders')
                : navigate('login')
            }
          >
            <span className="status-icon">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <ul className="menu-list card">
        {menus.map((m) => (
          <li key={m.label}>
            <button
              type="button"
              className="menu-item-btn"
              onClick={() => {
                if (!isLoggedIn && (m.path === 'orders' || m.path === 'addresses')) {
                  navigate('login')
                } else {
                  navigate(m.path as any)
                }
              }}
            >
              <span>{m.label}</span>
              <span className="chevron">›</span>
            </button>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
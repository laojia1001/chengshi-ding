import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { usePage } from '../context/PageContext'
import { StatusBar } from '../components/StatusBar'
import { IconBolt, IconPhone, IconShield, IconWechat } from '../components/Icons'

export function Login() {
  const { navigate } = usePage()
  const { login, loginWechat, isLoggedIn } = useAuth()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (isLoggedIn) navigate('home')
  }, [isLoggedIn, navigate])

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setError('')
    const result = login(phone, code)
    if (!result.ok) {
      setError(result.message ?? '登录失败')
      return
    }
    navigate('home')
  }

  const handleWechat = () => {
    loginWechat()
    navigate('home')
  }

  const sendCode = () => {
    if (!/^1\d{10}$/.test(phone.replace(/\s/g, ''))) {
      setError('请先输入正确手机号')
      return
    }
    setSending(true)
    setError('')
    window.setTimeout(() => {
      setSending(false)
      setCode('123456')
      setError('验证码已发送（演示码：123456）')
    }, 800)
  }

  return (
    <div className="page login-page">
      <div className="login-bg" />
      <StatusBar />
      <div className="login-content">
        <div className="login-brand">
          <div className="login-logo">
            <IconBolt className="icon icon-fill" />
          </div>
          <h1>欢迎来到橙食订</h1>
          <p>极简外卖，新鲜送达，开启您的美味之旅</p>
        </div>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            手机号码
            <div className="input-wrap">
              <IconPhone />
              <input
                type="tel"
                placeholder="请输入手机号码"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={11}
              />
            </div>
          </label>
          <label>
            验证码
            <div className="input-wrap">
              <IconShield />
              <input
                type="text"
                placeholder="输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
              />
              <button type="button" className="code-btn" onClick={sendCode} disabled={sending}>
                {sending ? '发送中…' : '获取验证码'}
              </button>
            </div>
          </label>
          <button type="submit" className="btn-primary block">
            登录 / 注册
          </button>
        </form>

        <p className="login-legal">
          登录即代表您已阅读并同意
          <a href="#">《用户服务协议》</a>及<a href="#">《隐私政策》</a>
        </p>

        <div className="social-divider">
          <span>社交账号快捷登录</span>
        </div>

        <button type="button" className="wechat-btn" onClick={handleWechat}>
          <IconWechat />
          微信一键登录
        </button>

        <p className="login-register">
          <button type="button" onClick={() => navigate('home')}>暂不登录，先逛逛</button>
        </p>
      </div>
    </div>
  )
}
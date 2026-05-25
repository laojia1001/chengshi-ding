import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'chengshi-ding-auth'

export type User = {
  id: string
  phone: string
  nickname: string
}

type AuthContextValue = {
  user: User | null
  isLoggedIn: boolean
  login: (phone: string, code: string) => { ok: boolean; message?: string }
  loginWechat: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const u = JSON.parse(raw) as User
      if (u?.phone && u?.nickname) return u
    }
  } catch {
    /* ignore */
  }
  return null
}

function maskPhone(phone: string) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser)

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = useCallback((phone: string, code: string) => {
    const trimmed = phone.replace(/\s/g, '')
    if (!/^1\d{10}$/.test(trimmed)) {
      return { ok: false, message: '请输入正确的11位手机号' }
    }
    if (!/^\d{4,6}$/.test(code)) {
      return { ok: false, message: '请输入4-6位验证码（演示可用 123456）' }
    }
    const u: User = {
      id: `u-${trimmed}`,
      phone: trimmed,
      nickname: `用户${trimmed.slice(-4)}`,
    }
    setUser(u)
    return { ok: true }
  }, [])

  const loginWechat = useCallback(() => {
    setUser({
      id: 'wx-demo',
      phone: '13800008888',
      nickname: '微信用户',
    })
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      login,
      loginWechat,
      logout,
    }),
    [user, login, loginWechat, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function formatUserPhone(user: User | null) {
  if (!user) return ''
  return maskPhone(user.phone)
}

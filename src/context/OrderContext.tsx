import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Address } from './AddressContext'

const STORAGE_KEY = 'chengshi-ding-orders'

export type OrderStatus =
  | 'pending_pay'
  | 'pending_accept'
  | 'delivering'
  | 'completed'
  | 'refund'

export type OrderItem = {
  name: string
  spec: string
  qty: number
  price: number
  image: string
}

export type Order = {
  id: string
  orderNo: string
  status: OrderStatus
  storeName: string
  items: OrderItem[]
  subtotal: number
  packagingFee: number
  deliveryFee: number
  promoDiscount: number
  total: number
  address: Address
  payment: 'wechat' | 'alipay'
  note: string
  createdAt: number
}

type CreateOrderPayload = Omit<Order, 'id' | 'orderNo' | 'status' | 'createdAt'> & {
  status?: OrderStatus
}

type OrderContextValue = {
  orders: Order[]
  addOrder: (payload: CreateOrderPayload) => Order
  updateStatus: (id: string, status: OrderStatus) => void
}

const OrderContext = createContext<OrderContextValue | null>(null)

const statusLabels: Record<OrderStatus, string> = {
  pending_pay: '待付款',
  pending_accept: '待接单',
  delivering: '配送中',
  completed: '已完成',
  refund: '退款/售后',
}

export { statusLabels }

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const list = JSON.parse(raw) as Order[]
      if (Array.isArray(list)) return list.sort((a, b) => b.createdAt - a.createdAt)
    }
  } catch {
    /* ignore */
  }
  return seedOrders()
}

function seedOrders(): Order[] {
  const now = Date.now()
  return [
    {
      id: 'ord-seed-1',
      orderNo: 'CS202505220001',
      status: 'completed',
      storeName: '橙味小厨 (望京店)',
      items: [
        {
          name: '招牌红烧肉饭',
          spec: '正常辣',
          qty: 1,
          price: 32.5,
          image: '',
        },
      ],
      subtotal: 32.5,
      packagingFee: 1,
      deliveryFee: 2.5,
      promoDiscount: 0,
      total: 36,
      address: {
        id: 'addr-1',
        name: '张晓',
        phone: '13812348888',
        tag: '家',
        detail: '北京市朝阳区望京 SOHO T3 30层 3001',
        isDefault: true,
      },
      payment: 'wechat',
      note: '',
      createdAt: now - 86400000 * 2,
    },
    {
      id: 'ord-seed-2',
      orderNo: 'CS202505210088',
      status: 'delivering',
      storeName: '老张牛肉面',
      items: [
        {
          name: '招牌红烧牛肉面',
          spec: '默认',
          qty: 1,
          price: 32,
          image: '',
        },
      ],
      subtotal: 32,
      packagingFee: 1,
      deliveryFee: 5,
      promoDiscount: 5,
      total: 33,
      address: {
        id: 'addr-1',
        name: '张晓',
        phone: '13812348888',
        tag: '家',
        detail: '北京市朝阳区望京 SOHO T3 30层 3001',
        isDefault: true,
      },
      payment: 'alipay',
      note: '少辣',
      createdAt: now - 3600000,
    },
  ]
}

function genOrderNo() {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `CS${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${String(Date.now()).slice(-6)}`
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadOrders)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  const addOrder = useCallback((payload: CreateOrderPayload) => {
    const order: Order = {
      ...payload,
      id: `ord-${Date.now()}`,
      orderNo: genOrderNo(),
      status: payload.status ?? 'pending_accept',
      createdAt: Date.now(),
    }
    setOrders((list) => [order, ...list])
    return order
  }, [])

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)))
  }, [])

  const value = useMemo(
    () => ({ orders, addOrder, updateStatus }),
    [orders, addOrder, updateStatus],
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}

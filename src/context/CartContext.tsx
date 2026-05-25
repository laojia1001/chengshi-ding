import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem } from '../data/mock'
import { initialCartItems } from '../data/mock'
import {
  calcOrderTotal,
  calcPromoDiscount,
  calcSubtotal,
  calcDeliveryFee,
  deliveryGap,
  PACKAGING_FEE,
} from '../utils/fees'

const STORAGE_KEY = 'chengshi-ding-cart'

type AddPayload = {
  productId: string
  storeId: string
  storeName: string
  name: string
  spec: string
  price: number
  image: string
  qty?: number
}

type CartContextValue = {
  items: CartItem[]
  cartCount: number
  addItem: (payload: AddPayload) => void
  updateQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  toggleItem: (id: string) => void
  toggleAll: (checked: boolean) => void
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  checkedItems: CartItem[]
  subtotal: number
  packagingFee: number
  deliveryFee: number
  deliveryFeeOriginal: number
  promoDiscount: number
  total: number
  deliveryGapAmount: number
  clearChecked: () => void
  toast: string | null
  showToast: (msg: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CartItem[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    /* ignore */
  }
  return initialCartItems
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2000)
  }, [])

  const addItem = useCallback(
    (payload: AddPayload) => {
      const qty = payload.qty ?? 1
      setItems((list) => {
        const existing = list.find(
          (i) => i.productId === payload.productId && i.spec === payload.spec,
        )
        if (existing) {
          return list.map((i) =>
            i.id === existing.id ? { ...i, qty: i.qty + qty, checked: true } : i,
          )
        }
        const line: CartItem = {
          id: `${payload.productId}-${Date.now()}`,
          productId: payload.productId,
          storeId: payload.storeId,
          storeName: payload.storeName,
          name: payload.name,
          spec: payload.spec,
          price: payload.price,
          qty,
          image: payload.image,
          checked: true,
        }
        return [...list, line]
      })
      showToast('已加入购物车')
    },
    [showToast],
  )

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return
    setItems((list) => list.map((i) => (i.id === id ? { ...i, qty } : i)))
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((list) => list.filter((i) => i.id !== id))
  }, [])

  const toggleItem = useCallback((id: string) => {
    setItems((list) => list.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)))
  }, [])

  const toggleAll = useCallback((checked: boolean) => {
    setItems((list) => list.map((i) => ({ ...i, checked })))
  }, [])

  const clearChecked = useCallback(() => {
    setItems((list) => list.filter((i) => !i.checked))
  }, [])

  const checkedItems = useMemo(() => items.filter((i) => i.checked), [items])
  const cartCount = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const subtotal = useMemo(() => calcSubtotal(checkedItems), [checkedItems])
  const packagingFee = checkedItems.length > 0 ? PACKAGING_FEE : 0
  const deliveryFee = checkedItems.length > 0 ? calcDeliveryFee(subtotal) : 0
  const deliveryFeeOriginal = checkedItems.length > 0 ? 5 : 0
  const promoDiscount = checkedItems.length > 0 ? calcPromoDiscount(subtotal) : 0
  const total = useMemo(
    () =>
      checkedItems.length > 0
        ? calcOrderTotal(subtotal)
        : 0,
    [checkedItems.length, subtotal],
  )
  const deliveryGapAmount = useMemo(() => deliveryGap(subtotal), [subtotal])

  const value = useMemo(
    () => ({
      items,
      cartCount,
      addItem,
      updateQty,
      removeItem,
      toggleItem,
      toggleAll,
      setItems,
      checkedItems,
      subtotal,
      packagingFee,
      deliveryFee,
      deliveryFeeOriginal,
      promoDiscount,
      total,
      deliveryGapAmount,
      clearChecked,
      toast,
      showToast,
    }),
    [
      items,
      cartCount,
      addItem,
      updateQty,
      removeItem,
      toggleItem,
      toggleAll,
      checkedItems,
      subtotal,
      packagingFee,
      deliveryFee,
      deliveryFeeOriginal,
      promoDiscount,
      total,
      deliveryGapAmount,
      clearChecked,
      toast,
      showToast,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

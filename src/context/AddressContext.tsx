import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'chengshi-ding-addresses'
const SELECTED_KEY = 'chengshi-ding-address-selected'

export type AddressTag = '家' | '公司' | '学校'

export type Address = {
  id: string
  name: string
  phone: string
  tag: AddressTag
  detail: string
  isDefault: boolean
}

type AddressContextValue = {
  addresses: Address[]
  selectedId: string | null
  selectedAddress: Address | null
  selectAddress: (id: string) => void
  addAddress: (addr: Omit<Address, 'id'>) => void
  updateAddress: (id: string, patch: Partial<Address>) => void
  removeAddress: (id: string) => void
  setDefault: (id: string) => void
}

const defaultAddresses: Address[] = [
  {
    id: 'addr-1',
    name: '张晓',
    phone: '13812348888',
    tag: '家',
    detail: '北京市朝阳区望京 SOHO T3 30层 3001',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: '张晓',
    phone: '13812348888',
    tag: '公司',
    detail: '北京市海淀区中关村大街 1 号 科技大厦 8层',
    isDefault: false,
  },
]

const AddressContext = createContext<AddressContextValue | null>(null)

function loadAddresses(): Address[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const list = JSON.parse(raw) as Address[]
      if (Array.isArray(list) && list.length > 0) return list
    }
  } catch {
    /* ignore */
  }
  return defaultAddresses
}

function loadSelectedId(): string | null {
  return localStorage.getItem(SELECTED_KEY)
}

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>(loadAddresses)
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const saved = loadSelectedId()
    if (saved && loadAddresses().some((a) => a.id === saved)) return saved
    return loadAddresses().find((a) => a.isDefault)?.id ?? null
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses))
  }, [addresses])

  useEffect(() => {
    if (selectedId) localStorage.setItem(SELECTED_KEY, selectedId)
    else localStorage.removeItem(SELECTED_KEY)
  }, [selectedId])

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedId) ?? addresses.find((a) => a.isDefault) ?? null,
    [addresses, selectedId],
  )

  const selectAddress = useCallback((id: string) => setSelectedId(id), [])

  const addAddress = useCallback((addr: Omit<Address, 'id'>) => {
    const id = `addr-${Date.now()}`
    setAddresses((list) => {
      const next = [...list, { ...addr, id }]
      if (addr.isDefault) return next.map((a) => ({ ...a, isDefault: a.id === id }))
      return next
    })
    setSelectedId(id)
  }, [])

  const updateAddress = useCallback((id: string, patch: Partial<Address>) => {
    setAddresses((list) =>
      list.map((a) => {
        if (a.id !== id) return patch.isDefault ? { ...a, isDefault: false } : a
        return { ...a, ...patch }
      }),
    )
  }, [])

  const removeAddress = useCallback((id: string) => {
    setAddresses((list) => {
      const next = list.filter((a) => a.id !== id)
      if (next.length === 0) return defaultAddresses
      if (!next.some((a) => a.isDefault)) next[0].isDefault = true
      return next
    })
    setSelectedId((cur) => (cur === id ? null : cur))
  }, [])

  const setDefault = useCallback((id: string) => {
    setAddresses((list) => list.map((a) => ({ ...a, isDefault: a.id === id })))
    setSelectedId(id)
  }, [])

  const value = useMemo(
    () => ({
      addresses,
      selectedId,
      selectedAddress,
      selectAddress,
      addAddress,
      updateAddress,
      removeAddress,
      setDefault,
    }),
    [
      addresses,
      selectedId,
      selectedAddress,
      selectAddress,
      addAddress,
      updateAddress,
      removeAddress,
      setDefault,
    ],
  )

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
}

export function useAddress() {
  const ctx = useContext(AddressContext)
  if (!ctx) throw new Error('useAddress must be used within AddressProvider')
  return ctx
}

export function maskPhoneDisplay(phone: string) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1 **** $2')
}

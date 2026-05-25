import { createContext, useContext, useState, type ReactNode } from 'react'

export type PageType = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'profile' 
  | 'orders' 
  | 'addresses' 
  | 'login'

interface PageContextType {
  currentPage: PageType
  navigate: (page: PageType, params?: Record<string, string>) => void
  goBack: () => void
  params: Record<string, string>
}

const PageContext = createContext<PageContextType | undefined>(undefined)

export function PageProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [params, setParams] = useState<Record<string, string>>({})
  const [history, setHistory] = useState<PageType[]>(['home'])

  const navigate = (page: PageType, newParams?: Record<string, string>) => {
    setCurrentPage(page)
    if (newParams) {
      setParams(newParams)
    }
    setHistory(prev => [...prev, page])
  }

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1)
      setHistory(newHistory)
      setCurrentPage(newHistory[newHistory.length - 1])
    }
  }

  return (
    <PageContext.Provider value={{ currentPage, navigate, goBack, params }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePage() {
  const context = useContext(PageContext)
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider')
  }
  return context
}
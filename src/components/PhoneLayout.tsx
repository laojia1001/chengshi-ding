import type { ReactNode } from 'react'
import { TabBar } from './TabBar'

export function AppShell() {
  return null
}

export function TabLayout() {
  return <TabBar />
}

export function PageShell({
  children,
  showTab = false,
  className = '',
}: {
  children: ReactNode
  showTab?: boolean
  className?: string
}) {
  return (
    <div className={`page ${className}`}>
      <div className={`page-scroll${showTab ? ' has-tab' : ''}`}>{children}</div>
    </div>
  )
}
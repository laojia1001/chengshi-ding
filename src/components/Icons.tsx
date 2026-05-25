type IconProps = { className?: string; size?: number }

export function IconHome({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
    </svg>
  )
}

export function IconCart({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <path d="M2 2h2l2.5 13h11l2-9H6" />
    </svg>
  )
}

export function IconUser({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )
}

export function IconSearch({ className = 'icon icon-sm' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </svg>
  )
}

export function IconPin({ className = 'icon icon-sm' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 21s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  )
}

export function IconBack({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export function IconHeart({ className = 'icon', filled }: IconProps & { filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M12 21s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  )
}

export function IconShare({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5" />
    </svg>
  )
}

export function IconPhone({ className = 'icon icon-sm' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M6 2h4l2 5-3 2a14 14 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 014 4a2 2 0 012-2z" />
    </svg>
  )
}

export function IconShield({ className = 'icon icon-sm' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function IconBolt({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" />
    </svg>
  )
}

export function CategoryIcon({ type }: { type: string }) {
  const cls = 'icon'
  switch (type) {
    case 'utensils':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M8 2v8a4 4 0 008 0V2h2v20H6V2h2z" />
        </svg>
      )
    case 'coffee':
      return (
        <svg className={cls} viewBox="0 0 24 24">
          <path d="M6 8h12v6a4 4 0 01-4 4H8a4 4 0 01-4-4V8z" />
          <path d="M18 10h2a2 2 0 010 4h-2M6 2v2M10 2v2M14 2v2" />
        </svg>
      )
    case 'pizza':
      return (
        <svg className={cls} viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
          <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
          <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'flame':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M12 2C9 6 6 8 6 12a6 6 0 1012 0c0-4-3-6-6-10z" />
        </svg>
      )
    case 'cake':
      return (
        <svg className={cls} viewBox="0 0 24 24">
          <path d="M4 14h16v6H4v-6zM6 10h12v4H6v-4zM8 6h8v4H8V6z" />
        </svg>
      )
    case 'cart':
      return <IconCart className={cls} />
    case 'fruit':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <circle cx="12" cy="14" r="6" />
          <path d="M12 4c0-2 2-4 4-2-1 3-4 4-4 2" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'pill':
      return (
        <svg className={cls} viewBox="0 0 24 24">
          <rect x="3" y="8" width="18" height="8" rx="4" />
          <path d="M12 8v8" />
        </svg>
      )
    default:
      return <IconHome className={cls} />
  }
}

export function IconWechat({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#07c160" stroke="none">
      <path d="M8.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 2C6.5 2 2 5.6 2 10c0 2.4 1.2 4.5 3.2 6L4 22l5.5-2.2c.8.1 1.6.2 2.5.2 5.5 0 10-3.6 10-8s-4.5-8-10-8z" />
    </svg>
  )
}

export function IconAlipay({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#1677ff" stroke="none">
      <path d="M4 4h16v16H4V4zm3 4h10v2H7V8zm0 4h7v2H7v-2z" />
    </svg>
  )
}

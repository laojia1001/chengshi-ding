export type PlaceholderKind = 'food' | 'shop' | 'banner' | 'drink' | 'avatar' | 'default'

const palettes: Record<PlaceholderKind, [string, string, string]> = {
  food: ['#fff3eb', '#ff6600', '#ff9a5c'],
  shop: ['#f0f4ff', '#4a6cf7', '#7b9fff'],
  banner: ['#fff0e6', '#e85d04', '#ff8c42'],
  drink: ['#e8f7ff', '#0099cc', '#5cc4e8'],
  avatar: ['#f5ebe0', '#8b4513', '#c45c26'],
  default: ['#f5f5f5', '#cccccc', '#999999'],
}

/** 本地 SVG 占位图，无外网依赖，避免图片加载失败 */
export function placeholderImage(kind: PlaceholderKind = 'default', label = ''): string {
  const [bg, accent, mid] = palettes[kind] ?? palettes.default
  const text = label.slice(0, 4) || (kind === 'food' ? '美食' : kind === 'shop' ? '店铺' : '')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="${mid}" opacity="0.35"/>
    </linearGradient></defs>
    <rect width="400" height="300" fill="url(#g)"/>
    <circle cx="200" cy="120" r="48" fill="${accent}" opacity="0.2"/>
    <circle cx="200" cy="120" r="32" fill="${accent}" opacity="0.45"/>
    ${text ? `<text x="200" y="210" text-anchor="middle" font-size="22" fill="${accent}" font-family="sans-serif">${text}</text>` : ''}
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

/** 若外链图失败则回退到占位图 */
export function resolveImageSrc(src: string | undefined, kind: PlaceholderKind, label?: string): string {
  if (!src || src.trim() === '') return placeholderImage(kind, label)
  return src
}

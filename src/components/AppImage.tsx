import { useEffect, useState } from 'react'
import { placeholderImage, type PlaceholderKind } from '../utils/placeholders'

type Props = {
  src?: string
  alt: string
  className?: string
  kind?: PlaceholderKind
  label?: string
}

export function AppImage({ src, alt, className = '', kind = 'default', label }: Props) {
  const fallback = placeholderImage(kind, label ?? alt)
  const validSrc = src?.trim() || ''
  const [imgSrc, setImgSrc] = useState(validSrc || fallback)
  const [failed, setFailed] = useState(!validSrc)

  useEffect(() => {
    if (validSrc) {
      setImgSrc(validSrc)
      setFailed(false)
    } else {
      setImgSrc(fallback)
      setFailed(true)
    }
  }, [validSrc, fallback])

  return (
    <span className={`app-image-wrap${failed ? ' fallback' : ' loaded'}`}>
      <img
        className={className}
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (!failed) {
            setFailed(true)
            setImgSrc(fallback)
          }
        }}
      />
    </span>
  )
}

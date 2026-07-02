'use client'

interface BlogCardImageProps {
  src: string | null
  alt: string
}

export default function BlogCardImage({ src, alt }: BlogCardImageProps) {
  if (!src) {
    return (
      <div style={{ width: '100%', height: '200px', background: '#0d1f3c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
        🏨
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
      onError={(e) => { e.currentTarget.style.display = 'none' }}
    />
  )
}

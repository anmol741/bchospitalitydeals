'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BlogCardImageProps {
  src: string | null
  alt: string
}

export default function BlogCardImage({ src, alt }: BlogCardImageProps) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return (
      <div style={{ width: '100%', height: '200px', background: '#0d1f3c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
        🏨
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
        onError={() => setErrored(true)}
      />
    </div>
  )
}

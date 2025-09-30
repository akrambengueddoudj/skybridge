'use client'

import Image from 'next/image'
import { Users } from 'lucide-react'
import { useState } from 'react'

export function TeamMemberImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className="w-full h-48 bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
        <Users className="w-16 h-16 text-white opacity-80" />
      </div>
    )
  }

  return (
    <div className="w-full h-48 relative">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  )
}
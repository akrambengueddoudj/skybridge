'use client'

import { CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SuccessMessageProps {
  message: string
  onClose: () => void
  duration?: number
}

export function SuccessMessage({ message, onClose, duration = 5000 }: SuccessMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for fade out
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-green-800 text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useMemo } from "react"

interface ColoredAvatarProps {
  name: string
  size?: number
  color?: string
  className?: string
}

export default function ColoredAvatar({ name, size = 150, color, className = "" }: ColoredAvatarProps) {
  // Generate a consistent color based on the name if no color provided
  const backgroundColor = useMemo(() => {
    if (color) return color

    const colors = ["#E50914", "#0077B5", "#6441A4", "#FF9900", "#1DB954", "#5865F2"]
    const colorIndex = name.length % colors.length
    return colors[colorIndex]
  }, [name, color])

  // Get the first letter of the name
  const initial = name.charAt(0).toUpperCase()

  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{
        backgroundColor,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <span className="text-white font-bold" style={{ fontSize: `${size / 2}px` }}>
        {initial}
      </span>
    </div>
  )
}

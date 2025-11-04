"use client"

import { useEffect, useRef } from "react"

interface ProfileImagesGeneratorProps {
  names: string[]
  colors: string[]
  size?: number
  outputPath?: string
}

export default function ProfileImagesGenerator({
  names,
  colors,
  size = 150,
  outputPath = "/images/profiles",
}: ProfileImagesGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Generate images for each profile
    names.forEach((name, index) => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size)

      // Set background color
      ctx.fillStyle = colors[index % colors.length]
      ctx.fillRect(0, 0, size, size)

      // Add text
      const initial = name.charAt(0).toUpperCase()
      ctx.fillStyle = "white"
      ctx.font = `bold ${size / 2}px Netflix Sans, Arial, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(initial, size / 2, size / 2)

      // Add a subtle pattern or design element
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 2

      // Different pattern for each profile
      switch (index % 5) {
        case 0: // Diagonal lines
          for (let i = 0; i < size; i += 15) {
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(i, 0)
            ctx.stroke()
          }
          break
        case 1: // Circles
          for (let i = size; i > 0; i -= 20) {
            ctx.beginPath()
            ctx.arc(size / 2, size / 2, i / 2, 0, Math.PI * 2)
            ctx.stroke()
          }
          break
        case 2: // Grid
          for (let i = 0; i < size; i += 15) {
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(size, i)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, size)
            ctx.stroke()
          }
          break
        case 3: // Dots
          for (let x = 10; x < size; x += 20) {
            for (let y = 10; y < size; y += 20) {
              ctx.beginPath()
              ctx.arc(x, y, 2, 0, Math.PI * 2)
              ctx.fill()
            }
          }
          break
        case 4: // Waves
          for (let y = 10; y < size; y += 20) {
            ctx.beginPath()
            for (let x = 0; x < size; x += 5) {
              ctx.lineTo(x, y + Math.sin(x / 10) * 5)
            }
            ctx.stroke()
          }
          break
      }

      // Log data URL for download
      console.log(`${name} profile image:`, canvas.toDataURL("image/png"))
    })
  }, [names, colors, size, outputPath])

  return (
    <div className="hidden">
      <canvas ref={canvasRef} width={size} height={size}></canvas>
      <div className="text-xs text-gray-500 mt-2">Profile images generated. Check console for data URLs.</div>
    </div>
  )
}

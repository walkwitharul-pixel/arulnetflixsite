"use client"

import { useEffect, useRef } from "react"

interface ProfileImageGeneratorProps {
  profileType: string
  size?: number
}

export default function ProfileImageGenerator({ profileType, size = 150 }: ProfileImageGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Set background color based on profile type
    const colors = {
      stalker: "#E50914", // Netflix red
      investor: "#0077B5", // LinkedIn blue
      recruiter: "#6441A4", // Twitch purple
      community: "#FF9900", // Amazon orange
      adventurer: "#1DB954", // Spotify green
    }

    const backgroundColor = colors[profileType.toLowerCase()] || "#E50914"

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, backgroundColor)
    gradient.addColorStop(1, adjustColor(backgroundColor, -30)) // Darker shade

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    // Add subtle pattern
    addPattern(ctx, size, backgroundColor)

    // Draw cute image based on profile type
    switch (profileType.toLowerCase()) {
      case "stalker":
        drawStalkerImage(ctx, size)
        break
      case "investor":
        drawInvestorImage(ctx, size)
        break
      case "recruiter":
        drawRecruiterImage(ctx, size)
        break
      case "community":
        drawCommunityImage(ctx, size)
        break
      case "adventurer":
        drawAdventurerImage(ctx, size)
        break
      default:
        drawDefaultImage(ctx, size, backgroundColor)
    }

    // Add glossy effect
    addGlossEffect(ctx, size)

    // Add subtle border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
    ctx.lineWidth = size * 0.02
    ctx.strokeRect(size * 0.02, size * 0.02, size * 0.96, size * 0.96)

    // Log data URL for download
    console.log(`${profileType} profile image:`, canvas.toDataURL("image/png"))
  }, [profileType, size])

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    const hex = color.replace("#", "")
    const r = Math.max(0, Math.min(255, Number.parseInt(hex.substring(0, 2), 16) + amount))
    const g = Math.max(0, Math.min(255, Number.parseInt(hex.substring(2, 4), 16) + amount))
    const b = Math.max(0, Math.min(255, Number.parseInt(hex.substring(4, 6), 16) + amount))
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }

  // Add subtle pattern to background
  const addPattern = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
    ctx.save()
    ctx.globalAlpha = 0.1
    ctx.fillStyle = "white"

    for (let i = 0; i < size; i += size / 15) {
      for (let j = 0; j < size; j += size / 15) {
        if (Math.random() > 0.85) {
          ctx.fillRect(i, j, size / 30, size / 30)
        }
      }
    }
    ctx.restore()
  }

  // Add glossy effect
  const addGlossEffect = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.save()

    // Create gradient for glossy effect
    const glossGradient = ctx.createLinearGradient(0, 0, 0, size)
    glossGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)")
    glossGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.1)")
    glossGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)")

    ctx.fillStyle = glossGradient
    ctx.fillRect(0, 0, size, size * 0.5)

    ctx.restore()
  }

  // Draw functions for each profile type
  const drawStalkerImage = (ctx: CanvasRenderingContext2D, size: number) => {
    // Draw binoculars icon with more detail
    ctx.fillStyle = "white"

    // Binocular body
    ctx.beginPath()
    ctx.ellipse(size * 0.35, size * 0.5, size * 0.18, size * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse(size * 0.65, size * 0.5, size * 0.18, size * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()

    // Bridge
    ctx.fillRect(size * 0.35, size * 0.4, size * 0.3, size * 0.1)

    // Lens details
    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.arc(size * 0.35, size * 0.5, size * 0.12, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(size * 0.65, size * 0.5, size * 0.12, 0, Math.PI * 2)
    ctx.fill()

    // Lens reflections
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.beginPath()
    ctx.arc(size * 0.32, size * 0.45, size * 0.04, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(size * 0.62, size * 0.45, size * 0.04, 0, Math.PI * 2)
    ctx.fill()

    // Straps
    ctx.strokeStyle = "white"
    ctx.lineWidth = size * 0.03
    ctx.beginPath()
    ctx.moveTo(size * 0.2, size * 0.3)
    ctx.lineTo(size * 0.3, size * 0.4)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(size * 0.8, size * 0.3)
    ctx.lineTo(size * 0.7, size * 0.4)
    ctx.stroke()
  }

  const drawInvestorImage = (ctx: CanvasRenderingContext2D, size: number) => {
    // Draw money/chart icon with more detail
    ctx.fillStyle = "white"

    // Money bag
    ctx.beginPath()
    ctx.arc(size * 0.5, size * 0.4, size * 0.25, 0, Math.PI, true)
    ctx.lineTo(size * 0.3, size * 0.7)
    ctx.quadraticCurveTo(size * 0.5, size * 0.8, size * 0.7, size * 0.7)
    ctx.lineTo(size * 0.75, size * 0.4)
    ctx.fill()

    // Dollar sign
    ctx.fillStyle = adjustColor("#0077B5", -50)
    ctx.font = `bold ${size * 0.3}px Arial`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("$", size * 0.5, size * 0.45)

    // Money bag tie
    ctx.strokeStyle = adjustColor("#0077B5", -50)
    ctx.lineWidth = size * 0.02
    ctx.beginPath()
    ctx.moveTo(size * 0.4, size * 0.4)
    ctx.lineTo(size * 0.6, size * 0.4)
    ctx.stroke()

    // Coins
    ctx.fillStyle = "gold"
    ctx.beginPath()
    ctx.arc(size * 0.3, size * 0.75, size * 0.08, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(size * 0.7, size * 0.75, size * 0.08, 0, Math.PI * 2)
    ctx.fill()

    // Coin details
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"
    ctx.lineWidth = size * 0.01
    ctx.beginPath()
    ctx.arc(size * 0.3, size * 0.75, size * 0.05, 0, Math.PI * 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(size * 0.7, size * 0.75, size * 0.05, 0, Math.PI * 2)
    ctx.stroke()
  }

  const drawRecruiterImage = (ctx: CanvasRenderingContext2D, size: number) => {
    // Draw professional person with briefcase
    ctx.fillStyle = "white"

    // Head
    ctx.beginPath()
    ctx.arc(size * 0.5, size * 0.3, size * 0.15, 0, Math.PI * 2)
    ctx.fill()

    // Body/suit
    ctx.beginPath()
    ctx.moveTo(size * 0.35, size * 0.45)
    ctx.lineTo(size * 0.35, size * 0.7)
    ctx.lineTo(size * 0.65, size * 0.7)
    ctx.lineTo(size * 0.65, size * 0.45)
    ctx.closePath()
    ctx.fill()

    // Neck
    ctx.fillRect(size * 0.45, size * 0.45, size * 0.1, size * 0.05)

    // Tie
    ctx.fillStyle = adjustColor("#6441A4", -50)
    ctx.beginPath()
    ctx.moveTo(size * 0.5, size * 0.45)
    ctx.lineTo(size * 0.45, size * 0.55)
    ctx.lineTo(size * 0.5, size * 0.7)
    ctx.lineTo(size * 0.55, size * 0.55)
    ctx.closePath()
    ctx.fill()

    // Briefcase
    ctx.fillStyle = "white"
    ctx.fillRect(size * 0.3, size * 0.75, size * 0.4, size * 0.15)

    // Briefcase handle
    ctx.fillRect(size * 0.45, size * 0.7, size * 0.1, size * 0.05)

    // Briefcase details
    ctx.strokeStyle = adjustColor("#6441A4", -50)
    ctx.lineWidth = size * 0.01
    ctx.strokeRect(size * 0.3, size * 0.75, size * 0.4, size * 0.15)
    ctx.beginPath()
    ctx.moveTo(size * 0.5, size * 0.75)
    ctx.lineTo(size * 0.5, size * 0.9)
    ctx.stroke()
  }

  const drawCommunityImage = (ctx: CanvasRenderingContext2D, size: number) => {
    // Draw people/group icon with more detail
    ctx.fillStyle = "white"

    // Center person
    // Head
    ctx.beginPath()
    ctx.arc(size * 0.5, size * 0.35, size * 0.12, 0, Math.PI * 2)
    ctx.fill()

    // Body
    ctx.beginPath()
    ctx.moveTo(size * 0.4, size * 0.7)
    ctx.lineTo(size * 0.6, size * 0.7)
    ctx.lineTo(size * 0.55, size * 0.47)
    ctx.lineTo(size * 0.45, size * 0.47)
    ctx.closePath()
    ctx.fill()

    // Left person
    // Head
    ctx.beginPath()
    ctx.arc(size * 0.25, size * 0.4, size * 0.1, 0, Math.PI * 2)
    ctx.fill()

    // Body
    ctx.beginPath()
    ctx.moveTo(size * 0.18, size * 0.7)
    ctx.lineTo(size * 0.32, size * 0.7)
    ctx.lineTo(size * 0.3, size * 0.5)
    ctx.lineTo(size * 0.2, size * 0.5)
    ctx.closePath()
    ctx.fill()

    // Right person
    // Head
    ctx.beginPath()
    ctx.arc(size * 0.75, size * 0.4, size * 0.1, 0, Math.PI * 2)
    ctx.fill()

    // Body
    ctx.beginPath()
    ctx.moveTo(size * 0.68, size * 0.7)
    ctx.lineTo(size * 0.82, size * 0.7)
    ctx.lineTo(size * 0.8, size * 0.5)
    ctx.lineTo(size * 0.7, size * 0.5)
    ctx.closePath()
    ctx.fill()

    // Connection lines
    ctx.strokeStyle = adjustColor("#FF9900", -50)
    ctx.lineWidth = size * 0.02
    ctx.beginPath()
    ctx.moveTo(size * 0.35, size * 0.35)
    ctx.lineTo(size * 0.45, size * 0.35)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(size * 0.55, size * 0.35)
    ctx.lineTo(size * 0.65, size * 0.35)
    ctx.stroke()
  }

  const drawAdventurerImage = (ctx: CanvasRenderingContext2D, size: number) => {
    // Draw compass/mountain icon with more detail
    ctx.fillStyle = "white"

    // Mountains
    ctx.beginPath()
    ctx.moveTo(size * 0.2, size * 0.7)
    ctx.lineTo(size * 0.4, size * 0.4)
    ctx.lineTo(size * 0.6, size * 0.7)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(size * 0.5, size * 0.7)
    ctx.lineTo(size * 0.7, size * 0.3)
    ctx.lineTo(size * 0.9, size * 0.7)
    ctx.closePath()
    ctx.fill()

    // Snow caps
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.beginPath()
    ctx.moveTo(size * 0.4, size * 0.4)
    ctx.lineTo(size * 0.35, size * 0.45)
    ctx.lineTo(size * 0.45, size * 0.45)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(size * 0.7, size * 0.3)
    ctx.lineTo(size * 0.65, size * 0.35)
    ctx.lineTo(size * 0.75, size * 0.35)
    ctx.closePath()
    ctx.fill()

    // Compass
    ctx.beginPath()
    ctx.arc(size * 0.25, size * 0.25, size * 0.15, 0, Math.PI * 2)
    ctx.fillStyle = adjustColor("#1DB954", -50)
    ctx.fill()
    ctx.strokeStyle = "white"
    ctx.lineWidth = size * 0.01
    ctx.stroke()

    // Compass needle
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.moveTo(size * 0.25, size * 0.15)
    ctx.lineTo(size * 0.2, size * 0.25)
    ctx.lineTo(size * 0.25, size * 0.35)
    ctx.lineTo(size * 0.3, size * 0.25)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.moveTo(size * 0.25, size * 0.15)
    ctx.lineTo(size * 0.3, size * 0.25)
    ctx.lineTo(size * 0.25, size * 0.35)
    ctx.closePath()
    ctx.fill()

    // Compass center
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(size * 0.25, size * 0.25, size * 0.03, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawDefaultImage = (ctx: CanvasRenderingContext2D, size: number, backgroundColor: string) => {
    // Draw a simple smiley face
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(size * 0.5, size * 0.5, size * 0.3, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = backgroundColor
    // Eyes
    ctx.beginPath()
    ctx.arc(size * 0.35, size * 0.4, size * 0.05, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(size * 0.65, size * 0.4, size * 0.05, 0, Math.PI * 2)
    ctx.fill()

    // Smile
    ctx.beginPath()
    ctx.arc(size * 0.5, size * 0.5, size * 0.2, 0, Math.PI)
    ctx.lineWidth = size * 0.03
    ctx.strokeStyle = backgroundColor
    ctx.stroke()
  }

  return (
    <div className="hidden">
      <canvas ref={canvasRef} width={size} height={size}></canvas>
      <div className="text-xs text-gray-500 mt-2">Profile image generated. Check console for data URL.</div>
    </div>
  )
}

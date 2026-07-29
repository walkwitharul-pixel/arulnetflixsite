"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import ImagePreloader from "@/components/image-preloader"
import { useImagePreloader } from "@/components/image-preload-provider"
import AnimatedName from "@/components/animated-name"

export default function Home() {
  const router = useRouter()
  const { preloadImages } = useImagePreloader()
  const hasPreloaded = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const navigatedRef = useRef(false)

  const goToBrowse = () => {
    if (navigatedRef.current) return
    navigatedRef.current = true
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    router.push("/browse")
  }

  useEffect(() => {
    audioRef.current = new Audio("/sounds/netflix-intro.mp3")
    audioRef.current.volume = 0.5

    if (!hasPreloaded.current) {
      preloadImages([
        "/images/profiles/stalker.svg",
        "/images/profiles/investor.svg",
        "/images/profiles/recruiter.svg",
        "/images/profiles/community.svg",
        "/images/profiles/adventurer.svg",
      ])
      hasPreloaded.current = true
    }

    const playTimer = window.setTimeout(() => {
      audioRef.current?.play().catch(() => {})
    }, 500)

    // Safety redirect if animation callback never fires
    const fallbackTimer = window.setTimeout(goToBrowse, 9000)

    return () => {
      window.clearTimeout(playTimer)
      window.clearTimeout(fallbackTimer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, preloadImages])

  const additionalImages = ["/images/logos/velantec-logo.png"]

  return (
    <div className="netflix-container relative flex items-center justify-center h-screen bg-black overflow-hidden">
      <ImagePreloader additionalImages={additionalImages} />

      <div className="animated-name-wrapper">
        <AnimatedName name="Arul Murugan" onAnimationComplete={goToBrowse} />
      </div>
    </div>
  )
}

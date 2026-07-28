"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import ImagePreloader from "@/components/image-preloader"
import { useImagePreloader } from "@/components/image-preload-provider"
import AnimatedName from "@/components/animated-name"

export default function Home() {
  const [animate, setAnimate] = useState(false)
  const router = useRouter()
  const { preloadImages } = useImagePreloader()
  const hasPreloaded = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const skipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const preloadImagesRef = useRef(preloadImages)
  preloadImagesRef.current = preloadImages

  const skipToBrowse = (immediate = false) => {
    if (skipTimerRef.current) {
      clearTimeout(skipTimerRef.current)
      skipTimerRef.current = null
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (immediate) {
      router.push("/browse")
      return
    }
    setAnimate(true)
    skipTimerRef.current = setTimeout(() => {
      router.push("/browse")
    }, 800)
  }

  useEffect(() => {
    let cancelled = false
    let playTimer: ReturnType<typeof setTimeout> | null = null
    const redirectTimer = setTimeout(() => {
      if (!cancelled) skipToBrowse(false)
    }, 7200)

    // Only play intro audio when the asset exists
    fetch("/sounds/netflix-intro.mp3", { method: "HEAD" })
      .then((res) => {
        if (cancelled || !res.ok) return
        const audio = new Audio("/sounds/netflix-intro.mp3")
        audio.volume = 0.5
        audioRef.current = audio
        playTimer = setTimeout(() => {
          if (cancelled || !audioRef.current) return
          audioRef.current.play().catch(() => {})
        }, 500)
      })
      .catch(() => {})

    if (!hasPreloaded.current) {
      preloadImagesRef.current([
        "/images/profiles/stalker.svg",
        "/images/profiles/investor.svg",
        "/images/profiles/recruiter.svg",
        "/images/profiles/community.svg",
        "/images/profiles/adventurer.svg",
      ])
      hasPreloaded.current = true
    }

    return () => {
      cancelled = true
      clearTimeout(redirectTimer)
      if (playTimer) clearTimeout(playTimer)
      if (skipTimerRef.current) clearTimeout(skipTimerRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const additionalImages = ["/images/logos/velantec-logo.png"]

  return (
    <div
      className="netflix-container relative flex items-center justify-center h-screen bg-black overflow-hidden"
      onClick={() => skipToBrowse(true)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          skipToBrowse(true)
        }}
        className="absolute top-6 right-6 z-20 px-5 py-2 text-sm font-medium text-white border border-white/80 rounded-[2px] hover:bg-white/10 transition-colors"
      >
        Skip Intro
      </button>

      <ImagePreloader additionalImages={additionalImages} />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: animate ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="animated-name-wrapper"
      >
        <AnimatedName name="Arul Murugan" onAnimationComplete={() => {}} />
      </motion.div>
    </div>
  )
}

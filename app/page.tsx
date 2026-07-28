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

  const skipToBrowse = (immediate = false) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (immediate) {
      router.push("/browse")
      return
    }
    setAnimate(true)
    setTimeout(() => {
      router.push("/browse")
    }, 800)
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

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {})
      }
    }, 500)

    const redirectTimer = setTimeout(() => {
      skipToBrowse(false)
    }, 7200)

    return () => {
      clearTimeout(redirectTimer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, preloadImages])

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
        <AnimatedName
          name="Arul Murugan"
          onAnimationComplete={() => {
            // Animation complete callback
          }}
        />
      </motion.div>
    </div>
  )
}

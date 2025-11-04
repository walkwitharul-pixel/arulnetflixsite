"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import ImagePreloader from "@/components/image-preloader"
import { useImagePreloader } from "@/components/image-preload-provider"

export default function Home() {
  const [animate, setAnimate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { preloadImages } = useImagePreloader()
  const hasPreloaded = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/sounds/netflix-intro.mp3")
    audioRef.current.volume = 0.5

    // Prevent duplicate preloading
    if (!hasPreloaded.current) {
      // Preload profile images for the browse page
      preloadImages([
        "/images/profiles/stalker.png",
        "/images/profiles/investor.png",
        "/images/profiles/recruiter.png",
        "/images/profiles/community.png",
        "/images/profiles/adventurer.png",
      ])
      hasPreloaded.current = true
    }

    // Show loading animation
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)

      // Play sound after loading
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log("Audio playback prevented by browser:", err)
        })
      }

      // Animate logo and redirect
      const redirectTimer = setTimeout(() => {
        setAnimate(true)
        setTimeout(() => {
          router.push("/browse")
        }, 2000)
      }, 1500)

      return () => clearTimeout(redirectTimer)
    }, 2500)

    return () => {
      clearTimeout(loadingTimer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [router, preloadImages])

  // Define additional images only once to avoid re-renders
  const additionalImages = ["/images/logos/velantec-logo.png"]

  if (isLoading) {
    return (
      <div className="netflix-loader">
        <div className="netflix-loader-logo">
          <div className="netflix-loader-bar"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="netflix-container flex items-center justify-center h-screen bg-black overflow-hidden"
      onClick={() => {
        setAnimate(true)
        setTimeout(() => {
          router.push("/browse")
        }, 2000)
      }}
    >
      {/* Add preloader for critical images */}
      <ImagePreloader additionalImages={additionalImages} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`netflix-logo ${animate ? "animate" : ""}`}
      >
        <div className="netflix-a-logo">
          <div className="netflix-a-left"></div>
          <div className="netflix-a-right"></div>
          <div className="netflix-a-bar"></div>
        </div>
      </motion.div>
    </div>
  )
}

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

    // Play sound after a short delay
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log("Audio playback prevented by browser:", err)
        })
      }
    }, 500)

    // Animate name and redirect
    // Typing (~1.3s for 13 chars) + pause (0.5s) + color change + fade (2s) = ~3.8s total
    const redirectTimer = setTimeout(() => {
      setAnimate(true)
      setTimeout(() => {
        router.push("/browse")
      }, 1500)
    }, 3800) // Wait for complete animation sequence

    return () => {
      clearTimeout(redirectTimer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [router, preloadImages])

  // Define additional images only once to avoid re-renders
  const additionalImages = ["/images/logos/velantec-logo.png"]

  return (
    <div
      className="netflix-container flex items-center justify-center h-screen bg-black overflow-hidden"
      onClick={() => {
        setAnimate(true)
        setTimeout(() => {
          router.push("/browse")
        }, 1500)
      }}
    >
      {/* Add preloader for critical images */}
      <ImagePreloader additionalImages={additionalImages} />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: animate ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="animated-name-wrapper"
      >
        <AnimatedName
          key="animated-name"
          name="Arul Murugan"
          onAnimationComplete={() => {
            // Animation complete callback
          }}
        />
      </motion.div>
    </div>
  )
}

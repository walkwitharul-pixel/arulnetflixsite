"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Volume1 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SoundPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/sounds/netflix-intro.mp3")
    audioRef.current.volume = volume

    // Add event listeners
    if (audioRef.current) {
      audioRef.current.addEventListener("play", () => setIsPlaying(true))
      audioRef.current.addEventListener("pause", () => setIsPlaying(false))
      audioRef.current.addEventListener("ended", () => setIsPlaying(false))
    }

    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("play", () => setIsPlaying(true))
        audioRef.current.removeEventListener("pause", () => setIsPlaying(false))
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false))
        audioRef.current = null
      }
    }
  }, [])

  // Try to play sound automatically when page loads
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        try {
          // Try to play automatically
          await audioRef.current.play()
          setIsMuted(false)
          console.log("Autoplay successful")
        } catch (err) {
          // Autoplay failed, will need user interaction
          console.log("Autoplay prevented by browser:", err)
        }
      }
    }

    attemptAutoplay()
  }, [])

  // Play sound when user interacts with the page
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true)
        if (isMuted) {
          // Don't play if user has muted
          return
        }

        audioRef.current.play().catch((err) => {
          console.log("Audio playback prevented by browser:", err)
        })
      }
    }

    window.addEventListener("click", handleInteraction)

    return () => {
      window.removeEventListener("click", handleInteraction)
    }
  }, [hasInteracted, isMuted])

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false
        if (!isPlaying && hasInteracted) {
          audioRef.current.currentTime = 0 // Restart from beginning
          audioRef.current.play().catch((err) => {
            console.log("Audio playback prevented by browser:", err)
          })
        }
      } else {
        audioRef.current.muted = true
        // Don't pause, just mute
      }
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const getVolumeIcon = () => {
    if (isMuted) return <VolumeX size={20} />
    if (volume < 0.5) return <Volume1 size={20} />
    return <Volume2 size={20} />
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center">
      <AnimatePresence>
        {showVolumeControl && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="mr-2 bg-black/50 rounded-full overflow-hidden p-2"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 md:w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              aria-label="Volume control"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMute}
        onMouseEnter={() => setShowVolumeControl(true)}
        onMouseLeave={() => setShowVolumeControl(false)}
        className="bg-black/50 p-2 rounded-full text-white hover:bg-netflix-red transition-colors"
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {getVolumeIcon()}
      </motion.button>
    </div>
  )
}

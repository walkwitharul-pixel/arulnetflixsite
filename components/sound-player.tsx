"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Volume1 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SoundPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [available, setAvailable] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  useEffect(() => {
    let cancelled = false
    const audio = new Audio()
    audio.preload = "none"
    audio.volume = volume

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)

    // Only enable UI if the intro sound actually exists
    fetch("/sounds/netflix-intro.mp3", { method: "HEAD" })
      .then((res) => {
        if (cancelled) return
        if (res.ok) {
          audio.src = "/sounds/netflix-intro.mp3"
          audio.addEventListener("play", onPlay)
          audio.addEventListener("pause", onPause)
          audio.addEventListener("ended", onEnded)
          audioRef.current = audio
          setAvailable(true)
        }
      })
      .catch(() => {
        // Missing sound is fine — keep UI hidden
      })

    return () => {
      cancelled = true
      audio.pause()
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audio.removeEventListener("ended", onEnded)
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  if (!available) return null

  const toggleMute = () => {
    if (!audioRef.current) return
    if (isMuted) {
      audioRef.current.muted = false
      if (!isPlaying) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
      }
    } else {
      audioRef.current.muted = true
    }
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) audioRef.current.volume = newVolume
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
        className="bg-black/50 p-2 rounded-full text-white hover:bg-[#E50914] transition-colors"
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        {getVolumeIcon()}
      </motion.button>
    </div>
  )
}

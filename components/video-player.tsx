"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import ResponsiveImage from "./responsive-image"
import { useImagePreloader } from "./image-preload-provider"

interface VideoPlayerProps {
  videoId: string
  thumbnailUrl?: string
  preload?: boolean
}

export default function VideoPlayer({
  videoId,
  thumbnailUrl = "/placeholder.svg?height=360&width=640&text=Video+Thumbnail",
  preload = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { preloadImages } = useImagePreloader()

  // Preload thumbnail if needed
  useEffect(() => {
    if (preload && thumbnailUrl) {
      preloadImages([thumbnailUrl])
    }
  }, [preload, thumbnailUrl, preloadImages])

  // Handle controls visibility
  useEffect(() => {
    if (isPlaying) {
      const hideControls = () => setShowControls(false)
      controlsTimeoutRef.current = setTimeout(hideControls, 3000)

      return () => {
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current)
        }
      }
    }
  }, [isPlaying, showControls])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    setShowThumbnail(false)

    if (isPlaying) {
      // Pause video logic would go here
      // For YouTube, we would use the postMessage API
    } else {
      // Play video logic would go here
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    // YouTube iframe API would be used here to mute/unmute
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * duration
    setCurrentTime(newTime)
    // YouTube iframe API would be used here to seek
  }

  const handleMouseMove = () => {
    if (isPlaying) {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // For demo purposes, set a fixed duration
  useEffect(() => {
    setDuration(180) // 3 minutes

    // Simulate video loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="netflix-video-player relative w-full aspect-video bg-black rounded-md overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {showThumbnail ? (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <ResponsiveImage
            src={thumbnailUrl}
            alt={`Thumbnail for video ${videoId}`}
            fill
            className="object-cover opacity-80"
            priority={preload}
            fallbackColor="bg-gray-900"
          />
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Play video"
          >
            <div className="netflix-play-button">
              <Play size={40} className="text-white" />
            </div>
          </button>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <iframe
            ref={videoRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&enablejsapi=1`}
            title="Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={`absolute inset-0 w-full h-full ${isLoaded ? "opacity-100" : "opacity-0"}`}
            aria-label="YouTube video player"
          ></iframe>

          {/* Custom video controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="netflix-video-progress h-1.5 bg-gray-700 rounded-full mb-4 cursor-pointer"
              onClick={handleSeek}
              role="slider"
              aria-label="Video progress"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
            >
              <div
                className="h-full bg-netflix-red rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center">
              <button
                className="text-white hover:text-netflix-red transition-colors mr-4"
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                className="text-white hover:text-netflix-red transition-colors mr-4"
                onClick={handleMuteToggle}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <button className="text-white hover:text-netflix-red transition-colors ml-auto" aria-label="Full screen">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

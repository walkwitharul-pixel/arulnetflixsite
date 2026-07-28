"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from "lucide-react"
import Image from "next/image"

interface VideoPlayerProps {
  /** Local path e.g. /videos/intro.mp4 OR empty to skip file */
  src?: string
  /** YouTube video id (optional fallback / primary) */
  youtubeId?: string
  thumbnailUrl?: string
  title?: string
  preload?: boolean
}

function isProbablyYoutube(id?: string) {
  return Boolean(id && /^[\w-]{6,}$/.test(id))
}

export default function VideoPlayer({
  src,
  youtubeId,
  thumbnailUrl = "/images/stock/arul-hero.svg",
  title = "Video",
  preload = false,
}: VideoPlayerProps) {
  const [mode, setMode] = useState<"idle" | "file" | "youtube" | "missing">("idle")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startPlayback = () => {
    if (src) {
      const probe = document.createElement("video")
      probe.preload = "metadata"
      probe.src = src
      const onOk = () => {
        cleanup()
        setShouldAutoPlay(true)
        setMode("file")
        setIsPlaying(true)
      }
      const onFail = () => {
        cleanup()
        if (isProbablyYoutube(youtubeId)) {
          setMode("youtube")
          setIsPlaying(true)
        } else {
          setMode("missing")
        }
      }
      const cleanup = () => {
        probe.removeEventListener("loadeddata", onOk)
        probe.removeEventListener("error", onFail)
      }
      probe.addEventListener("loadeddata", onOk)
      probe.addEventListener("error", onFail)
      return
    }
    if (isProbablyYoutube(youtubeId)) {
      setMode("youtube")
      setIsPlaying(true)
      return
    }
    setMode("missing")
  }

  useEffect(() => {
    const el = videoRef.current
    if (!el || mode !== "file") return

    if (shouldAutoPlay) {
      el.play().catch(() => setIsPlaying(false))
      setShouldAutoPlay(false)
    }

    const onTime = () => {
      setProgress(el.currentTime)
      setDuration(el.duration || 0)
    }
    el.addEventListener("timeupdate", onTime)
    el.addEventListener("loadedmetadata", onTime)
    return () => {
      el.removeEventListener("timeupdate", onTime)
      el.removeEventListener("loadedmetadata", onTime)
    }
  }, [mode, shouldAutoPlay])

  const formatTime = (t: number) => {
    if (!Number.isFinite(t)) return "0:00"
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play()
      setIsPlaying(true)
    } else {
      el.pause()
      setIsPlaying(false)
    }
  }

  if (mode === "idle") {
    return (
      <div className="relative w-full aspect-video bg-black rounded-[2px] overflow-hidden">
        <Image src={thumbnailUrl} alt="" fill className="object-cover opacity-80" sizes="100vw" priority={preload} />
        <div className="absolute inset-0 bg-black/40" />
        <button
          type="button"
          onClick={startPlayback}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-nf-text"
          aria-label={`Play ${title}`}
        >
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg">
            <Play className="fill-black ml-1" size={28} strokeWidth={0} />
          </span>
          <span className="text-sm text-nf-text/90">{title}</span>
        </button>
      </div>
    )
  }

  if (mode === "missing") {
    return (
      <div className="relative w-full aspect-video bg-nf-elevated rounded-[2px] overflow-hidden border border-dashed border-white/20 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <Film className="text-[#E50914]" size={36} />
        <p className="text-nf-text font-semibold">Add your video here</p>
        <p className="text-nf-muted text-sm max-w-md">
          Drop an MP4 at <code className="text-nf-text/90">{src || "/videos/your-video.mp4"}</code>
          {youtubeId ? " or set a YouTube ID in personal-data." : " — see public/videos/README.md"}
        </p>
        <button type="button" onClick={() => setMode("idle")} className="text-sm text-[#E50914] hover:underline">
          Back
        </button>
      </div>
    )
  }

  if (mode === "youtube" && youtubeId) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-[2px] overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-[2px] overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-contain"
        playsInline
        muted={isMuted}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <div className="h-1 bg-white/20 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-[#E50914]"
            style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
          />
        </div>
        <div className="flex items-center gap-3 text-nf-text">
          <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-white" />}
          </button>
          <button type="button" onClick={() => setIsMuted((m) => !m)} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <span className="text-xs text-nf-text/80">
            {formatTime(progress)} / {formatTime(duration)}
          </span>
          <button
            type="button"
            className="ml-auto"
            aria-label="Fullscreen"
            onClick={() => videoRef.current?.requestFullscreen?.()}
          >
            <Maximize size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

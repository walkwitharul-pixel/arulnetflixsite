"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Clock, X } from "lucide-react"
import Image from "next/image"
import VideoPlayer from "./video-player"

export interface GalleryVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  src?: string
  youtubeId?: string
  /** @deprecated use youtubeId */
  videoId?: string
}

interface VideoGalleryProps {
  videos: GalleryVideo[]
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [selected, setSelected] = useState<GalleryVideo | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {videos.map((video, index) => (
          <motion.button
            key={video.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
            className="text-left bg-nf-elevated rounded-[2px] overflow-hidden group"
            onClick={() => setSelected(video)}
          >
            <div className="relative aspect-video">
              <Image src={video.thumbnail} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                  <Play className="fill-black ml-0.5" size={18} strokeWidth={0} />
                </span>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/75 text-nf-text text-[0.65rem] px-1.5 py-0.5 rounded-[2px] inline-flex items-center gap-1">
                <Clock size={10} />
                {video.duration}
              </span>
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-nf-text font-semibold text-sm sm:text-base mb-1">{video.title}</h3>
              <p className="text-nf-dim text-xs sm:text-sm line-clamp-2">{video.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[1100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal
          aria-label={selected.title}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-nf-text hover:text-[#E50914]"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <h2 className="text-nf-text text-lg sm:text-xl font-bold mb-3">{selected.title}</h2>
            <VideoPlayer
              src={selected.src}
              youtubeId={selected.youtubeId || selected.videoId}
              thumbnailUrl={selected.thumbnail}
              title={selected.title}
              preload
            />
            <p className="text-nf-muted mt-3 text-sm">{selected.description}</p>
          </div>
        </div>
      )}
    </>
  )
}

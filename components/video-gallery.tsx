"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Clock, X } from "lucide-react"
import VideoPlayer from "./video-player"
import ResponsiveImage from "./responsive-image"

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoId: string
  duration: string
}

interface VideoGalleryProps {
  videos: Video[]
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-netflix-dark rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative aspect-video">
              <ResponsiveImage
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                fill
                className="object-cover"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-netflix-red flex items-center justify-center">
                  <Play className="text-white h-6 w-6" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold mb-1">{video.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-netflix-red"
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>
            <h2 className="text-white text-xl font-bold mb-4">{selectedVideo.title}</h2>
            <VideoPlayer videoId={selectedVideo.videoId} preload={true} />
            <p className="text-gray-300 mt-4">{selectedVideo.description}</p>
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Info } from "lucide-react"
import Link from "next/link"
import VideoPlayer from "./video-player"
import { useImagePreloader } from "./image-preload-provider"

export default function ProfileBanner() {
  const [showVideo, setShowVideo] = useState(false)
  const { preloadImages } = useImagePreloader()

  // Use a local placeholder instead of trying to preload external images
  useEffect(() => {
    // No need to preload external images that might fail
  }, [preloadImages])

  return (
    <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col justify-end h-full pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Arul Murugan</h1>
        <div className="flex flex-wrap items-center mb-2">
          <span className="text-netflix-red font-medium mr-2">Entrepreneur</span>
          <span className="text-gray-400 mx-2" aria-hidden="true">
            •
          </span>
          <span className="text-white mr-2">Founder</span>
          <span className="text-gray-400 mx-2" aria-hidden="true">
            •
          </span>
          <span className="text-white">CEO</span>
        </div>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Multi-venture founder and tech entrepreneur with a passion for AI, cybersecurity, e-commerce, and community
          building. Based in Singapore.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowVideo(true)}
            className="bg-netflix-red hover:bg-netflix-red/80 text-white transition-colors px-6 py-2 rounded-md flex items-center gap-2 font-medium"
            aria-label="Watch introduction video"
          >
            <Play size={20} />
            Watch Intro
          </button>
          <Link
            href="/projects"
            className="bg-gray-600/70 hover:bg-gray-700 text-white transition-colors px-6 py-2 rounded-md flex items-center gap-2 font-medium"
            aria-label="View all projects"
          >
            <Info size={20} />
            View Ventures
          </Link>
        </div>
      </motion.div>

      {showVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-title"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-netflix-red"
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 id="video-title" className="sr-only">
              Introduction Video
            </h2>
            <VideoPlayer videoId="dQw4w9WgXcQ" preload={true} />
          </div>
        </div>
      )}
    </div>
  )
}

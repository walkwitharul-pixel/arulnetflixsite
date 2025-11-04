"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Info } from "lucide-react"
import Image from "next/image"

interface NetflixHeroProps {
  title: string
  description?: string
  backgroundImage?: string
  overlayText?: string
  rating?: string
  genres?: string[]
}

export default function NetflixHero({
  title,
  description,
  backgroundImage,
  overlayText,
  rating = "PG",
  genres = [],
}: NetflixHeroProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black" />
        )}
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto px-4 md:px-8 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl"
          >
            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl text-white mb-6 max-w-xl drop-shadow-lg">
                {description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <motion.button
                className="bg-white text-black px-8 py-3 rounded-md flex items-center gap-2 font-semibold text-lg hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} fill="currentColor" />
                Play
              </motion.button>
              <motion.button
                className="bg-gray-600/70 text-white px-8 py-3 rounded-md flex items-center gap-2 font-semibold text-lg hover:bg-gray-600/90 transition-colors backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Info size={24} />
                More Info
              </motion.button>
            </div>

            {/* Overlay Text (if provided) */}
            {overlayText && (
              <motion.p
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {overlayText}
              </motion.p>
            )}

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className="text-gray-300 text-sm md:text-base px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Right Icons */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 flex items-center gap-4">
          {/* Audio Control */}
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-black/70 transition-colors">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6.343 6.343l11.314 11.314M9 12a3 3 0 106 0 3 3 0 00-6 0z"
              />
            </svg>
          </div>
          {/* Rating */}
          <div className="bg-black/50 backdrop-blur-sm rounded px-3 py-1 border border-white/30">
            <span className="text-white text-sm font-medium">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}


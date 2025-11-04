"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Info } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  title: string
  description?: string
  backgroundImage?: string
  overlayText?: string
  rating?: string
  genres?: string[]
}

export default function HeroSection({
  title,
  description,
  backgroundImage,
  overlayText,
  rating = "PG",
  genres = [],
}: HeroSectionProps) {
  const [isHovered, setIsHovered] = useState(false)

  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative w-full h-[90vh] min-h-[800px] overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && !imageError ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover object-center"
            priority
            quality={95}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.15),transparent)]" />
          </div>
        )}
        {/* Netflix-style gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-16 md:pb-24 lg:pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-5xl"
          >
            {/* Title - Netflix-style large and bold */}
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] leading-[1.1] tracking-tight">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 max-w-3xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] leading-relaxed font-light">
                {description}
              </p>
            )}

            {/* Action Buttons - Netflix-style */}
            <div className="flex flex-wrap gap-4 mb-8 items-center">
              <motion.button
                className="bg-white text-black px-8 md:px-12 py-3 md:py-4 rounded-md flex items-center gap-3 font-bold text-lg hover:bg-gray-200 transition-all duration-200 shadow-2xl hover:shadow-white/50 min-w-[160px] justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={28} fill="currentColor" />
                <span>Play</span>
              </motion.button>
              <motion.button
                className="bg-gray-600/70 text-white px-8 md:px-12 py-3 md:py-4 rounded-md flex items-center gap-3 font-semibold text-lg hover:bg-gray-600/90 transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl min-w-[160px] justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Info size={28} />
                <span>More Info</span>
              </motion.button>
            </div>

            {/* Genres - Netflix-style */}
            {genres.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {genres.map((genre, index) => (
                  <motion.span
                    key={index}
                    className="text-gray-300 text-base md:text-lg font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    {genre}
                    {index < genres.length - 1 && <span className="mx-2 text-gray-500">•</span>}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Right Rating - Netflix-style */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
          <div className="bg-black/70 backdrop-blur-sm rounded border border-white/40 px-4 py-2 shadow-2xl">
            <span className="text-white text-sm font-semibold">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}


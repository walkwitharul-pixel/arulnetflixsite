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

  return (
    <div className="relative w-full h-[85vh] min-h-[700px] overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
            quality={95}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black" />
        )}
        {/* Enhanced Gradient Overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 pb-20 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-4xl"
          >
            {/* Title - Enhanced Styling with proper alignment */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-[1.1] tracking-tight">
              {title}
            </h1>

            {/* Description - Enhanced with proper alignment */}
            {description && (
              <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-2xl drop-shadow-lg leading-relaxed">
                {description}
              </p>
            )}

            {/* Action Buttons - Enhanced with proper alignment */}
            <div className="flex flex-wrap gap-4 mb-8 items-center">
              <motion.button
                className="bg-white text-black px-8 md:px-10 py-3 md:py-4 rounded-md flex items-center gap-2 md:gap-3 font-bold text-base md:text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl min-w-[140px] justify-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={24} className="md:w-7 md:h-7" fill="currentColor" />
                <span>Play</span>
              </motion.button>
              <motion.button
                className="bg-gray-600/80 text-white px-8 md:px-10 py-3 md:py-4 rounded-md flex items-center gap-2 md:gap-3 font-semibold text-base md:text-lg hover:bg-gray-600 transition-all duration-200 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl min-w-[140px] justify-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Info size={24} className="md:w-7 md:h-7" />
                <span>More Info</span>
              </motion.button>
            </div>

            {/* Overlay Text - Enhanced with proper alignment */}
            {overlayText && (
              <motion.p
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-tight max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {overlayText}
              </motion.p>
            )}

            {/* Genres - Enhanced */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {genres.map((genre, index) => (
                  <motion.span
                    key={index}
                    className="text-gray-200 text-sm md:text-base px-4 py-2 bg-white/15 rounded-full backdrop-blur-md border border-white/20 font-medium"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    {genre}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Right Icons - Enhanced */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex items-center gap-4">
          {/* Audio Control */}
          <motion.div
            className="bg-black/60 backdrop-blur-md rounded-full p-3 cursor-pointer hover:bg-black/80 transition-all duration-200 border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-7 h-7 text-white"
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
          </motion.div>
          {/* Rating */}
          <div className="bg-black/60 backdrop-blur-md rounded px-4 py-2 border border-white/30 shadow-lg">
            <span className="text-white text-sm font-semibold">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}


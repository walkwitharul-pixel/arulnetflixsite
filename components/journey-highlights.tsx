"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import NetflixButton from "./netflix-button"
import ResponsiveImage from "./responsive-image"

interface Highlight {
  id: string
  title: string
  date: string
  description: string
  image: string
  type: "work" | "education" | "project"
  timelineId: string
}

interface JourneyHighlightsProps {
  highlights: Highlight[]
  onHighlightClick: (timelineId: string) => void
}

export default function JourneyHighlights({ highlights, onHighlightClick }: JourneyHighlightsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageError, setImageError] = useState<Record<string, boolean>>({})

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? highlights.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === highlights.length - 1 ? 0 : prev + 1))
  }

  const handleImageError = (id: string) => {
    setImageError((prev) => ({ ...prev, [id]: true }))
  }

  const currentHighlight = highlights[currentIndex]

  return (
    <div className="relative h-[60vh] overflow-hidden mb-12">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <ResponsiveImage
          src={currentHighlight.image || `/placeholder.svg?height=600&width=1200&text=${currentHighlight.title}`}
          alt={currentHighlight.title}
          fill
          className="object-cover transition-all duration-700 ease-in-out"
          sizes="100vw"
          priority
          fallbackText={`${currentHighlight.title} image`}
          fallbackColor="bg-gray-900"
          showErrorIcon={false}
          containerClassName="w-full h-full"
          onError={() => handleImageError(currentHighlight.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
        aria-label="Previous highlight"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
        aria-label="Next highlight"
      >
        <ChevronRight size={24} />
      </button>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-end pb-16">
        <motion.div
          key={currentHighlight.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span
            className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4 ${
              currentHighlight.type === "work"
                ? "bg-netflix-red"
                : currentHighlight.type === "education"
                  ? "bg-blue-600"
                  : "bg-green-600"
            }`}
          >
            {currentHighlight.type.charAt(0).toUpperCase() + currentHighlight.type.slice(1)}
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{currentHighlight.title}</h2>
          <p className="text-netflix-red font-medium mb-4">{currentHighlight.date}</p>
          <p className="text-lg text-gray-300 mb-6">{currentHighlight.description}</p>

          <NetflixButton onClick={() => onHighlightClick(currentHighlight.timelineId)} variant="primary" size="lg">
            View in Timeline
          </NetflixButton>
        </motion.div>

        {/* Pagination indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {highlights.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-netflix-red" : "bg-gray-600"
              }`}
              aria-label={`Go to highlight ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

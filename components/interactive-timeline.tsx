"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import ResponsiveImage from "./responsive-image"

interface TimelineItem {
  id: string
  title: string
  date: string
  description: string
  image: string
  type: "work" | "education" | "project"
}

interface InteractiveTimelineProps {
  items: TimelineItem[]
  title: string
}

export default function InteractiveTimeline({ items, title }: InteractiveTimelineProps) {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const timelineRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (timelineRef.current) {
      const scrollAmount = 350
      if (direction === "left") {
        timelineRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        timelineRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  const handleImageError = (itemId: string) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }))
  }

  useEffect(() => {
    if (items.length > 0 && !selectedItem) {
      setSelectedItem(items[0])
    }
  }, [items, selectedItem])

  return (
    <div className="py-12 bg-netflix-black">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{title}</h2>

        <div className="relative">
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
            aria-label="Scroll timeline left"
          >
            <FaArrowLeft />
          </button>

          <div className="timeline-container" ref={timelineRef}>
            <div className="timeline-line"></div>
            <div className="timeline flex space-x-8 pb-4 overflow-x-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`timeline-item flex-shrink-0 w-[280px] cursor-pointer ${selectedItem?.id === item.id ? "selected" : ""}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-item-content bg-netflix-dark rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                    <div className="relative h-40 w-full">
                      <ResponsiveImage
                        src={
                          item.image || `/placeholder.svg?height=160&width=280&text=${encodeURIComponent(item.title)}`
                        }
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                        fallbackText={`${item.title} image`}
                        fallbackColor="bg-gray-800"
                        showErrorIcon={false}
                        onError={() => handleImageError(item.id)}
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="timeline-item-title text-white font-bold text-lg">{item.title}</h3>
                      <p className="timeline-item-date text-netflix-red text-sm font-medium">{item.date}</p>
                      <p className="timeline-item-description text-gray-300 text-sm mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
            aria-label="Scroll timeline right"
          >
            <FaArrowRight />
          </button>
        </div>

        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 bg-netflix-dark p-6 rounded-lg"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative w-full h-64">
                  <ResponsiveImage
                    src={
                      selectedItem.image ||
                      `/placeholder.svg?height=256&width=400&text=${encodeURIComponent(selectedItem.title)}`
                    }
                    alt={selectedItem.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    fallbackText={`${selectedItem.title} details`}
                    fallbackColor="bg-gray-800"
                    retryOnError={true}
                    containerClassName="w-full h-full rounded-md"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
                    selectedItem.type === "work"
                      ? "bg-netflix-red/20 text-netflix-red"
                      : selectedItem.type === "education"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-green-500/20 text-green-500"
                  }`}
                >
                  {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-netflix-red font-medium mb-4">{selectedItem.date}</p>
                <p className="text-gray-300">{selectedItem.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

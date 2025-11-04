"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import Image from "next/image"

interface CaseStudy {
  id: string
  title: string
  description: string
  image: string
  metrics: string[]
  link: string
}

interface CaseStudiesCarouselProps {
  caseStudies: CaseStudy[]
  title: string
}

export default function CaseStudiesCarousel({ caseStudies, title }: CaseStudiesCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 350
      if (direction === "left") {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  return (
    <div className="py-12 bg-netflix-black">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{title}</h2>

        <div className="relative">
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
            aria-label="Scroll left"
          >
            <FaArrowLeft />
          </button>

          <div className="netflix-row" ref={carouselRef}>
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className="netflix-item w-[300px]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={study.link}>
                  <div className="case-study-card">
                    <div className="relative w-full h-[170px]">
                      <Image
                        src={study.image || "/placeholder.svg?height=170&width=300&text=Case+Study"}
                        alt={study.title}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                    <div className="case-study-overlay">
                      <h3 className="case-study-title">{study.title}</h3>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="case-study-description line-clamp-2">{study.description}</p>
                          <div className="case-study-metrics">
                            {study.metrics.map((metric, i) => (
                              <span key={i} className="case-study-metric">
                                {metric}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
            aria-label="Scroll right"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

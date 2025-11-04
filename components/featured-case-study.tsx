"use client"

import { motion } from "framer-motion"
import NetflixButton from "./netflix-button"
import { Play, Info } from "lucide-react"
import Image from "next/image"

interface FeaturedCaseStudyProps {
  caseStudy: {
    id: string
    title: string
    description: string
    image: string
    company: string
    metrics: {
      label: string
      value: string
    }[]
  }
}

export default function FeaturedCaseStudy({ caseStudy }: FeaturedCaseStudyProps) {
  return (
    <div className="relative h-[70vh] overflow-hidden mb-12">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src={caseStudy.image || "/placeholder.svg?height=700&width=1400&text=Featured+Case+Study"}
          alt={caseStudy.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-netflix-red px-3 py-1 rounded-full text-white text-sm font-medium mb-4"
          >
            Featured Case Study
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {caseStudy.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 mb-6"
          >
            {caseStudy.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-6 mb-8"
          >
            {caseStudy.metrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="text-center">
                <p className="text-netflix-red font-bold text-3xl">{metric.value}</p>
                <p className="text-gray-400 text-sm">{metric.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <NetflixButton href={`/case-studies/${caseStudy.id}`} variant="primary" size="lg" icon={<Play size={20} />}>
              View Case Study
            </NetflixButton>

            <NetflixButton href="/case-studies" variant="secondary" size="lg" icon={<Info size={20} />}>
              All Case Studies
            </NetflixButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

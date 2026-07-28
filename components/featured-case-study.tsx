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
    <div className="relative h-[min(70vh,32rem)] overflow-hidden mb-6">
      <div className="absolute inset-0">
        <Image
          src={caseStudy.image}
          alt={caseStudy.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-nf-veil via-transparent to-transparent" />
      </div>

      <div className="relative h-full nf-gutter flex flex-col justify-center">
        <div className="max-w-[min(92%,36rem)]">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#E50914] px-2 py-0.5 text-white text-xs font-bold mb-3 rounded-[2px]"
          >
            Featured
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="nf-billboard-title text-[clamp(1.5rem,3.5vw,2.75rem)]"
          >
            {caseStudy.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="nf-synopsis"
          >
            {caseStudy.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-5 mb-5"
          >
            {caseStudy.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label}>
                <p className="text-[#E50914] font-bold text-2xl leading-none">{metric.value}</p>
                <p className="text-nf-dim text-xs mt-1">{metric.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <NetflixButton href={`/case-studies/${caseStudy.id}`} variant="play" size="lg" icon={<Play fill="currentColor" strokeWidth={0} />}>
              View Case Study
            </NetflixButton>
            <NetflixButton href="/case-studies" variant="info" size="lg" icon={<Info strokeWidth={2.25} />}>
              All Case Studies
            </NetflixButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import ResponsiveImage from "./responsive-image"

interface ClientLogosProps {
  logos: {
    id: string
    name: string
    image: string
    link?: string
  }[]
  title: string
}

export default function ClientLogos({ logos, title }: ClientLogosProps) {
  return (
    <div className="py-12 bg-netflix-dark">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{title}</h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="client-logos flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              className="relative w-[120px] h-[80px] bg-gray-800 rounded-md overflow-hidden"
            >
              {logo.link ? (
                <a
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  aria-label={logo.name}
                >
                  <ResponsiveImage
                    src={logo.image || `/placeholder.svg?height=80&width=120&text=${encodeURIComponent(logo.name)}`}
                    alt={logo.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 p-2"
                    sizes="120px"
                    fallbackText={logo.name}
                    fallbackColor="bg-gray-800"
                    showErrorIcon={false}
                    containerClassName="w-full h-full"
                  />
                </a>
              ) : (
                <ResponsiveImage
                  src={logo.image || `/placeholder.svg?height=80&width=120&text=${encodeURIComponent(logo.name)}`}
                  alt={logo.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 p-2"
                  sizes="120px"
                  fallbackText={logo.name}
                  fallbackColor="bg-gray-800"
                  showErrorIcon={false}
                  containerClassName="w-full h-full"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

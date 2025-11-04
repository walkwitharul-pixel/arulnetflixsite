"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { projectsData } from "@/lib/projects-data"
import { FaPlay, FaInfoCircle } from "react-icons/fa"
import Image from "next/image"

export default function TopPicks({ profile }) {
  // Filter top 4 projects
  const topProjects = projectsData.slice(0, 4)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="top-picks py-12 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">Top Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {topProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-video relative overflow-hidden rounded-md">
                <Image
                  src={project.image || "/placeholder.svg?height=180&width=320&text=Project"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-4"
                  >
                    <h3 className="text-white font-bold mb-1">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/projects/${project.id}`}
                        className="bg-white text-black hover:bg-gray-200 transition-colors px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <FaPlay className="text-xs" /> Details
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-600 text-white hover:bg-red-700 transition-colors px-3 py-1 rounded text-sm flex items-center gap-1"
                        >
                          <FaInfoCircle className="text-xs" /> Live Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

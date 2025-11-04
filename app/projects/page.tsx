"use client"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { projectsData } from "@/lib/projects-data"
import Link from "next/link"
import { FaGithub, FaExternalLinkAlt, FaRocket, FaLightbulb } from "react-icons/fa"
import Image from "next/image"

export default function Projects() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-netflix-black via-netflix-black to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-cover bg-center"></div>
        <div className="relative container mx-auto px-4 md:px-8 py-24 md:py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="bg-netflix-red/20 border border-netflix-red/50 rounded-full px-6 py-2 inline-flex items-center gap-2">
                <FaRocket className="text-netflix-red" />
                <span className="text-netflix-red font-medium">My Ventures & Projects</span>
              </div>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Building the Future
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Exploring innovation through technology, entrepreneurship, and community building
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="flex items-center gap-2">
                <FaLightbulb className="text-netflix-red" />
                {projectsData.length} Active Ventures
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="projects-container bg-black text-white py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className="group project-card bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-2xl border border-gray-800 hover:border-netflix-red/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <Image
                    src={project.image || "/placeholder.svg?height=224&width=400&text=Project"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-125"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-netflix-red/0 group-hover:bg-netflix-red/10 transition-colors duration-300 z-20"></div>
                </div>
                <div className="p-6 relative">
                  <motion.h3
                    className="text-2xl font-bold mb-3 bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-gray-300 mb-5 line-clamp-3 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techUsed.split(", ").slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="tech-badge bg-netflix-red/20 border border-netflix-red/30 text-xs px-3 py-1.5 rounded-full text-gray-300 hover:bg-netflix-red/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techUsed.split(", ").length > 3 && (
                      <span className="tech-badge bg-gray-800 text-xs px-3 py-1.5 rounded-full text-gray-400">
                        +{project.techUsed.split(", ").length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-white bg-netflix-red hover:bg-netflix-red/90 px-6 py-2.5 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-netflix-red/50 font-medium"
                    >
                      Explore
                    </Link>
                    <div className="flex gap-4">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label={`GitHub repository for ${project.title}`}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub size={22} />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-netflix-red transition-colors"
                          aria-label={`Live site for ${project.title}`}
                          whileHover={{ scale: 1.2, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaExternalLinkAlt size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

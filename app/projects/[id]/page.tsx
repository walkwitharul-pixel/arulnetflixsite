"use client"
import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { projectsData } from "@/lib/projects-data"
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa"
import Image from "next/image"

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const project = projectsData.find((p) => p.id === id)

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl mb-4">Project not found</h1>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-netflix-black via-netflix-black to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.1),transparent)]"></div>
        <div className="relative container mx-auto px-4 md:px-8 py-16">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12 shadow-2xl border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
              <Image
                src={project.image || "/placeholder.svg?height=600&width=1200&text=Project+Detail"}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12 gap-6">
              <motion.h1
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-netflix-red via-red-400 to-netflix-red bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {project.title}
              </motion.h1>
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                    aria-label={`GitHub repository for ${project.title}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> GitHub
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-netflix-red hover:bg-netflix-red/90 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-netflix-red/50"
                    aria-label={`Live demo for ${project.title}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-black text-white min-h-screen py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10">
              <h2 className="text-3xl font-semibold mb-6 text-netflix-red">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.techUsed.split(", ").map((tech, i) => (
                  <motion.span
                    key={i}
                    className="bg-netflix-red/20 border border-netflix-red/30 px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-netflix-red/30 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-semibold mb-6 text-netflix-red">Project Description</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 leading-relaxed mb-4">{project.description}</p>
                {project.longDescription && (
                  <div
                    className="mt-4 text-gray-300 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: project.longDescription }}
                  />
                )}
              </div>
            </div>

            {project.features && (
              <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800">
                <h2 className="text-3xl font-semibold mb-6 text-netflix-red">Key Features</h2>
                <ul className="space-y-3 text-gray-300">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <span className="text-netflix-red mt-1">▸</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {project.challenges && (
              <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-netflix-red/10 to-red-900/10 border border-netflix-red/20">
                <h2 className="text-3xl font-semibold mb-6 text-netflix-red">Challenges & Solutions</h2>
                <div className="text-gray-300 leading-relaxed">
                  <p>{project.challenges}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

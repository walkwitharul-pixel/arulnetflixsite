"use client"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { skillsData } from "@/lib/skills-data"
import RadialSkillChart from "@/components/radial-skill-chart"
import NewsletterSignup from "@/components/newsletter-signup"
import { useState } from "react"

// Group skills by category
const skillsByCategory = skillsData.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = []
  }
  acc[skill.category].push(skill)
  return acc
}, {})

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Get all categories
  const categories = Object.keys(skillsByCategory)

  // Filter skills by category if active, otherwise show all
  const displayedSkills = activeCategory ? skillsByCategory[activeCategory] : skillsData

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-netflix-black via-netflix-black to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.1),transparent)]"></div>
        <div className="relative container mx-auto px-4 md:px-8 py-24 md:py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-netflix-red via-red-400 to-netflix-red bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Skills & Expertise
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              A diverse skill set spanning technology, business, and creative domains
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="skills-container bg-netflix-black text-white py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Category filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null ? "bg-netflix-red text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All Skills
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-netflix-red text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSkills.map((skill, index) => (
              <RadialSkillChart key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>

      <NewsletterSignup />
    </>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface Skill {
  name: string
  category: string
  proficiency: number
  description: string
  icon?: string
}

interface SkillVisualizationProps {
  skills: Skill[]
  title: string
}

export default function SkillVisualization({ skills, title }: SkillVisualizationProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div className="py-12 bg-netflix-black">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="bg-netflix-dark p-4 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">{skill.name}</h3>
                <span className="text-netflix-red font-bold">{skill.proficiency}%</span>
              </div>
              <div className="netflix-progress mb-2">
                <motion.div
                  className="netflix-progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
              {hoveredSkill === skill.name && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 text-sm mt-2">
                  {skill.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

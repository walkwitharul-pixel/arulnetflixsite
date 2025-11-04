"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface RadialSkillChartProps {
  skill: {
    name: string
    proficiency: number
    description: string
    category: string
  }
  index: number
}

export default function RadialSkillChart({ skill, index }: RadialSkillChartProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  // Calculate the circumference of the circle
  const radius = 40
  const circumference = 2 * Math.PI * radius

  // Calculate the offset based on the proficiency
  const offset = circumference - (skill.proficiency / 100) * circumference

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={chartRef}
      className="bg-netflix-dark p-6 rounded-lg cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center">
        <div className="relative w-24 h-24 mr-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#333" strokeWidth="8" />

            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#E50914"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={isVisible ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
              transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
              style={{
                transformOrigin: "center",
                transform: "rotate(-90deg)",
              }}
            />

            {/* Percentage text */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="18"
              fontWeight="bold"
            >
              {skill.proficiency}%
            </text>
          </svg>
        </div>

        <div className="flex-1">
          <h3 className="text-white text-lg font-medium">{skill.name}</h3>
          <p className="text-netflix-red text-sm">{skill.category}</p>
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mt-4"
      >
        <p className="text-gray-300 text-sm">{skill.description}</p>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <h4 className="text-white font-medium mb-2">Skill Journey</h4>
          <div className="flex items-center text-sm">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <div className="ml-2 flex-1">
              <p className="text-gray-400">2020: Started developing {skill.name} skills</p>
            </div>
          </div>
          <div className="w-px h-4 bg-gray-700 ml-1.5"></div>
          <div className="flex items-center text-sm">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="ml-2 flex-1">
              <p className="text-gray-400">2022: Applied {skill.name} in professional projects</p>
            </div>
          </div>
          <div className="w-px h-4 bg-gray-700 ml-1.5"></div>
          <div className="flex items-center text-sm">
            <div className="w-3 h-3 rounded-full bg-netflix-red"></div>
            <div className="ml-2 flex-1">
              <p className="text-gray-300">2024: Mastered advanced {skill.name} techniques</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { skillsData } from "@/lib/skills-data"

export default function ContinueWatching({ profile }) {
  // Get top 6 skills
  const topSkills = skillsData.slice(0, 6)

  return (
    <section className="continue-watching py-12 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {topSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href="/skills">
                <div className="aspect-square relative overflow-hidden rounded-md bg-gray-800 flex flex-col items-center justify-center p-4 hover:bg-gray-700 transition-colors">
                  <div className="text-red-600 text-3xl mb-2">
                    {/* Replace text representation with proper icon or initial */}
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                      {skill.icon ? (
                        <span className="text-white">{skill.icon.charAt(0)}</span>
                      ) : (
                        <span className="text-white">{skill.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-white text-center font-medium">{skill.name}</h3>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-red-600 h-1.5 rounded-full"
                      style={{ width: `${skill.proficiency || 85}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

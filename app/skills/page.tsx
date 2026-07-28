"use client"

import Navbar from "@/components/navbar"
import PageHero from "@/components/page-hero"
import SiteFooter from "@/components/site-footer"
import { motion } from "framer-motion"
import { skillsData } from "@/lib/skills-data"
import { resolveThumbnail, slugify } from "@/lib/design-tokens"
import Image from "next/image"
import { useState, useEffect } from "react"
import NewsletterSignup from "@/components/newsletter-signup"

const skillsByCategory = skillsData.reduce<Record<string, typeof skillsData>>((acc, skill) => {
  if (!acc[skill.category]) acc[skill.category] = []
  acc[skill.category].push(skill)
  return acc
}, {})

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const categories = Object.keys(skillsByCategory)
  const displayedSkills = activeCategory ? skillsByCategory[activeCategory] : skillsData

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "")
    if (!raw) return
    const el = document.getElementById(decodeURIComponent(raw))
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [])

  return (
    <>
      <Navbar />
      <main id="main-content" className="nf-page">
        <PageHero
          title="Skills & Expertise"
          subtitle="A diverse skill set spanning technology, business, and creative domains"
          backgroundImage="/images/placeholders/posters/entrepreneurship.svg"
        />

        <section className="nf-gutter py-[clamp(1.25rem,3vw,2rem)] pb-[clamp(3rem,6vw,4rem)]">
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 text-sm rounded-[2px] transition-colors ${
                activeCategory === null ? "bg-white text-black font-semibold" : "bg-[#333] text-nf-secondary hover:bg-[#454545]"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 text-sm rounded-[2px] transition-colors ${
                  activeCategory === category
                    ? "bg-white text-black font-semibold"
                    : "bg-[#333] text-nf-secondary hover:bg-[#454545]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {displayedSkills.map((skill, index) => {
              const skillSlug = slugify(skill.name)
              return (
                <motion.article
                  key={skill.name}
                  id={`skill-${skillSlug}`}
                  className="group relative aspect-video rounded-[2px] overflow-hidden bg-nf-elevated scroll-mt-24"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                >
                  <Image
                    src={resolveThumbnail(skill.name)}
                    alt=""
                    fill
                    className="object-cover scale-110 blur-[1px] opacity-70 transition-transform duration-300 group-hover:scale-[1.15]"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                    <p className="text-nf-text text-xs sm:text-sm font-semibold leading-tight nf-truncate mb-1.5">
                      {skill.name}
                    </p>
                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E50914]" style={{ width: `${skill.proficiency}%` }} />
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>

        <NewsletterSignup />
        <SiteFooter />
      </main>
    </>
  )
}

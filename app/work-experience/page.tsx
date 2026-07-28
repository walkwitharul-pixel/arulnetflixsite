"use client"

import Navbar from "@/components/navbar"
import PageHero from "@/components/page-hero"
import SiteFooter from "@/components/site-footer"
import { motion } from "framer-motion"
import { FaBriefcase, FaGraduationCap, FaTrophy } from "react-icons/fa"
import { timelineData } from "@/lib/timeline-data"
import { resolveThumbnail, resolveContentLink, slugify } from "@/lib/design-tokens"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export default function WorkExperience() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [])

  return (
    <>
      <Navbar />
      <main id="main-content" className="nf-page">
        <PageHero
          title="Journey & Timeline"
          subtitle="Professional experience, education, and achievements"
          backgroundImage="/images/placeholders/posters/business-strategy.svg"
        />

        <section className="nf-gutter py-[clamp(1.25rem,3vw,2rem)] pb-[clamp(3rem,6vw,5rem)]">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {timelineData.map((item, index) => {
              const image = resolveThumbnail(item.name, item.title)
              const nameSlug = slugify(item.name)
              const ventureLink =
                item.timelineType === "work" ? resolveContentLink(item.name) : null
              const showVentureLink = ventureLink?.startsWith("/projects/")
              const Icon =
                item.timelineType === "work"
                  ? FaBriefcase
                  : item.timelineType === "education"
                    ? FaGraduationCap
                    : FaTrophy

              return (
                <motion.article
                  key={`${item.name}-${index}`}
                  id={nameSlug}
                  data-timeline-index={index}
                  className="relative flex flex-col sm:flex-row gap-0 overflow-hidden rounded-[2px] bg-nf-elevated scroll-mt-24"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
                >
                  <span id={`timeline-${index}`} className="sr-only" aria-hidden="true" />
                  <div className="relative w-full sm:w-[11.5rem] md:w-[13rem] aspect-video sm:aspect-auto sm:min-h-[7.5rem] shrink-0">
                    <Image src={image} alt={item.name} fill className="object-cover" sizes="220px" />
                  </div>

                  <div className="flex-1 p-4 sm:p-5 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#E50914] text-white shrink-0">
                        <Icon size={12} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-nf-text font-bold text-base sm:text-lg leading-tight">{item.title}</h3>
                        <p className="text-[#E50914] text-sm mt-0.5 nf-truncate">{item.name}</p>
                      </div>
                    </div>
                    <p className="nf-meta text-nf-dim mb-2">{item.dateRange}</p>
                    {"techStack" in item && item.techStack && (
                      <p className="text-nf-muted text-xs mb-2 nf-truncate">{item.techStack}</p>
                    )}
                    <p className="text-nf-secondary text-sm leading-snug line-clamp-3">{item.summaryPoints}</p>
                    {showVentureLink && ventureLink && (
                      <Link
                        href={ventureLink}
                        className="inline-block mt-3 text-sm text-white border border-white/40 px-3 py-1 rounded-[2px] hover:bg-white/10 transition-colors"
                      >
                        View venture
                      </Link>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  )
}

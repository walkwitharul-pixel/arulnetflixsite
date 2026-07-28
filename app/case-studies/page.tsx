"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import PageHero from "@/components/page-hero"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import FeaturedCaseStudy from "@/components/featured-case-study"
import NewsletterSignup from "@/components/newsletter-signup"
import NetflixButton from "@/components/netflix-button"
import Image from "next/image"
import { caseStudiesData } from "@/lib/case-studies-data"
import SiteFooter from "@/components/site-footer"

const industries = Array.from(new Set(caseStudiesData.map((study) => study.industry)))

export default function CaseStudies() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const filteredCaseStudies = selectedIndustry
    ? caseStudiesData.filter((study) => study.industry === selectedIndustry)
    : caseStudiesData
  const featuredCaseStudy = filteredCaseStudies[0]

  return (
    <>
      <Navbar />
      <main id="main-content" className="nf-page">
        <PageHero
          title="Case Studies"
          subtitle="Real results from real projects — impact and innovation"
          backgroundImage="/images/placeholders/posters/onestopsg-seo.svg"
        />

        {featuredCaseStudy && (
          <div className="pt-2">
            <FeaturedCaseStudy caseStudy={featuredCaseStudy} />
          </div>
        )}

        <section className="nf-gutter py-[clamp(1.25rem,3vw,2rem)] pb-[clamp(2rem,4vw,3rem)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-nf-text text-lg sm:text-xl font-semibold">All Case Studies</h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedIndustry(null)}
                className={`px-3 py-1.5 text-sm rounded-[2px] ${
                  selectedIndustry === null ? "bg-white text-black font-semibold" : "bg-[#333] text-nf-secondary"
                }`}
              >
                All
              </button>
              {industries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-3 py-1.5 text-sm rounded-[2px] ${
                    selectedIndustry === industry ? "bg-white text-black font-semibold" : "bg-[#333] text-nf-secondary"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredCaseStudies.map((study, index) => (
              <motion.article
                key={study.id}
                className="bg-nf-elevated overflow-hidden rounded-[2px] flex flex-col"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="relative aspect-video">
                  <Image src={study.image} alt={study.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <div className="p-4 flex flex-col flex-1 min-w-0">
                  <p className="nf-meta text-[#E50914] mb-1">{study.company}</p>
                  <h3 className="text-nf-text font-bold text-base leading-snug mb-2 line-clamp-2">{study.title}</h3>
                  <p className="text-nf-muted text-sm line-clamp-3 mb-4 flex-1">{study.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {study.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label} className="bg-black/40 px-2 py-2 rounded-[2px]">
                        <p className="text-[#E50914] font-bold text-sm leading-none">{metric.value}</p>
                        <p className="text-nf-dim text-[0.65rem] mt-1 nf-truncate">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                  <NetflixButton href={`/case-studies/${study.id}`} variant="primary" size="sm" className="w-full" icon={<FaArrowRight size={12} />}>
                    View Case Study
                  </NetflixButton>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <NewsletterSignup />
        <SiteFooter />
      </main>
    </>
  )
}

"use client"

import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import PageHero from "@/components/page-hero"
import { motion } from "framer-motion"
import { FaArrowLeft } from "react-icons/fa"
import Image from "next/image"
import NetflixButton from "@/components/netflix-button"
import { caseStudiesData } from "@/lib/case-studies-data"
import { resolveContentLink } from "@/lib/design-tokens"
import SiteFooter from "@/components/site-footer"

export default function CaseStudyDetail() {
  const params = useParams()
  const router = useRouter()
  const study = caseStudiesData.find((s) => s.id === params.id)

  if (!study) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="nf-page flex flex-col items-center justify-center nf-gutter py-32">
          <h1 className="nf-billboard-title mb-4">Case study not found</h1>
          <NetflixButton variant="play" onClick={() => router.push("/case-studies")} icon={<FaArrowLeft />}>
            Back to Case Studies
          </NetflixButton>
          <SiteFooter />
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="nf-page">
        <PageHero title={study.company} subtitle={study.title} backgroundImage={study.image} />

        <section className="nf-gutter py-[clamp(1.25rem,3vw,2rem)] pb-[clamp(3rem,6vw,5rem)]">
          <NetflixButton
            variant="ghost"
            size="sm"
            className="mb-5 -ml-2"
            onClick={() => router.push("/case-studies")}
            icon={<FaArrowLeft size={12} />}
          >
            Back to Case Studies
          </NetflixButton>

          <div className="relative w-full aspect-video max-h-[50vh] rounded-[2px] overflow-hidden mb-6">
            <Image src={study.image} alt={study.title} fill className="object-cover" priority sizes="100vw" />
          </div>

          <p className="nf-synopsis max-w-3xl mb-6">{study.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="bg-nf-elevated px-3 py-3 rounded-[2px]">
                <p className="text-[#E50914] font-bold text-xl sm:text-2xl leading-none">{metric.value}</p>
                <p className="text-nf-dim text-xs mt-2">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl">
            {[
              { title: "Challenge", body: study.challenge },
              { title: "Solution", body: study.solution },
              { title: "Results", body: study.results },
            ].map((block) => (
              <motion.div
                key={block.title}
                className="bg-nf-elevated p-4 sm:p-5 rounded-[2px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-nf-text font-bold mb-2">{block.title}</h2>
                <p className="text-nf-muted text-sm leading-relaxed">{block.body}</p>
              </motion.div>
            ))}
          </div>

          {study.testimonial && (
            <blockquote className="mt-8 max-w-3xl border-l-4 border-[#E50914] pl-4 py-2">
              <p className="text-nf-text text-base sm:text-lg leading-relaxed mb-3">&ldquo;{study.testimonial.quote}&rdquo;</p>
              <footer className="text-nf-muted text-sm">
                <span className="text-nf-text font-semibold">{study.testimonial.author}</span>
                {" — "}
                {study.testimonial.position}
              </footer>
            </blockquote>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <NetflixButton href={resolveContentLink(study.company)} variant="play" size="sm">
              View related venture
            </NetflixButton>
            <NetflixButton href="/contact" variant="info" size="sm">
              Discuss a similar project
            </NetflixButton>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  )
}

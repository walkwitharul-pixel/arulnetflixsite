"use client"

import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import PageHero from "@/components/page-hero"
import { motion } from "framer-motion"
import { projectsData } from "@/lib/projects-data"
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa"
import Image from "next/image"
import NetflixButton from "@/components/netflix-button"
import SiteFooter from "@/components/site-footer"

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const project = projectsData.find((p) => p.id === params.id)

  if (!project) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="nf-page flex flex-col items-center justify-center nf-gutter py-32">
          <h1 className="nf-billboard-title mb-4">Project not found</h1>
          <NetflixButton variant="play" onClick={() => router.push("/projects")} icon={<FaArrowLeft />}>
            Back to Ventures
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
        <PageHero title={project.title} subtitle={project.description} backgroundImage={project.image} />

        <section className="nf-gutter py-[clamp(1.25rem,3vw,2rem)] pb-[clamp(3rem,6vw,5rem)]">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <NetflixButton
              variant="ghost"
              size="sm"
              onClick={() => router.push("/projects")}
              icon={<FaArrowLeft size={12} />}
            >
              Back
            </NetflixButton>
            {project.liveUrl && (
              <NetflixButton href={project.liveUrl} external variant="play" size="sm" icon={<FaExternalLinkAlt size={12} />}>
                Live Demo
              </NetflixButton>
            )}
            {!project.liveUrl && (
              <NetflixButton href="/contact" variant="play" size="sm">
                Get in Touch
              </NetflixButton>
            )}
            {project.github && (
              <NetflixButton href={project.github} external variant="info" size="sm" icon={<FaGithub size={14} />}>
                GitHub
              </NetflixButton>
            )}
            <NetflixButton href="/case-studies" variant="info" size="sm">
              Case Studies
            </NetflixButton>
          </div>

          <div className="relative w-full aspect-video max-h-[48vh] rounded-[2px] overflow-hidden mb-6">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority sizes="100vw" />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techUsed.split(", ").map((tech) => (
              <span key={tech} className="text-xs px-2.5 py-1 bg-nf-elevated text-nf-secondary rounded-[2px]">
                {tech}
              </span>
            ))}
          </div>

          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-nf-text text-xl font-bold mb-3">Overview</h2>
              <p className="text-nf-muted leading-relaxed">{project.description}</p>
              {project.longDescription && (
                <div
                  className="mt-4 text-nf-muted leading-relaxed space-y-3 [&_p]:mb-3"
                  dangerouslySetInnerHTML={{ __html: project.longDescription }}
                />
              )}
            </div>

            {project.features && (
              <div className="bg-nf-elevated p-4 sm:p-5 rounded-[2px]">
                <h2 className="text-nf-text text-xl font-bold mb-3">Key Features</h2>
                <ul className="space-y-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-nf-secondary text-sm">
                      <span className="text-[#E50914] shrink-0">▸</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.challenges && (
              <motion.div className="bg-nf-elevated p-4 sm:p-5 rounded-[2px] border-l-4 border-[#E50914]">
                <h2 className="text-nf-text text-xl font-bold mb-3">Challenges & Solutions</h2>
                <p className="text-nf-muted leading-relaxed text-sm sm:text-base">{project.challenges}</p>
              </motion.div>
            )}
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  )
}

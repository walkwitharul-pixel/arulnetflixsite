"use client"

import Navbar from "@/components/navbar"
import PageHero from "@/components/page-hero"
import { motion } from "framer-motion"
import { projectsData } from "@/lib/projects-data"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import Image from "next/image"
import NetflixButton from "@/components/netflix-button"
import SiteFooter from "@/components/site-footer"

export default function Projects() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="nf-page">
        <PageHero
          title="Ventures"
          subtitle="Exploring innovation through technology, entrepreneurship, and community building"
          backgroundImage="/images/placeholders/posters/velantec.svg"
        />

        <section className="nf-gutter py-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(3rem,6vw,5rem)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {projectsData.map((project, index) => (
              <motion.article
                key={project.id}
                className="group bg-nf-elevated overflow-hidden rounded-[2px]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="p-4 sm:p-5">
                  <h2 className="text-lg sm:text-xl font-bold text-nf-text mb-2 leading-tight nf-truncate">
                    {project.title}
                  </h2>
                  <p className="text-nf-muted text-sm mb-4 line-clamp-3 leading-snug">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techUsed.split(", ").slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[0.7rem] px-2 py-1 bg-white/5 text-nf-secondary rounded-[2px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-[color:var(--nf-border)]">
                    <NetflixButton href={`/projects/${project.id}`} variant="primary" size="sm">
                      Explore
                    </NetflixButton>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-nf-muted hover:text-nf-text" aria-label="GitHub">
                          <FaGithub size={18} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-nf-muted hover:text-nf-text" aria-label="Live site">
                          <FaExternalLinkAlt size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  )
}

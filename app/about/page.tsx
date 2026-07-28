"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VideoGallery from "@/components/video-gallery"
import ImageGallery from "@/components/image-gallery"
import AboutMeHero from "@/components/about-me-hero"
import AboutMeContent from "@/components/about-me-content"
import NewsletterSignup from "@/components/newsletter-signup"
import SiteFooter from "@/components/site-footer"
import { aboutMeData } from "@/lib/about-me-data"
import Image from "next/image"

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState("story")

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.location.hash.includes("video")) {
      setActiveTab("videos")
      document.getElementById("videos-panel")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  return (
    <>
      <Navbar />
      <main id="main-content" className="nf-page pt-[var(--nf-nav-h)]">
        <AboutMeHero />

        <div className="nf-gutter py-[clamp(1.5rem,3vw,2.5rem)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8">
            {[
              { label: "Based in", value: aboutMeData.facts.basedIn },
              { label: "Education", value: "Cyber Security & Forensics" },
              { label: "Ventures", value: `${aboutMeData.ventures.length}+` },
              { label: "Status", value: "Open to collab" },
            ].map((fact) => (
              <div key={fact.label} className="bg-nf-elevated px-3 py-3 rounded-[2px]">
                <p className="text-nf-dim text-xs mb-1">{fact.label}</p>
                <p className="text-nf-text text-sm font-semibold leading-snug">{fact.value}</p>
              </div>
            ))}
          </div>

          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-start sm:justify-center mb-6 overflow-x-auto">
              <TabsList className="bg-nf-elevated rounded-[2px]">
                <TabsTrigger value="story" className="data-[state=active]:bg-[#E50914] rounded-[2px]">
                  My Story
                </TabsTrigger>
                <TabsTrigger value="ventures" className="data-[state=active]:bg-[#E50914] rounded-[2px]">
                  Ventures
                </TabsTrigger>
                <TabsTrigger value="videos" id="videos" className="data-[state=active]:bg-[#E50914] rounded-[2px]">
                  Videos
                </TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-[#E50914] rounded-[2px]">
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-[#E50914] rounded-[2px]">
                  Achievements
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="story" className="mt-6">
              <AboutMeContent content={aboutMeData.story} />
            </TabsContent>

            <TabsContent value="ventures" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {aboutMeData.ventures.map((venture, index) => (
                  <motion.div
                    key={venture.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-netflix-dark rounded-lg overflow-hidden"
                  >
                    <div className="relative aspect-video bg-black">
                      <Image
                        src={venture.image || "/images/placeholders/posters/default.svg"}
                        alt={venture.name}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-netflix-red mb-2">{venture.name}</h3>
                      <p className="text-gray-300 mb-4">{venture.description}</p>
                      {venture.link && (
                        <a
                          href={venture.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white bg-netflix-red hover:bg-netflix-red/80 px-4 py-2 rounded-md inline-block transition-colors"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6" id="videos-panel">
              <p className="text-nf-muted text-sm mb-4 max-w-2xl">
                Trailers and demos. Drop your MP4 files into <code className="text-nf-text/80">public/videos/</code> using
                the filenames in the README — or add YouTube IDs in <code className="text-nf-text/80">lib/personal-data.ts</code>.
              </p>
              <VideoGallery videos={aboutMeData.videos} />
            </TabsContent>

            <TabsContent value="gallery" className="mt-6">
              <ImageGallery images={aboutMeData.gallery} />
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {aboutMeData.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-netflix-dark rounded-lg overflow-hidden"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={achievement.image || "/placeholder.svg"}
                        alt={`${achievement.title} certificate or award`}
                        className="w-full h-full object-cover"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-nf-text mb-2">{achievement.title}</h3>
                      <p className="text-netflix-red mb-2">{achievement.issuer}</p>
                      <p className="text-gray-400 text-sm">{achievement.date}</p>
                      <p className="text-gray-300 mt-3">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        <NewsletterSignup />
        <SiteFooter />
      </main>
    </>
  )
}

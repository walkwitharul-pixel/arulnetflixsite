"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VideoGallery from "@/components/video-gallery"
import ImageGallery from "@/components/image-gallery"
import AboutMeHero from "@/components/about-me-hero"
import AboutMeContent from "@/components/about-me-content"
import NewsletterSignup from "@/components/newsletter-signup"
import { aboutMeData } from "@/lib/about-me-data"
import Image from "next/image"

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState("story")

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen pt-16">
        <AboutMeHero />

        <div className="container mx-auto px-4 md:px-8 py-12">
          <Tabs defaultValue="story" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-netflix-dark">
                <TabsTrigger value="story" className="data-[state=active]:bg-netflix-red">
                  My Story
                </TabsTrigger>
                <TabsTrigger value="ventures" className="data-[state=active]:bg-netflix-red">
                  Ventures
                </TabsTrigger>
                <TabsTrigger value="videos" className="data-[state=active]:bg-netflix-red">
                  Videos
                </TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-netflix-red">
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-netflix-red">
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
                    <div className="relative aspect-video bg-black flex items-center justify-center p-6">
                      <Image
                        src={venture.image || "/placeholder.svg"}
                        alt={venture.name}
                        width={200}
                        height={120}
                        className="object-contain"
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

            <TabsContent value="videos" className="mt-6">
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
                      <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
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
      </div>
    </>
  )
}

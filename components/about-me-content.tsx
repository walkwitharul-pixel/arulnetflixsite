"use client"

import { motion } from "framer-motion"
import VideoPlayer from "./video-player"
import ResponsiveImage from "./responsive-image"
import { FaLinkedin, FaEnvelope, FaPhone, FaGlobe, FaExternalLinkAlt } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import React from "react"

interface ContentItem {
  type: string
  content?: string
  src?: string
  alt?: string
  caption?: string
  title?: string
  thumbnail?: string
}

interface AboutMeContentProps {
  content: {
    title: string
    subtitle: string
    content: ContentItem[]
  }
}

export default function AboutMeContent({ content }: AboutMeContentProps) {
  // Find the first image in the content (assuming it's the headshot)
  const headshot = content.content.find((item) => item.type === "image")

  // Define venture websites with logos
  const ventureWebsites = [
    {
      name: "VELANTEC",
      url: "https://www.velantec.com",
      description: "AI, Cybersecurity & Software Solutions",
      logo: "/images/logos/velantec-logo.png",
    },
    {
      name: "ONESTOPSG",
      url: "https://www.onestopsg.com",
      description: "Digital Marketing Agency",
      logo: "/images/logos/onestopsg-logo.png",
    },
    {
      name: "Aval.sg",
      url: "https://www.aval.sg",
      description: "South Indian Women's Fashion",
      logo: "/images/logos/aval-logo.png",
    },
    {
      name: "Avan.sg",
      url: "https://www.avan.sg",
      description: "South Indian Men's Fashion",
      logo: "/images/logos/avan-logo.png",
    },
    {
      name: "GrowthLab",
      url: "https://www.growthlab.sg",
      description: "Startup Community",
      logo: "/images/logos/growthlab-logo.png",
    },
    {
      name: "MrAssistant.Ai",
      url: "https://www.mrassistant.ai",
      description: "AI Voice Agent Platform",
      logo: "/images/logos/mrassistant-logo.png",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-nf-text mb-2">{content.title}</h2>
      <p className="text-xl text-netflix-red mb-8">{content.subtitle}</p>

      {/* Contact Information with LinkedIn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-netflix-dark p-6 rounded-lg mb-8 flex flex-col md:flex-row items-center gap-6"
      >
        {headshot && headshot.src && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-netflix-red flex-shrink-0">
            <ResponsiveImage
              src={headshot.src}
              alt={headshot.alt || "Arul Murugan - Professional Headshot"}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          </div>
        )}

        <div className="flex-grow">
          <h3 className="text-xl font-bold text-nf-text mb-3">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-netflix-red" />
              <span className="text-gray-300">arulmuruganvelusamy@hotmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-netflix-red" />
              <span className="text-gray-300">+65 9737 1722</span>
            </div>
            <div className="flex items-center gap-3">
              <FaLinkedin className="text-netflix-red" />
              <Link
                href="https://www.linkedin.com/in/arul-murugan-525b321a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-nf-text transition-colors"
              >
                linkedin.com/in/arul-murugan-525b321a7
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* My Ventures Websites Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-netflix-dark p-6 rounded-lg mb-8"
      >
        <h3 className="text-xl font-bold text-nf-text mb-4 flex items-center">
          <FaGlobe className="text-netflix-red mr-2" /> My Venture Websites
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ventureWebsites.map((site, index) => (
            <Link
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors group"
            >
              <div className="w-16 h-16 relative flex-shrink-0 bg-black/30 rounded-md overflow-hidden mr-4">
                <Image
                  src={site.logo || "/placeholder.svg"}
                  alt={`${site.name} logo`}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-nf-text font-medium">{site.name}</p>
                <p className="text-gray-400 text-sm">{site.description}</p>
              </div>
              <FaExternalLinkAlt className="text-netflix-red opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="space-y-8">
        {content.content.map((item, index) => {
          // Skip the first image as we've already displayed it
          if (index === content.content.findIndex((i) => i.type === "image")) {
            return null
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.type === "text" && (
                <p className="text-gray-300 text-lg leading-relaxed">
                  {processTextWithLinks(item.content ?? "", ventureWebsites)}
                </p>
              )}

              {item.type === "image" && item.src && (
                <div className="my-8">
                  <div className="relative rounded-lg overflow-hidden">
                    <ResponsiveImage
                      src={item.src}
                      alt={item.alt || ""}
                      width={800}
                      height={500}
                      className="w-full h-auto"
                      containerClassName="w-full"
                    />
                  </div>
                  {item.caption && <p className="text-gray-400 text-sm mt-2 text-center">{item.caption}</p>}
                </div>
              )}

              {item.type === "video" && (
                <div className="my-8">
                  <h3 className="text-xl font-bold text-nf-text mb-3">{item.title}</h3>
                  <VideoPlayer
                    src={"src" in item ? (item as { src?: string }).src : undefined}
                    youtubeId={
                      "youtubeId" in item
                        ? (item as { youtubeId?: string }).youtubeId
                        : typeof item.src === "string" && !item.src.startsWith("/")
                          ? item.src
                          : undefined
                    }
                    thumbnailUrl={item.thumbnail}
                    title={item.title}
                  />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// Helper function to process text and add links with logos
function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function processTextWithLinks(text: string, websites: { name: string; url: string; logo?: string }[]) {
  if (!text) return text

  type Match = { index: number; length: number; site: (typeof websites)[number]; text: string }
  const matches: Match[] = []

  websites.forEach((site) => {
    const regex = new RegExp(`\\b${escapeRegExp(site.name)}\\b`, "gi")
    let match: RegExpExecArray | null
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        site,
        text: match[0],
      })
    }
  })

  if (matches.length === 0) return text

  matches.sort((a, b) => a.index - b.index || b.length - a.length)

  const parts: (string | React.ReactElement)[] = []
  let cursor = 0

  matches.forEach((m, i) => {
    if (m.index < cursor) return
    if (m.index > cursor) parts.push(text.slice(cursor, m.index))
    parts.push(
      <Link
        key={`${m.site.name}-${m.index}-${i}`}
        href={m.site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-netflix-red hover:underline group relative"
      >
        {m.text}
        {m.site.logo && (
          <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Image
              src={m.site.logo || "/placeholder.svg"}
              alt={`${m.site.name} logo`}
              width={16}
              height={16}
              className="inline-block"
            />
          </span>
        )}
      </Link>,
    )
    cursor = m.index + m.length
  })

  if (cursor < text.length) parts.push(text.slice(cursor))
  return <React.Fragment>{parts}</React.Fragment>
}

"use client"

import { motion } from "framer-motion"
import ResponsiveImage from "./responsive-image"
import { FaLinkedin } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"

export default function AboutMeHero() {
  return (
    <div className="relative min-h-[70vh] overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <ResponsiveImage
          src="/placeholder.svg?height=800&width=1600&text=Arul+Murugan+Entrepreneur"
          alt="Arul Murugan - Entrepreneur and Founder"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          fallbackText="Arul Murugan - Entrepreneur"
          fallbackColor="bg-gray-900"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Professional Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-netflix-red shadow-xl flex-shrink-0"
          >
            <ResponsiveImage
              src="/placeholder.svg?height=400&width=400&text=Arul+Murugan+Headshot"
              alt="Arul Murugan - Professional Headshot"
              width={400}
              height={400}
              className="w-full h-full object-cover"
              priority
              fallbackText="Professional Headshot"
              containerClassName="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Arul Murugan</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-6">
              Multi-venture founder, tech entrepreneur, and community builder with a passion for innovation and impact.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start text-netflix-red font-medium mb-6">
              <span className="mr-3">Founder</span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="mr-3">CEO</span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="mr-3">Innovator</span>
              <span className="text-gray-400 mx-2">•</span>
              <span>Community Builder</span>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {/* LinkedIn Profile Link */}
              <Link
                href="https://www.linkedin.com/in/arul-murugan-525b321a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0077B5] hover:bg-[#0077B5]/90 text-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
                aria-label="Connect with Arul Murugan on LinkedIn"
              >
                <FaLinkedin className="text-xl" />
                <span className="font-medium">Connect on LinkedIn</span>
              </Link>

              {/* Main Venture Link with Logo */}
              <Link
                href="https://www.velantec.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-netflix-red hover:bg-netflix-red/90 text-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
                aria-label="Visit VELANTEC website"
              >
                <div className="w-5 h-5 relative">
                  <Image src="/images/logos/velantec-logo.png" alt="VELANTEC logo" fill className="object-contain" />
                </div>
                <span className="font-medium">Visit VELANTEC</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

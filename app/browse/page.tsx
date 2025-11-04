"use client"

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { profileData } from "@/lib/profile-data"
import ProfileCard from "@/components/profile-card"
import SoundPlayer from "@/components/sound-player"

export default function Browse() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)

  // Show content immediately
  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleProfileSelect = (profileName: string) => {
    setSelectedProfile(profileName)
    // Smooth transition to profile page
    setTimeout(() => {
      router.push(`/profile/${profileName}`)
    }, 600)
  }

  // Enhanced animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const titleVariants = {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  const cardsContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  return (
    <div className="browse-container flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key="browse-content"
          className="w-full flex flex-col items-center justify-center min-h-screen py-16 md:py-20"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Main Title - Enhanced Netflix Style */}
          <motion.h1
            className="who-is-watching text-white text-6xl md:text-7xl lg:text-8xl mb-20 md:mb-24 text-center font-bold select-none"
            variants={titleVariants}
            style={{
              fontFamily: '"Netflix Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: "0.01em",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            Who&apos;s watching?
          </motion.h1>

          {/* Profile Cards Grid - Enhanced Layout */}
          <motion.div
            className="profiles-grid flex flex-wrap justify-center items-center gap-10 md:gap-14 lg:gap-20 mb-20 md:mb-24 px-4"
            variants={cardsContainerVariants}
          >
            <AnimatePresence>
              {profileData.map((profile, index) => (
                <ProfileCard
                  key={profile.name}
                  name={profile.name}
                  image={`/images/profiles/${profile.name.toLowerCase()}.png`}
                  alt={profile.alt}
                  description={profile.description}
                  onClick={() => handleProfileSelect(profile.name)}
                  index={index}
                  isSelected={selectedProfile === profile.name}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Manage Profiles Button - Enhanced Style */}
          <motion.button
            className="manage-profiles-btn px-12 py-3.5 bg-transparent border-[1.5px] border-[#808080] text-white text-sm md:text-base font-normal tracking-wider hover:border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ 
              borderColor: "#ffffff",
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // Handle manage profiles action
              console.log("Manage profiles clicked")
            }}
          >
            Manage Profiles
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <SoundPlayer />
    </div>
  )
}

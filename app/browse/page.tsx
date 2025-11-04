"use client"

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { profileData } from "@/lib/profile-data"
import ProfileCard from "@/components/profile-card"
import SoundPlayer from "@/components/sound-player"

export default function Browse() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [exitComplete, setExitComplete] = useState(false)

  // Remove loading effect - show content immediately
  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleProfileSelect = (profileName: string) => {
    setSelectedProfile(profileName)

    // Wait for exit animation to complete before navigating
    setTimeout(() => {
      router.push(`/profile/${profileName}`)
    }, 1000)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="browse-container flex flex-col items-center justify-center min-h-screen bg-black">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            className="netflix-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setExitComplete(true)}
          >
            <div className="netflix-loader-logo">
              <div className="netflix-loader-bar"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full flex flex-col items-center justify-center min-h-screen py-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Netflix-style "Who's watching?" title - exact match */}
            <motion.h1
              className="who-is-watching text-white text-5xl md:text-6xl lg:text-7xl mb-16 md:mb-20 text-center font-bold"
              variants={titleVariants}
              style={{ 
                fontFamily: '"Netflix Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '0.02em'
              }}
            >
              Who&apos;s watching?
            </motion.h1>

            {/* Profile cards in horizontal row - Netflix exact spacing */}
            <motion.div
              className="profiles-grid flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20"
              variants={containerVariants}
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
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Manage Profiles button - Netflix exact style */}
            <motion.button
              className="manage-profiles-btn px-10 py-3 bg-transparent border border-white text-white text-sm md:text-base font-normal tracking-wide hover:border-white transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ borderColor: "#ffffff" }}
              whileTap={{ scale: 0.98 }}
            >
              Manage Profiles
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <SoundPlayer />
    </div>
  )
}

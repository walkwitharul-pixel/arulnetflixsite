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
    <div className="browse-container flex flex-col items-center justify-center min-h-screen bg-[#141414]">
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
            className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center px-6 py-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Netflix-style "Who's watching?" title */}
            <motion.h1
              className="who-is-watching text-white text-4xl md:text-5xl lg:text-6xl mb-16 md:mb-20 text-center font-medium tracking-tight"
              variants={titleVariants}
              style={{ fontFamily: '"Netflix Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Who&apos;s watching?
            </motion.h1>

            {/* Profile cards in horizontal row - Netflix style */}
            <motion.div
              className="profiles-grid flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 mb-12"
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

            {/* Manage Profiles button - Netflix style */}
            <motion.button
              className="manage-profiles-btn px-8 py-3 mt-4 bg-transparent border border-[#808080] text-white text-base font-medium tracking-wide hover:border-white transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ borderColor: "#ffffff", scale: 1.02 }}
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

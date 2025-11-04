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

  // Add loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
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
    <div className="browse-container flex flex-col items-center justify-center min-h-screen bg-black p-4">
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
            className="w-full max-w-6xl mx-auto flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.h1
              className="who-is-watching text-white text-3xl md:text-5xl mb-4 text-center font-bold"
              variants={titleVariants}
            >
              Who&apos;s Watching?
            </motion.h1>
            <motion.p
              className="text-gray-400 text-center mb-12 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Choose a profile to explore different aspects of my journey
            </motion.p>

            <motion.div
              className="profiles-grid flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10"
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
          </motion.div>
        )}
      </AnimatePresence>

      <SoundPlayer />
    </div>
  )
}

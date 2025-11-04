"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import ColoredAvatar from "./colored-avatar"

interface ProfileCardProps {
  name: string
  image: string
  alt: string
  description?: string
  onClick: () => void
  index: number
}

export default function ProfileCard({ name, image, alt, description, onClick, index }: ProfileCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  // Profile colors based on name
  const getProfileColor = () => {
    const colors = {
      stalker: "#E50914",
      investor: "#0077B5",
      recruiter: "#6441A4",
      community: "#FF9900",
      adventurer: "#1DB954",
    }
    return colors[name.toLowerCase()] || "#E50914"
  }

  const handleClick = () => {
    setIsSelected(true)
    // Delay navigation to allow for animation
    setTimeout(() => {
      onClick()
    }, 700)
  }

  // Animation variants - Netflix style (subtle and elegant)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.08,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    selected: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  }

  const imageVariants = {
    selected: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  const nameVariants = {
    selected: {
      color: "#ffffff",
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      className="profile-card flex flex-col items-center cursor-pointer"
      onClick={handleClick}
      variants={containerVariants}
      initial="hidden"
      animate={isSelected ? "selected" : "visible"}
      exit="exit"
      custom={index}
    >
      {/* Netflix-style square profile card - exact match */}
      <motion.div
        className={`image-container relative overflow-hidden w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] ${
          isSelected ? "ring-4 ring-white" : ""
        }`}
        variants={imageVariants}
        style={{
          borderRadius: "0px", // Perfect square, no rounded corners
        }}
      >
        {imageError ? (
          // Use the ColoredAvatar component as fallback with profile-specific color
          <ColoredAvatar name={name} size={180} color={getProfileColor()} />
        ) : (
          // Try to load the image, with error handling
          <Image
            src={image || `/images/profiles/${name.toLowerCase()}.png`}
            alt={alt || `${name} profile`}
            fill
            className="object-cover"
            priority={index < 2}
            onError={() => {
              console.warn(`Using fallback for profile image: ${image}`)
              setImageError(true)
            }}
          />
        )}

        {/* Netflix-style selection indicator - white border */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-4 border-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Profile name - Netflix exact style */}
      <motion.h3
        className="profile-name text-white mt-4 text-center text-sm md:text-base font-normal capitalize"
        variants={nameVariants}
        style={{ 
          fontFamily: '"Netflix Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          letterSpacing: '0.01em'
        }}
      >
        {name}
      </motion.h3>
    </motion.div>
  )
}

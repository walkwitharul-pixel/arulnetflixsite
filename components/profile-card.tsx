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
  const [isHovered, setIsHovered] = useState(false)
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
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
    },
    selected: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  const nameVariants = {
    hover: {
      color: "#ffffff",
      transition: {
        duration: 0.2,
      },
    },
    selected: {
      color: "#ffffff",
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      className="profile-card flex flex-col items-center cursor-pointer group"
      onClick={handleClick}
      variants={containerVariants}
      initial="hidden"
      animate={isSelected ? "selected" : "visible"}
      exit="exit"
      custom={index}
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Netflix-style square profile card */}
      <motion.div
        className={`image-container relative overflow-hidden transition-all duration-300 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] ${
          isSelected ? "ring-4 ring-white" : "ring-0 group-hover:ring-2 group-hover:ring-white/50"
        }`}
        variants={imageVariants}
        style={{
          borderRadius: "4px",
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

        {/* Netflix-style selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 ring-4 ring-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              borderRadius: "4px",
            }}
          />
        )}

        {/* Hover overlay effect */}
        {isHovered && !isSelected && (
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Profile name - Netflix style */}
      <motion.h3
        className="profile-name text-white mt-4 text-center text-sm md:text-base font-normal transition-colors duration-200"
        variants={nameVariants}
        style={{ fontFamily: '"Netflix Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      >
        {name}
      </motion.h3>
    </motion.div>
  )
}

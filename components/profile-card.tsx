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
  isSelected?: boolean
}

export default function ProfileCard({ name, image, alt, description, onClick, index, isSelected = false }: ProfileCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Profile colors based on name
  const getProfileColor = () => {
    const colors: Record<string, string> = {
      stalker: "#E50914",
      investor: "#0077B5",
      recruiter: "#6441A4",
      community: "#FF9900",
      adventurer: "#1DB954",
    }
    return colors[name.toLowerCase()] || "#E50914"
  }

  const handleClick = () => {
    onClick()
  }

  // Enhanced animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
    hover: {
      scale: 1.08,
      y: -8,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    selected: {
      scale: 1.1,
      y: -10,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  }

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    selected: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const nameVariants = {
    hover: {
      color: "#ffffff",
      y: -2,
      transition: {
        duration: 0.2,
      },
    },
    selected: {
      color: "#ffffff",
      y: -2,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      className="profile-card flex flex-col items-center cursor-pointer group"
      onClick={handleClick}
      variants={cardVariants}
      initial="hidden"
      animate={isSelected ? "selected" : isHovered ? "hover" : "visible"}
      exit="exit"
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
    >
      {/* Enhanced Profile Card Container */}
      <motion.div
        className={`image-container relative overflow-hidden w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] md:w-[200px] md:h-[200px] ${
          isSelected ? "ring-4 ring-white shadow-[0_0_30px_rgba(255,255,255,0.3)]" : isHovered ? "ring-2 ring-white/60" : ""
        }`}
        variants={imageVariants}
        style={{
          borderRadius: "0px",
          transition: "all 0.3s ease",
        }}
      >
        {imageError ? (
          <ColoredAvatar name={name} size={200} color={getProfileColor()} />
        ) : (
          <Image
            src={image || `/images/profiles/${name.toLowerCase()}.png`}
            alt={alt || `${name} profile`}
            fill
            className="object-cover transition-transform duration-300"
            priority={index < 2}
            onError={() => {
              console.warn(`Using fallback for profile image: ${image}`)
              setImageError(true)
            }}
          />
        )}

        {/* Selection Border Overlay */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-4 border-white pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
        )}

        {/* Hover Overlay */}
        {isHovered && !isSelected && (
          <motion.div
            className="absolute inset-0 bg-black/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Profile Name - Enhanced Styling */}
      <motion.h3
        className="profile-name text-white mt-5 text-center text-base md:text-lg font-normal capitalize select-none"
        variants={nameVariants}
        style={{
          fontFamily: '"Netflix Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          letterSpacing: "0.02em",
          textShadow: isHovered || isSelected ? "0 2px 8px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        {name}
      </motion.h3>
    </motion.div>
  )
}

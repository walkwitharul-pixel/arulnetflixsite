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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 300,
      },
    }),
    selected: {
      scale: 1.2,
      y: -30,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
  }

  const imageVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -3, 3, -3, 0],
      transition: {
        duration: 0.5,
        rotate: {
          repeat: 0,
          duration: 0.5,
          ease: "easeInOut",
        },
      },
    },
    tap: {
      scale: 0.95,
    },
    selected: {
      scale: 1.1,
      boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
      transition: {
        duration: 0.5,
      },
    },
  }

  const nameVariants = {
    hover: {
      color: "#ffffff",
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
    selected: {
      color: "#ffffff",
      fontWeight: "bold",
      scale: 1.1,
      transition: {
        duration: 0.3,
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
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
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`image-container relative rounded-md overflow-hidden border-2 transition-all duration-300 w-[150px] h-[150px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] ${
          isSelected ? "border-white" : "border-transparent hover:border-white"
        }`}
        variants={imageVariants}
      >
        {imageError ? (
          // Use the ColoredAvatar component as fallback with profile-specific color
          <ColoredAvatar name={name} size={150} color={getProfileColor()} />
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

        {/* Add Netflix-style selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-4 border-white rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      <motion.h3
        className="profile-name text-gray-400 mt-3 text-center capitalize transition-colors duration-300"
        variants={nameVariants}
      >
        {name}
      </motion.h3>

      {description && isHovered && !isSelected && (
        <motion.div
          className="absolute mt-[190px] sm:mt-[160px] md:mt-[190px] z-10 bg-black/80 p-2 rounded text-center max-w-[180px]"
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-xs text-white">{description}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

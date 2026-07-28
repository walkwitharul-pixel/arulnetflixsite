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

export default function ProfileCard({
  name,
  image,
  alt,
  onClick,
  index,
  isSelected = false,
}: ProfileCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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

  const active = isSelected || isHovered

  return (
    <motion.button
      type="button"
      className="profile-card flex flex-col items-center cursor-pointer group bg-transparent border-0 p-0 w-[clamp(5.25rem,10vw,9.375rem)]"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.28 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full aspect-square overflow-hidden rounded-[4px] box-border transition-[outline-color] duration-150 ${
          active ? "outline outline-[3px] outline-[color:var(--nf-text)]" : "outline outline-[3px] outline-transparent"
        }`}
      >
        {imageError ? (
          <ColoredAvatar name={name} size={150} color={getProfileColor()} className="!rounded-[4px] !w-full !h-full" />
        ) : (
          <Image
            src={image}
            alt={alt || `${name} profile`}
            fill
            className="object-cover"
            sizes="150px"
            priority={index < 3}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <span
        className={`mt-[0.65em] w-full text-center capitalize leading-tight transition-colors duration-150 nf-truncate ${
          active ? "text-nf-text" : "text-nf-dim"
        }`}
        style={{ fontSize: "var(--nf-profile-name)" }}
      >
        {name}
      </span>
    </motion.button>
  )
}

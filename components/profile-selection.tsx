"use client"

import { motion } from "framer-motion"
import ResponsiveImage from "./responsive-image"

interface Profile {
  name: string
  image: string
  alt: string
  backgroundGif?: string
}

interface ProfileSelectionProps {
  profiles: Profile[]
  onSelect: (profile: Profile) => void
}

export default function ProfileSelection({ profiles, onSelect }: ProfileSelectionProps) {
  return (
    <motion.div
      className="profiles flex flex-wrap justify-center gap-6 md:gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {profiles.map((profile, index) => (
        <motion.div
          key={index}
          className="profile-card flex flex-col items-center cursor-pointer"
          onClick={() => onSelect(profile)}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.2 }}
        >
          <div className="image-container rounded-md overflow-hidden border-2 border-transparent hover:border-white transition-all duration-300 w-[150px] h-[150px]">
            <ResponsiveImage
              src={profile.image}
              alt={profile.alt}
              width={150}
              height={150}
              className="w-full h-full object-cover"
              priority={index < 2} // Prioritize loading the first two profiles
              containerClassName="w-full h-full"
              fallbackText={profile.name}
              quality={90} // Higher quality for profile images
            />
          </div>
          <h3 className="profile-name text-gray-400 mt-3 text-center capitalize hover:text-white transition-colors duration-300">
            {profile.name}
          </h3>
        </motion.div>
      ))}
    </motion.div>
  )
}

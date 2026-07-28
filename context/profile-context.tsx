"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"

type ProfileType = "stalker" | "investor" | "recruiter" | "community" | "adventurer" | null

interface ProfileContextType {
  activeProfile: ProfileType
  setActiveProfile: (profile: ProfileType) => void
  profileColor: string
  profileTheme: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
}

const defaultProfileTheme = {
  primary: "#E50914", // Netflix red
  secondary: "#141414", // Netflix black
  accent: "#FFFFFF",
  background: "#000000",
}

const profileThemes = {
  stalker: {
    primary: "#E50914", // Netflix red
    secondary: "#141414", // Netflix black
    accent: "#FFFFFF",
    background: "#000000",
  },
  investor: {
    primary: "#0077B5", // LinkedIn blue
    secondary: "#000000",
    accent: "#FFFFFF",
    background: "#0A0A1A", // Dark blue-black
  },
  recruiter: {
    primary: "#6441A4", // Twitch purple
    secondary: "#0E0E10",
    accent: "#FFFFFF",
    background: "#0A0A0A",
  },
  community: {
    primary: "#FF9900", // Amazon orange
    secondary: "#232F3E", // Amazon dark blue
    accent: "#FFFFFF",
    background: "#111111",
  },
  adventurer: {
    primary: "#1DB954", // Spotify green
    secondary: "#191414", // Spotify black
    accent: "#FFFFFF",
    background: "#121212", // Spotify dark gray
  },
}

const ProfileContext = createContext<ProfileContextType>({
  activeProfile: null,
  setActiveProfile: () => {},
  profileColor: defaultProfileTheme.primary,
  profileTheme: defaultProfileTheme,
})

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [activeProfile, setActiveProfile] = useState<ProfileType>(null)
  const pathname = usePathname()

  // Extract profile from URL if available
  useEffect(() => {
    if (pathname) {
      const match = pathname.match(/\/profile\/([a-zA-Z]+)/)
      if (match && match[1]) {
        const profileName = match[1].toLowerCase() as ProfileType
        if (
          profileName === "stalker" ||
          profileName === "investor" ||
          profileName === "recruiter" ||
          profileName === "community" ||
          profileName === "adventurer"
        ) {
          setActiveProfile(profileName)
        }
      }
    }
  }, [pathname])

  // Get profile color
  const profileColor = activeProfile ? profileThemes[activeProfile].primary : defaultProfileTheme.primary

  // Get profile theme
  const profileTheme = activeProfile ? profileThemes[activeProfile] : defaultProfileTheme

  return (
    <ProfileContext.Provider value={{ activeProfile, setActiveProfile, profileColor, profileTheme }}>
      {children}
    </ProfileContext.Provider>
  )
}

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"

type ProfileType = "stalker" | "investor" | "recruiter" | "community" | "adventurer" | null

const PROFILE_STORAGE_KEY = "arul-active-profile"
const VALID_PROFILES = ["stalker", "investor", "recruiter", "community", "adventurer"] as const

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
  primary: "#E50914",
  secondary: "#141414",
  accent: "#FFFFFF",
  background: "#000000",
}

const profileThemes = {
  stalker: {
    primary: "#E50914",
    secondary: "#141414",
    accent: "#FFFFFF",
    background: "#000000",
  },
  investor: {
    primary: "#0077B5",
    secondary: "#000000",
    accent: "#FFFFFF",
    background: "#0A0A1A",
  },
  recruiter: {
    primary: "#6441A4",
    secondary: "#0E0E10",
    accent: "#FFFFFF",
    background: "#0A0A0A",
  },
  community: {
    primary: "#FF9900",
    secondary: "#232F3E",
    accent: "#FFFFFF",
    background: "#111111",
  },
  adventurer: {
    primary: "#1DB954",
    secondary: "#191414",
    accent: "#FFFFFF",
    background: "#121212",
  },
}

function isValidProfile(name: string | null | undefined): name is Exclude<ProfileType, null> {
  return Boolean(name && (VALID_PROFILES as readonly string[]).includes(name))
}

const ProfileContext = createContext<ProfileContextType>({
  activeProfile: null,
  setActiveProfile: () => {},
  profileColor: defaultProfileTheme.primary,
  profileTheme: defaultProfileTheme,
})

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [activeProfile, setActiveProfileState] = useState<ProfileType>(null)
  const [hydrated, setHydrated] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY)
      if (isValidProfile(stored)) setActiveProfileState(stored)
    } catch {
      // ignore storage errors
    }
    setHydrated(true)
  }, [])

  const setActiveProfile = (profile: ProfileType) => {
    setActiveProfileState(profile)
    try {
      if (profile) localStorage.setItem(PROFILE_STORAGE_KEY, profile)
      else localStorage.removeItem(PROFILE_STORAGE_KEY)
    } catch {
      // ignore storage errors
    }
  }

  useEffect(() => {
    if (!pathname || !hydrated) return
    const match = pathname.match(/\/profile\/([a-zA-Z]+)/)
    if (match?.[1]) {
      const profileName = match[1].toLowerCase()
      if (isValidProfile(profileName)) {
        setActiveProfile(profileName)
      }
    }
  }, [pathname, hydrated])

  const profileColor = activeProfile ? profileThemes[activeProfile].primary : defaultProfileTheme.primary
  const profileTheme = activeProfile ? profileThemes[activeProfile] : defaultProfileTheme

  return (
    <ProfileContext.Provider value={{ activeProfile, setActiveProfile, profileColor, profileTheme }}>
      {children}
    </ProfileContext.Provider>
  )
}

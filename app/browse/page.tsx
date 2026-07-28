"use client"

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import { profileData } from "@/lib/profile-data"
import ProfileCard from "@/components/profile-card"
import NetflixButton from "@/components/netflix-button"
import ThemeToggle from "@/components/theme-toggle"
import { toast } from "sonner"
import SiteFooter from "@/components/site-footer"

export default function Browse() {
  const router = useRouter()
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [manageMode, setManageMode] = useState(false)
  const profilesRef = useRef<HTMLUListElement>(null)

  const handleProfileSelect = (profileName: string) => {
    if (manageMode) {
      toast.message("Profile editing", {
        description: `Manage mode is a preview — select "${profileName}" again after exiting manage mode to enter.`,
      })
      return
    }
    if (selectedProfile) return
    setSelectedProfile(profileName)
    setTimeout(() => {
      router.push(`/profile/${profileName}`)
    }, 480)
  }

  const handleManageProfiles = () => {
    setManageMode((v) => !v)
    profilesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    toast(manageMode ? "Manage mode off" : "Manage Profiles", {
      description: manageMode
        ? "Select a profile to continue watching."
        : "Click a profile for options, or click Manage Profiles again to exit.",
    })
  }

  return (
    <>
      <main id="main-content" className="nf-page flex flex-col min-h-screen">
        <div className="nf-gutter pt-6 sm:pt-8 flex items-center justify-between gap-3">
          <a href="/" className="inline-block text-[clamp(1.25rem,2vw,1.75rem)] font-black text-[#E50914] tracking-tighter">
            ARUL
          </a>
          <ThemeToggle />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center nf-gutter py-[clamp(2rem,8vh,6rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key="browse-content"
              className="w-full max-w-[62.5rem] flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.h1
                className="text-nf-text text-center font-normal tracking-[0.01em] leading-[1.2] mb-[clamp(1.75rem,4vw,3rem)] px-2"
                style={{ fontSize: "var(--nf-watching)" }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {manageMode ? "Manage Profiles" : "Who's watching?"}
              </motion.h1>

              <motion.ul
                ref={profilesRef}
                className={`list-none m-0 p-0 w-full flex flex-wrap justify-center items-start gap-x-[clamp(1rem,2.5vw,2.75rem)] gap-y-[clamp(1.25rem,3vw,2rem)] mb-[clamp(1.75rem,4vw,3rem)] ${
                  manageMode ? "ring-1 ring-[color:var(--nf-border-strong)] rounded-sm p-4 sm:p-6" : ""
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
              >
                {profileData.map((profile, index) => (
                  <li key={profile.name} className="flex justify-center">
                    <ProfileCard
                      name={profile.name}
                      image={profile.image}
                      alt={profile.alt}
                      description={profile.description}
                      onClick={() => handleProfileSelect(profile.name)}
                      index={index}
                      isSelected={selectedProfile === profile.name || manageMode}
                    />
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className="w-full flex justify-center"
              >
                <NetflixButton
                  variant="manage"
                  size="md"
                  className="min-w-[11rem] max-w-full px-6"
                  onClick={handleManageProfiles}
                >
                  {manageMode ? "Done" : "Manage Profiles"}
                </NetflixButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        <SiteFooter />
      </main>
    </>
  )
}

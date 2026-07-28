"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa"
import NetflixButton from "./netflix-button"
import { personalData, stockPhotos } from "@/lib/personal-data"

export default function AboutMeHero() {
  return (
    <div className="relative min-h-[min(70vh,36rem)] overflow-hidden bg-nf-bg">
      <div className="absolute inset-0">
        <Image src={stockPhotos.hero} alt="" fill className="object-cover opacity-50" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-nf-veil via-transparent to-black/40" />
      </div>

      <div className="relative nf-gutter flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-10 pb-10 pt-8 min-h-[inherit]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-[4px] overflow-hidden border-2 border-white/20 shrink-0 shadow-2xl"
        >
          <Image src={stockPhotos.headshot} alt={personalData.fullName} fill className="object-cover" priority sizes="224px" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center md:text-left max-w-2xl pb-1"
        >
          <p className="text-[#E50914] text-sm font-semibold mb-2 tracking-wide uppercase">About</p>
          <h1 className="nf-billboard-title mb-3">{personalData.fullName}</h1>
          <p className="text-white/95 text-base sm:text-lg mb-3">{personalData.headline}</p>
          <p className="text-white/75 text-sm sm:text-base mb-4 max-w-xl">{personalData.shortBio}</p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-sm text-white/90 mb-5">
            {personalData.roles.map((role, i) => (
              <span key={role} className="inline-flex items-center">
                <span>{role}</span>
                {i < personalData.roles.length - 1 && <span className="mx-2 text-white/40">•</span>}
              </span>
            ))}
            <span className="mx-2 text-white/40">•</span>
            <span>{personalData.location.display}</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <NetflixButton href={personalData.social.linkedin} external variant="play" size="sm" icon={<FaLinkedin />}>
              LinkedIn
            </NetflixButton>
            <NetflixButton href={personalData.social.instagram} external variant="info" size="sm" icon={<FaInstagram />}>
              Instagram
            </NetflixButton>
            <NetflixButton href={personalData.contact.emailHref} variant="info" size="sm" icon={<FaEnvelope />}>
              Email
            </NetflixButton>
            <NetflixButton href="/contact" variant="primary" size="sm">
              Get in touch
            </NetflixButton>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

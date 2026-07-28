"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Info } from "lucide-react"
import Image from "next/image"
import NetflixButton from "./netflix-button"

interface HeroSectionProps {
  title: string
  description?: string
  backgroundImage?: string
  overlayText?: string
  rating?: string
  genres?: string[]
  playHref?: string
  moreInfoHref?: string
  playLabel?: string
  moreInfoLabel?: string
  onPlay?: () => void
  onMoreInfo?: () => void
}

export default function HeroSection({
  title,
  description,
  backgroundImage,
  rating = "PG",
  genres = [],
  playHref = "/about",
  moreInfoHref = "/work-experience",
  playLabel = "Play",
  moreInfoLabel = "More Info",
  onPlay,
  onMoreInfo,
}: HeroSectionProps) {
  const [imageError, setImageError] = useState(false)
  const showImage = Boolean(backgroundImage) && !imageError

  return (
    <section className="relative w-full h-[min(100svh,85vh)] min-h-[380px] sm:h-[min(56.25vw,85vh)] sm:min-h-[420px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {showImage ? (
          <Image
            src={backgroundImage!}
            alt=""
            fill
            className="object-cover object-[center_20%]"
            priority
            quality={95}
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-nf-bg">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_42%,rgba(229,9,20,0.38),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(90,90,90,0.22),transparent_48%)]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent w-[92%] sm:w-[70%] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-nf-veil via-transparent to-black/30 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-[35%] bg-gradient-to-t from-nf-veil to-transparent pointer-events-none" />
      </div>

      <div className="relative z-20 h-full flex items-end pb-[clamp(4.5rem,14%,8rem)] sm:pb-[clamp(5rem,12%,8rem)]">
        <div className="w-full nf-gutter">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="w-full max-w-[min(96%,38rem)] sm:max-w-[min(58%,36rem)] md:max-w-[min(48%,34rem)]"
          >
            <h1 className="nf-billboard-title mb-[0.45em]">{title}</h1>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-3">
              {genres.length > 0 && (
                <p className="nf-meta text-white/95 m-0">
                  {genres.map((genre, index) => (
                    <span key={genre} className="inline-flex items-center">
                      <span>{genre}</span>
                      {index < genres.length - 1 && (
                        <span className="mx-1.5 text-white/50" aria-hidden>
                          •
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              )}
              {rating && (
                <span
                  className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-[2px] text-[0.65rem] sm:text-[0.7rem] font-extrabold leading-none tracking-wide"
                  style={{ background: "var(--nf-rating-bg)", color: "var(--nf-rating-text)" }}
                >
                  {rating}
                </span>
              )}
            </div>

            {description && <p className="nf-synopsis mb-4 sm:mb-5 max-w-[36em]">{description}</p>}

            <div className="relative z-30 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <NetflixButton
                variant="play"
                size="lg"
                href={onPlay ? undefined : playHref}
                onClick={onPlay}
                icon={<Play className="fill-black text-black" fill="currentColor" strokeWidth={0} />}
              >
                {playLabel}
              </NetflixButton>
              <NetflixButton
                variant="info"
                size="lg"
                href={onMoreInfo ? undefined : moreInfoHref}
                onClick={onMoreInfo}
                icon={<Info strokeWidth={2.5} className="text-white" />}
              >
                {moreInfoLabel}
              </NetflixButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

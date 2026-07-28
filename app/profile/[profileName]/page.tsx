"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ContentRow from "@/components/content-row"
import NewsletterSignup from "@/components/newsletter-signup"
import SiteFooter from "@/components/site-footer"
import VideoPlayer from "@/components/video-player"
import { profileData } from "@/lib/profile-data"
import { mediaVideos, stockPhotos } from "@/lib/personal-data"
import { getProfileView } from "@/lib/profile-views"

const VALID_PROFILES = ["stalker", "investor", "recruiter", "community", "adventurer"] as const

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const profileName = String(params.profileName || "").toLowerCase()
  const [backgroundGif, setBackgroundGif] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const isValid = (VALID_PROFILES as readonly string[]).includes(profileName)

  useEffect(() => {
    if (!isValid) {
      router.replace("/browse")
      return
    }
    const profile = profileData.find((p) => p.name === profileName)
    setBackgroundGif(profile?.backgroundGif || "")
    const timer = setTimeout(() => setIsLoading(false), 280)
    return () => clearTimeout(timer)
  }, [profileName, isValid, router])

  if (!isValid || isLoading) {
    return (
      <div className="netflix-loader">
        <div className="netflix-loader-logo">
          <div className="netflix-loader-bar"></div>
        </div>
      </div>
    )
  }

  const view = getProfileView(profileName)
  const featuredVideo = mediaVideos[view.videoIndex] ?? mediaVideos[0]

  return (
    <>
      <Navbar />
      <main id="main-content" className="nf-page">
        <HeroSection
          title={view.title}
          description={view.description}
          backgroundImage={backgroundGif || `/images/placeholders/hero/${profileName}.svg`}
          rating={view.rating}
          genres={view.genres}
          playHref={view.playHref}
          moreInfoHref={view.moreInfoHref}
          playLabel={view.playLabel}
          moreInfoLabel={view.moreInfoLabel}
        />

        <div className="bg-nf-bg -mt-[clamp(3rem,7vw,5.5rem)] relative z-10 pb-[clamp(1.5rem,4vw,3rem)]">
          <div id="browse-rows" className="pt-2 sm:pt-3 overflow-x-hidden">
            {view.rows.map((row) => (
              <ContentRow key={row.title} title={row.title} items={row.items} />
            ))}
          </div>

          <section className="nf-gutter mt-4 mb-6">
            <div className="flex items-end justify-between gap-4 mb-3">
              <h2 className="text-[var(--nf-row-title)] font-semibold text-nf-secondary m-0">
                {profileName === "investor"
                  ? "Investor Briefing"
                  : profileName === "recruiter"
                    ? "Candidate Spotlight"
                    : profileName === "community"
                      ? "Community Desk"
                      : profileName === "adventurer"
                        ? "Adventure Trailer"
                        : "Trailers & Videos"}
              </h2>
              <Link href={view.panelCta.href} className="text-sm text-[#E50914] hover:underline shrink-0">
                {view.panelCta.label}
              </Link>
            </div>
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-4 items-start">
              <VideoPlayer
                src={featuredVideo.src}
                youtubeId={featuredVideo.youtubeId}
                thumbnailUrl={featuredVideo.thumbnail || stockPhotos.hero}
                title={featuredVideo.title}
              />
              <div className="bg-nf-elevated p-4 sm:p-5 rounded-[2px]">
                <p className="text-[#E50914] text-xs font-semibold uppercase tracking-wide mb-2">{view.panelEyebrow}</p>
                <h3 className="text-nf-text text-lg font-bold mb-2">{view.panelHeadline}</h3>
                <p className="text-nf-muted text-sm leading-relaxed mb-4">{view.panelBody}</p>
                <ul className="space-y-2 mb-4">
                  {view.panelBullets.map((b) => (
                    <li key={b.label} className="text-sm text-nf-secondary">
                      <span className="text-nf-text font-medium">{b.label}</span>
                      <span className="text-nf-dim"> — {b.detail}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={view.panelCta.href}
                  className="text-sm text-nf-text hover:text-[#E50914] underline-offset-2 hover:underline"
                >
                  {view.panelCta.label}
                </Link>
              </div>
            </div>
          </section>
        </div>

        <NewsletterSignup />
        <SiteFooter />
      </main>
    </>
  )
}

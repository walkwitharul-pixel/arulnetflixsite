import { resolveHeroImage } from "./design-tokens"

export const profileData = [
  {
    name: "stalker",
    image: "/images/profiles/stalker.svg",
    alt: "Stalker profile",
    backgroundGif: resolveHeroImage("stalker"),
    description: "Public highlights, ventures, and the full story feed",
  },
  {
    name: "investor",
    image: "/images/profiles/investor.svg",
    alt: "Investor profile",
    backgroundGif: resolveHeroImage("investor"),
    description: "Traction metrics, portfolio ventures, and deal-ready case studies",
  },
  {
    name: "recruiter",
    image: "/images/profiles/recruiter.svg",
    alt: "Recruiter profile",
    backgroundGif: resolveHeroImage("recruiter"),
    description: "Skills, education, career path, and leadership proof",
  },
  {
    name: "community",
    image: "/images/profiles/community.svg",
    alt: "Community Member profile",
    backgroundGif: resolveHeroImage("community"),
    description: "GrowthLab, events, testimonials, and collaboration paths",
  },
  {
    name: "adventurer",
    image: "/images/profiles/adventurer.svg",
    alt: "Adventurer profile",
    backgroundGif: resolveHeroImage("adventurer"),
    description: "Origin story, experiments, trailers, and what’s next",
  },
]

/** Netflix-inspired design tokens for the portfolio UI */
export const colors = {
  bg: {
    deepest: "#000000",
    base: "#141414",
    elevated: "#181818",
    surface: "#2F2F2F",
  },
  accent: {
    DEFAULT: "#E50914",
    soft: "#F40612",
    muted: "rgba(229, 9, 20, 0.15)",
    glow: "rgba(229, 9, 20, 0.45)",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B3B3B3",
    muted: "#808080",
  },
}

export const profiles = ["stalker", "investor", "recruiter", "community", "adventurer"] as const

export type ProfileName = (typeof profiles)[number]

export const profileColors: Record<ProfileName, string> = {
  stalker: "#E50914",
  investor: "#0077B5",
  recruiter: "#6441A4",
  community: "#FF9900",
  adventurer: "#1DB954",
}

/** Temporary stock posters — swap these files later with real images */
export const logoMap: Record<string, string> = {
  velantec: "/images/placeholders/posters/velantec.svg",
  "velantec-security": "/images/placeholders/posters/velantec-security.svg",
  onestopsg: "/images/placeholders/posters/onestopsg.svg",
  "onestopsg-seo": "/images/placeholders/posters/onestopsg-seo.svg",
  growthlab: "/images/placeholders/posters/growthlab.svg",
  "growthlab-community": "/images/placeholders/posters/growthlab-community.svg",
  "aval.sg/avan.sg": "/images/placeholders/posters/aval-sg-avan-sg.svg",
  avalsg: "/images/placeholders/posters/avalsg-ecommerce.svg",
  "avalsg-ecommerce": "/images/placeholders/posters/avalsg-ecommerce.svg",
  avan: "/images/placeholders/posters/aval-sg-avan-sg.svg",
  "mrassistant.ai": "/images/placeholders/posters/mrassistant-ai.svg",
  mrassistant: "/images/placeholders/posters/mrassistant-ai.svg",
  "oklah-sg-pte-ltd": "/images/placeholders/posters/oklah-sg-pte-ltd.svg",
  "velan-exports": "/images/placeholders/posters/velan-exports.svg",
  "mitraa-inn": "/images/placeholders/posters/mitraa-inn.svg",
  "murdoch-university": "/images/placeholders/posters/murdoch-university.svg",
  "kaplan-higher-education-academy": "/images/placeholders/posters/kaplan-higher-education-academy.svg",
  "sri-sai-ram-polytechnic-college": "/images/placeholders/posters/sri-sai-ram-polytechnic-college.svg",
  "bendemeer-secondary-school": "/images/placeholders/posters/bendemeer-secondary-school.svg",
  entrepreneurship: "/images/placeholders/posters/entrepreneurship.svg",
  "digital-marketing": "/images/placeholders/posters/digital-marketing.svg",
  "community-building": "/images/placeholders/posters/community-building.svg",
  "e-commerce": "/images/placeholders/posters/e-commerce.svg",
  "business-strategy": "/images/placeholders/posters/business-strategy.svg",
  "team-leadership": "/images/placeholders/posters/team-leadership.svg",
  seo: "/images/placeholders/posters/seo.svg",
  "social-media-marketing": "/images/placeholders/posters/social-media-marketing.svg",
  "content-marketing": "/images/placeholders/posters/content-marketing.svg",
  cybersecurity: "/images/placeholders/posters/cybersecurity.svg",
  "ai-&-voice-technology": "/images/placeholders/posters/ai-voice-technology.svg",
  "ai-voice-technology": "/images/placeholders/posters/ai-voice-technology.svg",
  "fashion-tech": "/images/placeholders/posters/fashion-tech.svg",
  "farrer-park-primary-school": "/images/placeholders/posters/farrer-park-primary-school.svg",
  "technical-fest": "/images/placeholders/posters/technical-fest.svg",
  "ug-hq": "/images/placeholders/posters/ug-hq.svg",
  "silver-medal": "/images/placeholders/posters/silver-medal.svg",
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "").replace(/--+/g, "-")
}

export function resolveThumbnail(idOrName: string, fallbackTitle?: string): string {
  const key = idOrName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "")
    .replace(/--+/g, "-")

  if (logoMap[key]) return logoMap[key]
  if (logoMap[idOrName.toLowerCase()]) return logoMap[idOrName.toLowerCase()]

  for (const [k, path] of Object.entries(logoMap)) {
    if (key.includes(k) || k.includes(key)) return path
  }

  // Prefer a stock poster over the gray placeholder.svg
  return "/images/placeholders/posters/default.svg"
}

export function resolveHeroImage(profileName: string): string {
  const name = profileName.toLowerCase()
  return `/images/placeholders/hero/${name}.svg`
}

/** Map timeline / venture names to in-app routes */
export function resolveContentLink(idOrName: string): string {
  const key = idOrName.toLowerCase()
  if (key.includes("velantec")) return "/projects/velantec"
  if (key.includes("onestop")) return "/projects/onestopsg"
  if (key.includes("growthlab")) return "/projects/growthlab"
  if (key.includes("aval") || key.includes("avan")) return "/projects/avalsg"
  if (key.includes("mrassistant")) return "/projects/mrassistant"
  if (key.includes("murdoch") || key.includes("kaplan") || key.includes("education") || key.includes("school") || key.includes("polytechnic") || key.includes("achievement") || key.includes("award") || key.includes("oklah") || key.includes("velan") || key.includes("mitraa")) {
    return "/work-experience"
  }
  return "/projects"
}

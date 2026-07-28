import { caseStudiesData } from "./case-studies-data"
import { projectsData } from "./projects-data"
import { skillsData } from "./skills-data"
import { timelineData } from "./timeline-data"
import { testimonialsData } from "./testimonials-data"
import { mediaVideos, personalData } from "./personal-data"
import { resolveThumbnail, resolveContentLink, slugify } from "./design-tokens"

export type ProfileViewId = "stalker" | "investor" | "recruiter" | "community" | "adventurer"

export interface ProfileRowItem {
  id: string
  title: string
  image: string
  link?: string
  badge?: string
}

export interface ProfileRow {
  title: string
  items: ProfileRowItem[]
}

export interface ProfileViewConfig {
  title: string
  description: string
  genres: string[]
  rating: string
  playHref: string
  moreInfoHref: string
  playLabel?: string
  moreInfoLabel?: string
  panelEyebrow: string
  panelHeadline: string
  panelBody: string
  panelBullets: { label: string; detail: string }[]
  panelCta: { label: string; href: string }
  videoIndex: number
  rows: ProfileRow[]
}

function toItems(
  entries: { id: string; title: string; image: string; link?: string; badge?: string }[],
): ProfileRowItem[] {
  return entries.map((e) => ({ ...e }))
}

function projectItems(ids: string[], badgeFor?: Record<string, string>) {
  return toItems(
    ids
      .map((id) => projectsData.find((p) => p.id === id))
      .filter(Boolean)
      .map((p) => ({
        id: p!.id,
        title: p!.title,
        image: p!.image,
        link: `/projects/${p!.id}`,
        badge: badgeFor?.[p!.id],
      })),
  )
}

function caseItems(ids: string[], badgeFor?: Record<string, string>) {
  return toItems(
    ids
      .map((id) => caseStudiesData.find((c) => c.id === id))
      .filter(Boolean)
      .map((c) => ({
        id: c!.id,
        title: c!.title,
        image: c!.image,
        link: `/case-studies/${c!.id}`,
        badge: badgeFor?.[c!.id],
      })),
  )
}

function skillItems(predicate: (s: (typeof skillsData)[number]) => boolean) {
  return toItems(
    skillsData.filter(predicate).slice(0, 10).map((s) => ({
      id: slugify(s.name),
      title: s.name,
      image: resolveThumbnail(s.name),
      link: `/skills#skill-${slugify(s.name)}`,
    })),
  )
}

function workItems(limit = 8) {
  return toItems(
    timelineData
      .filter((t) => t.timelineType === "work")
      .slice(0, limit)
      .map((t, i) => ({
        id: `work-${slugify(t.name)}-${i}`,
        title: `${t.title} · ${t.name}`,
        image: resolveThumbnail(t.name),
        link: resolveContentLink(t.name),
      })),
  )
}

function educationItems() {
  return toItems(
    timelineData
      .filter((t) => t.timelineType === "education")
      .map((t, i) => ({
        id: `edu-${slugify(t.name)}-${i}`,
        title: `${t.title}`,
        image: resolveThumbnail(t.name),
        link: "/work-experience",
      })),
  )
}

function achievementItems() {
  return toItems(
    timelineData
      .filter((t) => t.timelineType === "achievement")
      .map((t, i) => ({
        id: `ach-${slugify(t.name)}-${i}`,
        title: t.title,
        image: resolveThumbnail(t.name, t.title),
        link: "/work-experience",
      })),
  )
}

function testimonialItems() {
  return toItems(
    testimonialsData.map((t, i) => ({
      id: `testimonial-${i}`,
      title: `${t.name} — ${t.company}`,
      image: t.image,
      link: "/testimonials",
    })),
  )
}

function videoRowItems() {
  return toItems(
    mediaVideos.map((v) => ({
      id: v.id,
      title: v.title,
      image: v.thumbnail,
      link: "/about#videos",
    })),
  )
}

const metricTiles: ProfileRowItem[] = [
  {
    id: "metric-traffic",
    title: "150% Organic Traffic Lift",
    image: resolveThumbnail("onestopsg-seo"),
    link: "/case-studies/onestopsg-seo",
    badge: "TOP 10",
  },
  {
    id: "metric-members",
    title: "2,500+ Community Members",
    image: resolveThumbnail("growthlab-community"),
    link: "/case-studies/growthlab-community",
  },
  {
    id: "metric-startups",
    title: "1,200+ Startups",
    image: resolveThumbnail("growthlab"),
    link: "/projects/growthlab",
  },
  {
    id: "metric-security",
    title: "100+ Projects Delivered",
    image: resolveThumbnail("velantec"),
    link: "/projects/velantec",
  },
  {
    id: "metric-orders",
    title: "40+ Voice Languages",
    image: resolveThumbnail("mrassistant-ai"),
    link: "/projects/mrassistant",
  },
  {
    id: "metric-ventures",
    title: "4+ Brands in Portfolio",
    image: resolveThumbnail("velantec"),
    link: "/projects",
  },
]

export const profileViews: Record<ProfileViewId, ProfileViewConfig> = {
  investor: {
    title: "Investor Desk",
    description:
      "Traction, venture stack, and case-study outcomes across AI, marketing, e-commerce, and community — built for diligence and partnership conversations.",
    genres: ["Traction", "Ventures", "Metrics"],
    rating: "Dealflow",
    playHref: "/case-studies",
    moreInfoHref: "/contact",
    playLabel: "View Traction",
    moreInfoLabel: "Talk Partnership",
    panelEyebrow: "For investors",
    panelHeadline: "Portfolio & traction snapshot",
    panelBody:
      "Multi-venture founder with live businesses in AI/cyber, digital marketing, ethnic fashion e-commerce, founder community, and voice AI.",
    panelBullets: [
      { label: "ONESTOPSG", detail: "Full-funnel agency · Google & Meta Partner" },
      { label: "GrowthLab", detail: "2,500+ members · 1,200+ startups · $500K+ funding" },
      { label: "VELANTEC", detail: "Parent company · 100+ projects · 4+ brands" },
      { label: "MrAssistant.Ai", detail: "Voice AI · 40+ languages · white-label" },
    ],
    panelCta: { label: "Discuss opportunities →", href: "/contact" },
    videoIndex: 2,
    rows: [
      {
        title: "Traction Highlights",
        items: metricTiles,
      },
      {
        title: "Venture Portfolio",
        items: projectItems(["velantec", "onestopsg", "avalsg", "growthlab", "mrassistant"], {
          velantec: "CORE",
        }),
      },
      {
        title: "Case Studies with Results",
        items: caseItems(
          ["onestopsg-seo", "growthlab-community", "velantec-security", "avalsg-ecommerce", "mrassistant-ai"],
          { "onestopsg-seo": "TOP 10" },
        ),
      },
      {
        title: "Business Skills",
        items: skillItems((s) => s.category === "Business" || s.category === "Operations"),
      },
      {
        title: "Founder Timeline",
        items: workItems(6),
      },
    ],
  },

  recruiter: {
    title: "Recruiter Briefing",
    description:
      "Skills, leadership proof, education, and delivery outcomes — framed for hiring managers evaluating a founder-operator hybrid.",
    genres: ["Skills", "Leadership", "Experience"],
    rating: "Hire-ready",
    playHref: "/skills",
    moreInfoHref: "/work-experience",
    playLabel: "View Skills",
    moreInfoLabel: "Full Timeline",
    panelEyebrow: "For recruiters",
    panelHeadline: "Operator + founder profile",
    panelBody:
      "Cyber Security & Forensics graduate who ships products, leads teams, and owns P&L across marketing, tech, and retail.",
    panelBullets: [
      { label: "Education", detail: personalData.educationHighlight },
      { label: "Strengths", detail: "Leadership, AI, marketing, e-commerce" },
      { label: "Experience", detail: "Founder roles + agency + logistics" },
      { label: "Location", detail: personalData.location.display },
    ],
    panelCta: { label: "Request CV / chat →", href: "/contact" },
    videoIndex: 0,
    rows: [
      {
        title: "Top Skills for Roles",
        items: skillItems((s) => s.category === "Technology" || s.proficiency >= 90),
      },
      {
        title: "Leadership & Delivery",
        items: caseItems(["velantec-security", "onestopsg-seo", "mrassistant-ai", "avalsg-ecommerce"]),
      },
      {
        title: "Career Path",
        items: workItems(8),
      },
      {
        title: "Education",
        items: educationItems(),
      },
      {
        title: "Awards & Recognition",
        items: achievementItems(),
      },
      {
        title: "Marketing & Growth Skills",
        items: skillItems((s) => s.category === "Marketing"),
      },
    ],
  },

  community: {
    title: "Community Lounge",
    description:
      "GrowthLab, founder networks, events, and collaborations — for community members, partners, and fellow builders.",
    genres: ["Community", "Events", "Network"],
    rating: "Members+",
    playHref: "/projects/growthlab",
    moreInfoHref: "/testimonials",
    playLabel: "Explore GrowthLab",
    moreInfoLabel: "Hear from Members",
    panelEyebrow: "For community",
    panelHeadline: "Build with the network",
    panelBody:
      "GrowthLab is LinkedIn for startups — network, business pages, jobs, fundraising, mentorship, and AI tools. Join the circle or collaborate on events in Singapore.",
    panelBullets: [
      { label: "Members", detail: "2,500+ founders, investors & innovators" },
      { label: "Startups", detail: "1,200+ ventures on the platform" },
      { label: "Events", detail: "Workshops with Claude AI, Affinidi, *SCAPE partners" },
      { label: "Contact", detail: "hello@growthlab.sg · +65 9737 1722" },
    ],
    panelCta: { label: "Join / partner →", href: "/contact" },
    videoIndex: 4,
    rows: [
      {
        title: "Because You’re in the Community",
        items: caseItems(["growthlab-community", "onestopsg-seo"], { "growthlab-community": "TOP 10" }),
      },
      {
        title: "Community Ventures",
        items: projectItems(["growthlab", "onestopsg", "velantec", "mrassistant"]),
      },
      {
        title: "What Members Say",
        items: testimonialItems(),
      },
      {
        title: "Community-Building Skills",
        items: skillItems(
          (s) =>
            s.name.toLowerCase().includes("community") ||
            s.name.toLowerCase().includes("leadership") ||
            s.name.toLowerCase().includes("entrepreneur"),
        ),
      },
      {
        title: "Events & Story",
        items: videoRowItems().filter((v) => ["growthlab", "intro", "philosophy"].includes(v.id)),
      },
      {
        title: "Meet the Founder Journey",
        items: workItems(5),
      },
    ],
  },

  adventurer: {
    title: "Adventure Mode",
    description:
      "The wild ride from polytechnic projects to multi-venture founder — experiments, pivots, and what’s next.",
    genres: ["Journey", "Experiments", "Next"],
    rating: "Explorer",
    playHref: "/about",
    moreInfoHref: "/projects",
    playLabel: "Start the Story",
    moreInfoLabel: "See Ventures",
    panelEyebrow: "For adventurers",
    panelHeadline: "Follow the plot twists",
    panelBody:
      "From NCC camps and techno-fests to AI voice agents and ethnic fashion — this profile is the cinematic cut of the journey.",
    panelBullets: [
      { label: "Origin", detail: "Builder mindset from polytech → Murdoch" },
      { label: "Plot", detail: "Marketing → e-commerce → AI & community" },
      { label: "Now", detail: "VELANTEC ecosystem + MrAssistant.Ai" },
      { label: "Next", detail: "Scale voice AI & founder networks" },
    ],
    panelCta: { label: "Watch the journey →", href: "/about#videos" },
    videoIndex: 1,
    rows: [
      {
        title: "New Episodes",
        items: projectItems(["mrassistant", "growthlab", "velantec"], { mrassistant: "NEW" }),
      },
      {
        title: "Origin Story",
        items: [...educationItems().slice(0, 3), ...achievementItems().slice(0, 3)],
      },
      {
        title: "Season Highlights",
        items: caseItems(["avalsg-ecommerce", "growthlab-community", "mrassistant-ai", "onestopsg-seo"]),
      },
      {
        title: "Continue the Adventure",
        items: workItems(6),
      },
      {
        title: "Trailers",
        items: videoRowItems(),
      },
      {
        title: "Power-Ups (Skills)",
        items: skillItems((s) => s.proficiency > 85),
      },
    ],
  },

  stalker: {
    title: "Deep Dive",
    description:
      "You’ve been watching — here’s the full public feed: hits, ventures, story, and how to reach out without the awkwardness.",
    genres: ["Highlights", "Story", "Connect"],
    rating: "Fan cut",
    playHref: "/about",
    moreInfoHref: "/projects",
    playLabel: "Play Story",
    moreInfoLabel: "Browse Ventures",
    panelEyebrow: "For curious visitors",
    panelHeadline: `${personalData.fullName} — the public cut`,
    panelBody: personalData.shortBio,
    panelBullets: personalData.venturesSummary.slice(0, 4).map((v) => ({
      label: v.name,
      detail: v.blurb,
    })),
    panelCta: { label: "Full biography →", href: "/about" },
    videoIndex: 0,
    rows: [
      {
        title: "Trending Now",
        items: caseItems(
          ["onestopsg-seo", "growthlab-community", "velantec-security", "avalsg-ecommerce"],
          { "onestopsg-seo": "TOP 10" },
        ),
      },
      {
        title: "My Ventures",
        items: projectItems(["velantec", "onestopsg", "avalsg", "growthlab", "mrassistant"]),
      },
      {
        title: "Popular on Arul",
        items: skillItems(() => true).slice(0, 8),
      },
      {
        title: "Because You Watched Entrepreneurship",
        items: caseItems(["mrassistant-ai", "avalsg-ecommerce", "growthlab-community", "onestopsg-seo"]),
      },
      {
        title: "Story & Media",
        items: videoRowItems(),
      },
      {
        title: "Education & Achievements",
        items: [...educationItems().slice(0, 3), ...achievementItems().slice(0, 3)],
      },
    ],
  },
}

export function getProfileView(id: string): ProfileViewConfig {
  if (id in profileViews) return profileViews[id as ProfileViewId]
  return profileViews.recruiter
}

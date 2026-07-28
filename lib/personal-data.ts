/**
 * Single source of truth for Arul's personal details.
 * Sourced from LinkedIn, velantec.com, growthlab.sg, mrassistant.ai, onestopsg.com
 * Update this file once — contact, about, footer, and heroes read from here.
 */
export const personalData = {
  fullName: "Arul Murugan",
  firstName: "Arul",
  headline: "Founder & Group CEO · VELANTEC · GrowthLab · ONESTOPSG · MrAssistant.Ai",
  tagline:
    "Building tomorrow's digital brands with purpose — AI, cybersecurity, marketing, and ASEAN's startup ecosystem from Singapore.",
  shortBio:
    "I'm Arul Murugan — Founder & Group CEO of VELANTEC, the Singapore parent company behind ONESTOPSG, GrowthLab, Aval.sg / Avan.sg, and MrAssistant.Ai. I build technology and communities that turn ideas into scalable ventures.",
  longBio: [
    "I'm Arul Murugan, Founder and Group CEO based in Singapore. Through VELANTEC I lead a portfolio of digital ventures that combine strategy, design, communication, and technology to create experiences that connect with people and generate real value for brands.",
    "VELANTEC is our strategic home for innovative digital products — specializing in web experience, branding, digital products & services, and strategy & growth. Our portfolio includes MrAssistant.Ai (AI voice agents), GrowthLab (startup ecosystem), ONESTOPSG (marketing & social), and more.",
    "As Founder & CEO of GrowthLab, I'm building AI-powered infrastructure for ASEAN's startup ecosystem — a \"LinkedIn for startups\" that helps founders, investors, students, and innovators connect, launch, and grow. Our mission is to bridge the gap between innovation and opportunity across fragmented markets.",
    "With a background in Cyber Security & Forensics and computer science from Murdoch University, I recognized that ASEAN loses billions in missed connections across tens of thousands of startups. GrowthLab serves as an intelligence layer for VCs, government innovation agencies, accelerators, and corporate venture arms.",
    "ONESTOPSG is our full-service marketing and social media agency — brand, demand, and digital product as one system — certified with Google, Meta, TikTok, HubSpot, and more, serving SMEs and funded brands across Singapore and Southeast Asia since 2016.",
    "MrAssistant.Ai is our no-code AI voice agent platform: automate inbound and outbound phone calls, appointments, support, and sales in 40+ languages — with white-label options for agencies and call centers.",
    "If you're a founder, investor, operator, or collaborator — let's connect. I'm always open to partnerships, speaking, and shared learning through GrowthLab or any of our ventures.",
  ],
  linkedinAbout:
    "Founder and Group CEO across ONESTOPSG and the VELANTEC venture stack. Founded VELANTEC as the parent company for ONESTOPSG, Aval.sg, Avan.sg, GrowthLab.sg, and technology ventures specializing in AI, cybersecurity, and software development. Committed to transforming the digital landscape with scalable, secure, and future-focused technologies. Open to collaborations and partnerships.",
  roles: ["Founder", "Group CEO", "Ecosystem Builder", "Technologist"],
  location: {
    city: "Singapore",
    region: "Singapore",
    hybrid: "Singapore (HQ) · India & global network",
    display: "Singapore",
    address: "2 Orchard Link, Singapore 237978",
  },
  contact: {
    email: "arulmuruganvelusamy@hotmail.com",
    growthlabEmail: "hello@growthlab.sg",
    phone: "+65 9737 1722",
    phoneHref: "tel:+6597371722",
    emailHref: "mailto:arulmuruganvelusamy@hotmail.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/arul-murugan-525b321a7/",
    instagram: "https://www.instagram.com/walkwitharul",
  },
  educationHighlight: "Cyber Security & Forensics · Computer Science — Murdoch University",
  focusAreas: [
    "AI Voice Agents",
    "Cybersecurity",
    "Startup Ecosystem Infrastructure",
    "Digital Marketing & Branding",
    "E-commerce",
    "Community Building",
  ],
  venturesSummary: [
    {
      name: "VELANTEC",
      role: "Founder & Group CEO",
      blurb: "Singapore parent company — strategy, design, tech & growth for digital brands",
      url: "https://www.velantec.com",
    },
    {
      name: "GrowthLab",
      role: "Founder & CEO",
      blurb: "Global startup ecosystem — \"LinkedIn for startups\" · 2,500+ members",
      url: "https://www.growthlab.sg",
    },
    {
      name: "ONESTOPSG",
      role: "Founder & CEO",
      blurb: "Full-service marketing & social agency · Google & Meta Partner",
      url: "https://www.onestopsg.com",
    },
    {
      name: "MrAssistant.Ai",
      role: "Founder",
      blurb: "No-code AI voice agents for phone automation · 40+ languages",
      url: "https://www.mrassistant.ai",
    },
    {
      name: "Aval.sg / Avan.sg",
      role: "Founder & CEO",
      blurb: "South Indian ethnic fashion e-commerce in Singapore",
      url: "https://www.aval.sg",
    },
  ],
  quotes: [
    {
      source: "GrowthLab",
      text: "I founded GrowthLab with a simple vision: to bridge the gap between innovation and opportunity. Every entrepreneur deserves access to the right network, resources, and support to turn their ideas into reality.",
    },
  ],
  highlights: [
    "VELANTEC: 4+ brands in portfolio · 100+ projects delivered · 10+ years building",
    "GrowthLab: 2,500+ members · 1,200+ startups · $500K+ funding facilitated",
    "GrowthLab partners include Google, Microsoft, Alibaba Cloud, Enterprise Singapore, SGInnovate, IMDA, NUS, SMU, Murdoch University",
    "ONESTOPSG: Certified Google Partner, Meta Business Partner, TikTok, HubSpot & more",
    "MrAssistant.Ai: 40+ languages · 150+ countries for numbers · 250+ no-code integrations",
  ],
  availability: "Open to collaborations, speaking, investor intros, and select partnerships",
  languages: ["English", "Tamil"],
} as const

/** Paths for photos you can drop in later — keep filenames, replace file contents */
export const stockPhotos = {
  headshot: "/images/stock/arul-headshot.svg",
  hero: "/images/stock/arul-hero.svg",
  speaking: "/images/stock/arul-speaking.svg",
  office: "/images/stock/arul-office.svg",
  team: "/images/stock/arul-team.svg",
  casual: "/images/stock/arul-casual.svg",
  networking: "/images/stock/arul-networking.svg",
  award: "/images/stock/arul-award.svg",
} as const

/**
 * Videos — prefer local files under /public/videos/
 * Drop your .mp4 in and keep the same filename, OR set youtubeId.
 */
export const mediaVideos = [
  {
    id: "intro",
    title: "Introduction — Arul Murugan",
    description: "Founder journey across VELANTEC, GrowthLab, ONESTOPSG, and MrAssistant.Ai.",
    thumbnail: stockPhotos.hero,
    src: "/videos/intro.mp4",
    youtubeId: "",
    duration: "0:45",
    category: "about",
  },
  {
    id: "philosophy",
    title: "Building Brands with Purpose",
    description: "How VELANTEC combines strategy, design, communication, and technology.",
    thumbnail: "/images/placeholders/posters/entrepreneurship.svg",
    src: "/videos/philosophy.mp4",
    youtubeId: "",
    duration: "2:10",
    category: "about",
  },
  {
    id: "velantec",
    title: "VELANTEC Overview",
    description: "Singapore parent company for digital brands and ventures.",
    thumbnail: "/images/placeholders/posters/velantec.svg",
    src: "/videos/velantec.mp4",
    youtubeId: "",
    duration: "1:30",
    category: "ventures",
  },
  {
    id: "mrassistant",
    title: "MrAssistant.Ai Demo",
    description: "No-code AI voice agents for phone call automation.",
    thumbnail: "/images/placeholders/posters/mrassistant-ai.svg",
    src: "/videos/mrassistant.mp4",
    youtubeId: "",
    duration: "1:45",
    category: "ventures",
  },
  {
    id: "growthlab",
    title: "GrowthLab Community",
    description: "LinkedIn for startups — connect, launch, fund, and grow.",
    thumbnail: "/images/placeholders/posters/growthlab.svg",
    src: "/videos/growthlab.mp4",
    youtubeId: "",
    duration: "1:20",
    category: "community",
  },
  {
    id: "onestopsg",
    title: "ONESTOPSG in Action",
    description: "Brand, demand, and digital product as one growth engine.",
    thumbnail: "/images/placeholders/posters/onestopsg.svg",
    src: "/videos/onestopsg.mp4",
    youtubeId: "",
    duration: "1:15",
    category: "ventures",
  },
] as const

export type MediaVideo = (typeof mediaVideos)[number]

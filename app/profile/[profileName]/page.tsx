"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import NetflixHero from "@/components/netflix-hero"
import ContentRow from "@/components/content-row"
import InteractiveTimeline from "@/components/interactive-timeline"
import CaseStudiesCarousel from "@/components/case-studies-carousel"
import ClientLogos from "@/components/client-logos"
import SkillVisualization from "@/components/skill-visualization"
import JourneyHighlights from "@/components/journey-highlights"
import NewsletterSignup from "@/components/newsletter-signup"
import { profileData } from "@/lib/profile-data"
import { timelineData } from "@/lib/timeline-data"
import { skillsData } from "@/lib/skills-data"
import { useProfile } from "@/context/profile-context"
import { motion } from "framer-motion"

// Convert timeline data to the format expected by InteractiveTimeline
const careerTimelineItems = timelineData
  .filter((item) => item.timelineType === "work")
  .map((item) => ({
    id: item.name.toLowerCase().replace(/\s+/g, "-"),
    title: `${item.title} at ${item.name}`,
    date: item.dateRange,
    description: item.summaryPoints,
    image: `/placeholder.svg?height=160&width=280&text=${encodeURIComponent(item.name)}`,
    type: "work" as const,
  }))

const educationTimelineItems = timelineData
  .filter((item) => item.timelineType === "education")
  .map((item) => ({
    id: item.name.toLowerCase().replace(/\s+/g, "-"),
    title: `${item.title} - ${item.name}`,
    date: item.dateRange,
    description: item.summaryPoints,
    image: `/placeholder.svg?height=160&width=280&text=${encodeURIComponent(item.name)}`,
    type: "education" as const,
  }))

const achievementTimelineItems = timelineData
  .filter((item) => item.timelineType === "achievement")
  .map((item) => ({
    id: item.name.toLowerCase().replace(/\s+/g, "-"),
    title: `${item.title}`,
    date: item.dateRange,
    description: item.summaryPoints,
    image: `/placeholder.svg?height=160&width=280&text=${encodeURIComponent(item.name)}`,
    type: "achievement" as const,
  }))

// Journey highlights
const journeyHighlights = [
  {
    id: "highlight-1",
    title: "Founded VELANTEC",
    date: "February 2025",
    description: "Launched a cutting-edge tech firm focused on AI, cybersecurity, and software solutions.",
    image: "/placeholder.svg?height=600&width=1200&text=VELANTEC+Highlight",
    type: "work" as const,
    timelineId: "velantec",
  },
  {
    id: "highlight-2",
    title: "Graduated from Murdoch University",
    date: "March 2024",
    description: "Completed Bachelor of Science in Cyber Security & Forensics.",
    image: "/placeholder.svg?height=600&width=1200&text=Murdoch+University+Highlight",
    type: "education" as const,
    timelineId: "murdoch-university",
  },
  {
    id: "highlight-3",
    title: "Launched Aval.sg/Avan.sg",
    date: "October 2023",
    description: "Created e-commerce platforms for authentic South Indian ethnic wear in Singapore.",
    image: "/placeholder.svg?height=600&width=1200&text=Aval.sg+Highlight",
    type: "work" as const,
    timelineId: "aval.sg/avan.sg",
  },
]

// Sample case studies
const caseStudies = [
  {
    id: "onestopsg-seo",
    title: "ONESTOPSG: Digital Marketing Success",
    description: "Increased organic traffic by 150% for an e-commerce client through comprehensive digital strategy.",
    image: "/placeholder.svg?height=180&width=320&text=Digital+Marketing+Case+Study",
    metrics: ["150% Traffic Increase", "40% Conversion Rate"],
    link: "/case-studies/onestopsg-seo",
  },
  {
    id: "growthlab-community",
    title: "GrowthLab: Community Building",
    description: "Built a thriving startup community with over 500 active members in Singapore.",
    image: "/placeholder.svg?height=180&width=320&text=Community+Building+Case+Study",
    metrics: ["500+ Members", "20+ Events"],
    link: "/case-studies/growthlab-community",
  },
  {
    id: "velantec-security",
    title: "VELANTEC: Cybersecurity Solution",
    description: "Implemented robust security measures for a financial institution, preventing potential breaches.",
    image: "/placeholder.svg?height=180&width=320&text=Cybersecurity+Case+Study",
    metrics: ["100% Security Improvement", "Zero Breaches"],
    link: "/case-studies/velantec-security",
  },
  {
    id: "avalsg-ecommerce",
    title: "Aval.sg: E-commerce Growth",
    description: "Scaled e-commerce operations to handle 200+ orders per month with efficient fulfillment.",
    image: "/placeholder.svg?height=180&width=320&text=E-commerce+Case+Study",
    metrics: ["200+ Monthly Orders", "95% Customer Satisfaction"],
    link: "/case-studies/avalsg-ecommerce",
  },
]

// Client logos
const clientLogos = [
  {
    id: "client1",
    name: "Tech Innovations Pte Ltd",
    image: "/placeholder.svg?height=80&width=120&text=Tech+Innovations",
    link: "https://example.com/tech-innovations",
  },
  {
    id: "client2",
    name: "StartupSG Ventures",
    image: "/placeholder.svg?height=80&width=120&text=StartupSG",
    link: "https://example.com/startupsg",
  },
  {
    id: "client3",
    name: "Innovative Solutions Asia",
    image: "/placeholder.svg?height=80&width=120&text=Innovative+Solutions",
    link: "https://example.com/innovative-solutions",
  },
  {
    id: "client4",
    name: "Singapore Retail Group",
    image: "/placeholder.svg?height=80&width=120&text=SG+Retail",
    link: "https://example.com/sg-retail",
  },
  {
    id: "client5",
    name: "Global Tech Partners",
    image: "/placeholder.svg?height=80&width=120&text=Global+Tech",
    link: "https://example.com/global-tech",
  },
  {
    id: "client6",
    name: "Digital Marketing Alliance",
    image: "/placeholder.svg?height=80&width=120&text=DM+Alliance",
    link: "https://example.com/dm-alliance",
  },
]

// Top skills for visualization
const topSkills = skillsData.slice(0, 8)

// Profile-specific content
const profileSpecificContent = {
  stalker: {
    title: "Stalker View",
    description: "Explore my journey through the lens of someone who's been following my work",
    sections: ["journey", "timeline", "skills", "case-studies"],
    highlightedSkills: skillsData.filter((skill) => skill.category === "Marketing" || skill.category === "Business"),
  },
  investor: {
    title: "Investor View",
    description: "Discover investment opportunities and business metrics across my ventures",
    sections: ["case-studies", "clients", "timeline", "skills"],
    highlightedSkills: skillsData.filter((skill) => skill.category === "Business" || skill.category === "Operations"),
  },
  recruiter: {
    title: "Recruiter View",
    description: "View my portfolio from a professional recruitment perspective",
    sections: ["skills", "timeline", "case-studies", "clients"],
    highlightedSkills: skillsData.filter((skill) => skill.category === "Technology" || skill.category === "Operations"),
  },
  community: {
    title: "Community View",
    description: "Learn about my community building initiatives and networking opportunities",
    sections: ["journey", "clients", "case-studies", "skills"],
    highlightedSkills: skillsData.filter((skill) => skill.category === "Business" || skill.name.includes("Community")),
  },
  adventurer: {
    title: "Adventurer View",
    description: "Join me on my entrepreneurial adventures and see the journey unfold",
    sections: ["journey", "timeline", "case-studies", "skills"],
    highlightedSkills: skillsData.filter((skill) => skill.proficiency > 85),
  },
}

export default function ProfilePage() {
  const params = useParams()
  const { profileName } = params
  const { activeProfile, profileTheme } = useProfile()
  const [backgroundGif, setBackgroundGif] = useState("")
  const [activeTimelineType, setActiveTimelineType] = useState<"career" | "education" | "achievement">("career")
  const careerTimelineRef = useRef<HTMLDivElement>(null)
  const educationTimelineRef = useRef<HTMLDivElement>(null)
  const achievementTimelineRef = useRef<HTMLDivElement>(null)
  const [backgroundImageError, setBackgroundImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Find the matching profile to get the background gif
    const profile = profileData.find((p) => p.name === profileName)
    if (profile) {
      setBackgroundGif(profile.backgroundGif)
    }

    // Simulate loading for Netflix-style transition
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [profileName])

  // Default to recruiter if profile name is not valid
  const validProfileName = ["stalker", "investor", "recruiter", "community", "adventurer"].includes(
    profileName as string,
  )
    ? (profileName as string)
    : "recruiter"

  // Get profile-specific content
  const currentProfileContent = profileSpecificContent[validProfileName as keyof typeof profileSpecificContent]

  const handleHighlightClick = (timelineId: string) => {
    // Find if the timeline ID is in career or education
    const isCareer = careerTimelineItems.some((item) => item.id === timelineId)
    const isEducation = educationTimelineItems.some((item) => item.id === timelineId)
    const isAchievement = achievementTimelineItems.some((item) => item.id === timelineId)

    if (isCareer) {
      setActiveTimelineType("career")
      // Scroll to career timeline
      if (careerTimelineRef.current) {
        careerTimelineRef.current.scrollIntoView({ behavior: "smooth" })
      }
    } else if (isEducation) {
      setActiveTimelineType("education")
      // Scroll to education timeline
      if (educationTimelineRef.current) {
        educationTimelineRef.current.scrollIntoView({ behavior: "smooth" })
      }
    } else if (isAchievement) {
      setActiveTimelineType("achievement")
      // Scroll to achievement timeline
      if (achievementTimelineRef.current) {
        achievementTimelineRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const handleBackgroundImageError = () => {
    setBackgroundImageError(true)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Render sections based on profile-specific order
  const renderSection = (sectionName: string) => {
    switch (sectionName) {
      case "journey":
        return (
          <motion.section key="journey" variants={itemVariants} aria-labelledby="journey-highlights-heading">
            <h2 id="journey-highlights-heading" className="sr-only">
              Journey Highlights
            </h2>
            <JourneyHighlights highlights={journeyHighlights} onHighlightClick={handleHighlightClick} />
          </motion.section>
        )
      case "timeline":
        return (
          <motion.div key="timeline" variants={itemVariants}>
            <div className="bg-netflix-black py-8">
              <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-center mb-8" role="tablist" aria-label="Timeline categories">
                  <div className="inline-flex rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActiveTimelineType("career")}
                      className={`px-6 py-2 text-sm font-medium ${
                        activeTimelineType === "career"
                          ? `bg-[${profileTheme.primary}] text-white`
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      } ${activeTimelineType === "career" ? "rounded-l-lg" : ""}`}
                      role="tab"
                      aria-selected={activeTimelineType === "career"}
                      aria-controls="career-timeline"
                      id="career-tab"
                      style={{ backgroundColor: activeTimelineType === "career" ? profileTheme.primary : undefined }}
                    >
                      Career
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTimelineType("education")}
                      className={`px-6 py-2 text-sm font-medium ${
                        activeTimelineType === "education"
                          ? `bg-[${profileTheme.primary}] text-white`
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                      role="tab"
                      aria-selected={activeTimelineType === "education"}
                      aria-controls="education-timeline"
                      id="education-tab"
                      style={{ backgroundColor: activeTimelineType === "education" ? profileTheme.primary : undefined }}
                    >
                      Education
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTimelineType("achievement")}
                      className={`px-6 py-2 text-sm font-medium rounded-r-lg ${
                        activeTimelineType === "achievement"
                          ? `bg-[${profileTheme.primary}] text-white`
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                      role="tab"
                      aria-selected={activeTimelineType === "achievement"}
                      aria-controls="achievement-timeline"
                      id="achievement-tab"
                      style={{
                        backgroundColor: activeTimelineType === "achievement" ? profileTheme.primary : undefined,
                      }}
                    >
                      Achievements
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={careerTimelineRef}
              className={activeTimelineType === "career" ? "block" : "hidden"}
              id="career-timeline"
              role="tabpanel"
              aria-labelledby="career-tab"
            >
              <InteractiveTimeline items={careerTimelineItems} title="Career Journey" />
            </div>

            <div
              ref={educationTimelineRef}
              className={activeTimelineType === "education" ? "block" : "hidden"}
              id="education-timeline"
              role="tabpanel"
              aria-labelledby="education-tab"
            >
              <InteractiveTimeline items={educationTimelineItems} title="Education" />
            </div>

            <div
              ref={achievementTimelineRef}
              className={activeTimelineType === "achievement" ? "block" : "hidden"}
              id="achievement-timeline"
              role="tabpanel"
              aria-labelledby="achievement-tab"
            >
              <InteractiveTimeline items={achievementTimelineItems} title="Achievements & Awards" />
            </div>
          </motion.div>
        )
      case "skills":
        return (
          <motion.section key="skills" variants={itemVariants} aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="sr-only">
              Skills
            </h2>
            <SkillVisualization
              skills={currentProfileContent.highlightedSkills || topSkills}
              title={`Top Skills for ${validProfileName.charAt(0).toUpperCase() + validProfileName.slice(1)}s`}
            />
          </motion.section>
        )
      case "case-studies":
        return (
          <motion.section key="case-studies" variants={itemVariants} aria-labelledby="case-studies-heading">
            <h2 id="case-studies-heading" className="sr-only">
              Case Studies
            </h2>
            <CaseStudiesCarousel caseStudies={caseStudies} title="Case Studies" />
          </motion.section>
        )
      case "clients":
        return (
          <motion.section key="clients" variants={itemVariants} aria-labelledby="clients-heading">
            <h2 id="clients-heading" className="sr-only">
              Clients and Partners
            </h2>
            <ClientLogos logos={clientLogos} title="Clients & Partners" />
          </motion.section>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="netflix-loader">
        <div className="netflix-loader-logo">
          <div className="netflix-loader-bar"></div>
        </div>
      </div>
    )
  }

  // Convert case studies and other content to Netflix-style rows
  const netflixContentRows = [
    {
      title: "Featured Ventures",
      items: caseStudies.map((study) => ({
        id: study.id,
        title: study.title,
        image: study.image,
        link: study.link,
        badge: study.id === "onestopsg-seo" ? "TOP 10" : undefined,
      })),
    },
    {
      title: "Career Journey",
      items: careerTimelineItems.slice(0, 6).map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
      })),
    },
    {
      title: "Skills & Expertise",
      items: topSkills.map((skill) => ({
        id: skill.name.toLowerCase(),
        title: skill.name,
        image: `/placeholder.svg?height=180&width=320&text=${encodeURIComponent(skill.name)}`,
      })),
    },
  ]

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-black min-h-screen">
        {/* Netflix Hero Section */}
        <NetflixHero
          title={currentProfileContent.title}
          description={currentProfileContent.description}
          backgroundImage={backgroundGif}
          overlayText="Five kids all in one barn and no parents. Oh!"
          rating="PG"
          genres={["Entrepreneurship", "Technology", "Business"]}
        />

        {/* Content Rows - Netflix Style */}
        <div className="bg-black py-8">
          <div className="container mx-auto">
            {netflixContentRows.map((row, index) => (
              <ContentRow key={index} title={row.title} items={row.items} />
            ))}
          </div>
        </div>

      </main>
    </>
  )
}

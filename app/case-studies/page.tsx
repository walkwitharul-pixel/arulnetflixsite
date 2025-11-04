"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import FeaturedCaseStudy from "@/components/featured-case-study"
import NewsletterSignup from "@/components/newsletter-signup"
import NetflixButton from "@/components/netflix-button"
import Image from "next/image"

// Sample case studies data
const caseStudiesData = [
  {
    id: "onestopsg-seo",
    title: "ONESTOPSG: Digital Marketing Success for E-commerce Client",
    description:
      "Increased organic traffic by 150% and conversion rates by 40% through comprehensive digital strategy.",
    image: "/placeholder.svg?height=400&width=600&text=Digital+Marketing+Case+Study",
    company: "ONESTOPSG",
    metrics: [
      { label: "Traffic Increase", value: "150%" },
      { label: "Conversion Rate", value: "40%" },
      { label: "Keywords Ranking", value: "200+" },
      { label: "ROI", value: "320%" },
    ],
    industry: "Digital Marketing",
  },
  {
    id: "growthlab-community",
    title: "GrowthLab: Building Singapore's Startup Community",
    description:
      "Created a thriving startup ecosystem with over 500 active members, 20+ events, and successful funding connections.",
    image: "/placeholder.svg?height=400&width=600&text=Community+Building+Case+Study",
    company: "GrowthLab",
    metrics: [
      { label: "Active Members", value: "500+" },
      { label: "Events Hosted", value: "20+" },
      { label: "Funding Secured", value: "$2M+" },
      { label: "Startup Success Rate", value: "35%" },
    ],
    industry: "Community Building",
  },
  {
    id: "velantec-security",
    title: "VELANTEC: Cybersecurity Solution for Financial Institution",
    description:
      "Implemented robust security measures for a financial institution, preventing potential breaches and ensuring regulatory compliance.",
    image: "/placeholder.svg?height=400&width=600&text=Cybersecurity+Case+Study",
    company: "VELANTEC",
    metrics: [
      { label: "Security Improvement", value: "100%" },
      { label: "Vulnerabilities Fixed", value: "47" },
      { label: "Compliance Score", value: "98%" },
      { label: "Cost Savings", value: "$150K" },
    ],
    industry: "Cybersecurity",
  },
  {
    id: "avalsg-ecommerce",
    title: "Aval.sg: E-commerce Growth and Optimization",
    description:
      "Scaled e-commerce operations to handle 200+ orders per month with efficient fulfillment and 95% customer satisfaction.",
    image: "/placeholder.svg?height=400&width=600&text=E-commerce+Case+Study",
    company: "Aval.sg",
    metrics: [
      { label: "Monthly Orders", value: "200+" },
      { label: "Customer Satisfaction", value: "95%" },
      { label: "Repeat Purchase Rate", value: "68%" },
      { label: "Revenue Growth", value: "210%" },
    ],
    industry: "E-commerce",
  },
  {
    id: "mrassistant-ai",
    title: "Mrassistant.ai: Voice AI Implementation for Customer Service",
    description:
      "Developed an AI-powered voice assistant that reduced customer service response time by 80% and improved satisfaction scores.",
    image: "/placeholder.svg?height=400&width=600&text=Voice+AI+Case+Study",
    company: "Mrassistant.ai",
    metrics: [
      { label: "Response Time Reduction", value: "80%" },
      { label: "Customer Satisfaction", value: "92%" },
      { label: "Queries Automated", value: "75%" },
      { label: "Cost Reduction", value: "40%" },
    ],
    industry: "Artificial Intelligence",
  },
]

// Get unique industries for filter
const industries = Array.from(new Set(caseStudiesData.map((study) => study.industry)))

export default function CaseStudies() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)

  // Filter case studies by industry if selected
  const filteredCaseStudies = selectedIndustry
    ? caseStudiesData.filter((study) => study.industry === selectedIndustry)
    : caseStudiesData

  // Featured case study is the first one (or first filtered one)
  const featuredCaseStudy = filteredCaseStudies[0]

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-netflix-black via-netflix-black to-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.1),transparent)]"></div>
        <div className="relative container mx-auto px-4 md:px-8 py-24 md:py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-netflix-red via-red-400 to-netflix-red bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Case Studies
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Real results from real projects - showcasing impact and innovation
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Featured Case Study Hero Section */}
      <div className="pt-8">
        <FeaturedCaseStudy caseStudy={featuredCaseStudy} />
      </div>

      <div className="pb-16 bg-netflix-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              All Case Studies
            </motion.h2>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <button
                onClick={() => setSelectedIndustry(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedIndustry === null
                    ? "bg-netflix-red text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All
              </button>

              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedIndustry === industry
                      ? "bg-netflix-red text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.slice(1).map((study, index) => (
              <motion.div
                key={study.id}
                className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-2xl border border-gray-800 hover:border-netflix-red/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <Image
                    src={study.image || "/placeholder.svg?height=224&width=400&text=Case+Study"}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-125"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-netflix-red px-4 py-2 rounded-full text-white text-xs font-medium z-20 shadow-lg">
                    {study.company}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-netflix-red transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">{study.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {study.metrics.slice(0, 4).map((metric, i) => (
                      <motion.div
                        key={i}
                        className="text-center p-3 rounded-lg bg-netflix-red/10 border border-netflix-red/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <p className="text-netflix-red font-bold text-xl">{metric.value}</p>
                        <p className="text-gray-400 text-xs mt-1">{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <NetflixButton
                    href={`/case-studies/${study.id}`}
                    variant="primary"
                    className="w-full hover:scale-105 transition-transform"
                    icon={<FaArrowRight size={16} />}
                  >
                    View Case Study
                  </NetflixButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <NewsletterSignup />
    </>
  )
}

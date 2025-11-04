"use client"

import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { FaArrowLeft, FaChartLine, FaUsers, FaLightbulb, FaCheckCircle } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"

// Sample case studies data (same as in case-studies/page.tsx)
const caseStudiesData = [
  {
    id: "onestopsg-seo",
    title: "ONESTOPSG: SEO Campaign for E-commerce Client",
    description: "Increased organic traffic by 150% and conversion rates by 40% through comprehensive SEO strategy.",
    image: "/images/case-studies/seo-campaign.jpg",
    company: "ONESTOPSG",
    metrics: [
      { label: "Traffic Increase", value: "150%" },
      { label: "Conversion Rate", value: "40%" },
      { label: "Keywords Ranking", value: "200+" },
      { label: "ROI", value: "320%" },
    ],
    challenge:
      "The client, an e-commerce business selling premium home goods, was struggling with low organic visibility and high customer acquisition costs through paid channels. Their website had technical SEO issues, poor content quality, and lacked a strategic approach to keyword targeting.",
    solution:
      "We implemented a comprehensive SEO strategy that included technical SEO fixes, content optimization, and strategic link building. We conducted in-depth keyword research to identify high-intent, low-competition keywords relevant to their product offerings. We also optimized product pages, created informative blog content, and improved site architecture for better crawlability.",
    results:
      "Within six months, organic traffic increased by 150%, with a 40% improvement in conversion rates from organic visitors. The client achieved first-page rankings for over 200 targeted keywords, resulting in a 320% return on investment from the SEO campaign. This significantly reduced their reliance on paid advertising and established a sustainable channel for customer acquisition.",
    testimonial: {
      quote:
        "ONESTOPSG transformed our online presence through their strategic SEO approach. The results exceeded our expectations, and we continue to benefit from the organic traffic growth they achieved for us.",
      author: "Sarah Chen",
      position: "Marketing Director, Premium Home Goods",
    },
  },
  {
    id: "growthlab-community",
    title: "GrowthLab: Building Singapore's Startup Community",
    description:
      "Created a thriving startup ecosystem with over 500 active members, 20+ events, and successful funding connections.",
    image: "/images/case-studies/community-building.jpg",
    company: "GrowthLab",
    metrics: [
      { label: "Active Members", value: "500+" },
      { label: "Events Hosted", value: "20+" },
      { label: "Funding Secured", value: "$2M+" },
      { label: "Startup Success Rate", value: "35%" },
    ],
    challenge:
      "Singapore's startup ecosystem was fragmented, with limited opportunities for early-stage founders to connect with mentors, investors, and fellow entrepreneurs. Many promising startups struggled to gain traction due to lack of guidance, resources, and funding connections.",
    solution:
      "Through GrowthLab, we created a structured community platform that brings together founders, mentors, and investors. We organized regular networking events, workshops, and pitch sessions. We implemented a mentorship program pairing experienced entrepreneurs with early-stage founders and facilitated introductions to potential investors.",
    results:
      "GrowthLab has grown to over 500 active members, with 20+ successful events hosted. Member startups have collectively secured over $2 million in funding, and the community maintains a 35% success rate for startups moving from idea stage to market launch. The platform has become a recognized hub for entrepreneurial activity in Singapore.",
    testimonial: {
      quote:
        "GrowthLab provided exactly what my startup needed - connections, mentorship, and eventually, funding. The community Arul has built is invaluable to Singapore's startup ecosystem.",
      author: "Michael Tan",
      position: "Founder, TechSprint",
    },
  },
  {
    id: "velantec-security",
    title: "VELANTEC: Cybersecurity Solution for Financial Institution",
    description:
      "Implemented robust security measures for a financial institution, preventing potential breaches and ensuring regulatory compliance.",
    image: "/images/case-studies/cybersecurity.jpg",
    company: "VELANTEC",
    metrics: [
      { label: "Security Improvement", value: "100%" },
      { label: "Vulnerabilities Fixed", value: "47" },
      { label: "Compliance Score", value: "98%" },
      { label: "Cost Savings", value: "$150K" },
    ],
    challenge:
      "A mid-sized financial institution was facing significant cybersecurity vulnerabilities that put customer data at risk and threatened compliance with industry regulations. Their existing security infrastructure was outdated, and they had experienced several near-miss security incidents.",
    solution:
      "VELANTEC conducted a comprehensive security audit and implemented a multi-layered cybersecurity solution. This included network security enhancements, endpoint protection, employee security training, and implementation of advanced threat detection systems. We also established continuous monitoring protocols and incident response procedures.",
    results:
      "The security posture of the institution improved by 100%, with 47 critical vulnerabilities remediated. Their regulatory compliance score increased to 98%, and they avoided potential penalties. The solution saved an estimated $150,000 in potential breach costs and operational inefficiencies.",
    testimonial: {
      quote:
        "VELANTEC's cybersecurity expertise gave us peace of mind and brought our security infrastructure up to industry standards. Their thorough approach identified vulnerabilities we weren't even aware of.",
      author: "David Wong",
      position: "CTO, Singapore Financial Services",
    },
  },
  {
    id: "avalsg-ecommerce",
    title: "Aval.sg: E-commerce Growth and Optimization",
    description:
      "Scaled e-commerce operations to handle 200+ orders per month with efficient fulfillment and 95% customer satisfaction.",
    image: "/images/case-studies/ecommerce-growth.jpg",
    company: "Aval.sg",
    metrics: [
      { label: "Monthly Orders", value: "200+" },
      { label: "Customer Satisfaction", value: "95%" },
      { label: "Repeat Purchase Rate", value: "68%" },
      { label: "Revenue Growth", value: "210%" },
    ],
    challenge:
      "Aval.sg started as a small e-commerce operation selling authentic South Indian clothing in Singapore. The business faced challenges with inventory management, order fulfillment, and scaling operations to meet growing demand while maintaining product quality and customer satisfaction.",
    solution:
      "We implemented a comprehensive e-commerce optimization strategy that included streamlining the supply chain, establishing quality control processes, and improving the customer experience. We developed relationships with reliable suppliers in South India, implemented an inventory management system, and enhanced the website with better product photography and descriptions.",
    results:
      "Aval.sg now successfully handles over 200 orders per month with a 95% customer satisfaction rate. The repeat purchase rate has increased to 68%, and overall revenue has grown by 210%. The business has established a reputation for authentic, high-quality South Indian clothing with reliable delivery and excellent customer service.",
    testimonial: {
      quote:
        "The systems and processes implemented at Aval.sg have transformed our business from a small operation to a scalable e-commerce company. The growth we've experienced while maintaining quality has been remarkable.",
      author: "Priya Sharma",
      position: "Operations Manager, Aval.sg",
    },
  },
  {
    id: "mrassistant-ai",
    title: "MrAssistant: AI Implementation for Customer Service",
    description:
      "Developed an AI-powered assistant that reduced customer service response time by 80% and improved satisfaction scores.",
    image: "/images/case-studies/ai-assistant.jpg",
    company: "MrAssistant",
    metrics: [
      { label: "Response Time Reduction", value: "80%" },
      { label: "Customer Satisfaction", value: "92%" },
      { label: "Queries Automated", value: "75%" },
      { label: "Cost Reduction", value: "40%" },
    ],
    challenge:
      "A large retail company was struggling with customer service efficiency, with long response times and inconsistent quality in handling customer queries. Their support team was overwhelmed, leading to customer dissatisfaction and increased churn rates.",
    solution:
      "We deployed MrAssistant's AI-powered virtual assistant, customized to the company's specific needs. The solution included natural language processing capabilities to understand customer queries, integration with the company's knowledge base, and automated handling of common questions and issues. For complex queries, the system was designed to seamlessly escalate to human agents.",
    results:
      "The implementation reduced customer service response time by 80% and automated 75% of routine queries. Customer satisfaction scores improved to 92%, and the company achieved a 40% reduction in customer service costs. The AI assistant continues to learn and improve through ongoing interactions.",
    testimonial: {
      quote:
        "MrAssistant has revolutionized our customer service operations. The AI solution handles most routine queries efficiently, allowing our human agents to focus on complex issues that require a personal touch.",
      author: "Lisa Tan",
      position: "Customer Experience Director, SG Retail",
    },
  },
  {
    id: "blareats-delivery",
    title: "Blareats: Optimizing Food Delivery Logistics",
    description:
      "Created an efficient delivery system that reduced delivery times by 30% and increased driver productivity.",
    image: "/images/case-studies/delivery-optimization.jpg",
    company: "Blareats",
    metrics: [
      { label: "Delivery Time Reduction", value: "30%" },
      { label: "Driver Productivity", value: "+45%" },
      { label: "Order Accuracy", value: "99.5%" },
      { label: "Customer Retention", value: "82%" },
    ],
    challenge:
      "Blareats was facing logistical challenges in food delivery operations, including long delivery times, inefficient routing, and difficulty managing peak-hour demand. These issues were affecting customer satisfaction and limiting business growth.",
    solution:
      "We developed a comprehensive logistics optimization system for Blareats that included intelligent routing algorithms, real-time order tracking, and dynamic driver allocation. The system analyzed historical order data to predict demand patterns and optimized delivery zones accordingly. We also implemented a quality control process to ensure order accuracy and implemented performance metrics for drivers.",
    results:
      "The optimization reduced average delivery times by 30% and increased driver productivity by 45%. Order accuracy improved to 99.5%, and customer retention reached 82%. The improved efficiency allowed Blareats to handle more orders without proportionally increasing operational costs, creating a scalable delivery model.",
    testimonial: {
      quote:
        "The logistics optimization implemented by Arul and his team transformed our delivery operations. We can now handle peak hours smoothly, and our customers are much happier with the faster, more reliable service.",
      author: "Raj Mehta",
      position: "Operations Director, Blareats",
    },
  },
]

export default function CaseStudyDetail() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const caseStudy = caseStudiesData.find((study) => study.id === id)

  if (!caseStudy) {
    return (
      <>
        <Navbar />
        <div className="pt-24 pb-16 bg-netflix-black min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Case Study Not Found</h1>
            <button
              onClick={() => router.back()}
              className="bg-netflix-red hover:bg-netflix-red/80 text-white py-2 px-4 rounded-md flex items-center mx-auto"
            >
              <FaArrowLeft className="mr-2" /> Back to Case Studies
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 bg-netflix-black min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Case Studies
          </button>

          <div className="relative h-[40vh] md:h-[50vh] rounded-xl overflow-hidden mb-8">
            <Image
              src={caseStudy.image || "/placeholder.svg?height=500&width=1000&text=Case+Study+Detail"}
              alt={caseStudy.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-netflix-red px-3 py-1 rounded-full text-white text-sm font-medium mb-4 inline-block">
                {caseStudy.company}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{caseStudy.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {caseStudy.metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-netflix-dark p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <p className="text-netflix-red text-4xl font-bold mb-2">{metric.value}</p>
                <p className="text-gray-300">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <FaLightbulb className="text-netflix-red text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-white">The Challenge</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">{caseStudy.challenge}</p>
              </motion.div>

              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <FaUsers className="text-netflix-red text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-white">Our Solution</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">{caseStudy.solution}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <FaChartLine className="text-netflix-red text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-white">The Results</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">{caseStudy.results}</p>
              </motion.div>
            </div>

            <motion.div
              className="bg-netflix-dark p-6 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <FaCheckCircle className="text-netflix-red text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-white">Testimonial</h2>
              </div>
              <div className="relative">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 h-10 w-10 text-netflix-red opacity-30"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-gray-300 italic mb-4">{caseStudy.testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="text-white font-medium">{caseStudy.testimonial.author}</p>
                    <p className="text-netflix-red text-sm">{caseStudy.testimonial.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block bg-netflix-red hover:bg-netflix-red/80 text-white py-3 px-8 rounded-md transition-colors"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

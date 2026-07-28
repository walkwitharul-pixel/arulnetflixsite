import { resolveThumbnail } from "./design-tokens"

export const caseStudiesData = [
  {
    id: "onestopsg-seo",
    title: "ONESTOPSG: Digital Marketing Success for E-commerce Client",
    description:
      "Increased organic traffic by 150% and conversion rates by 40% through comprehensive digital strategy.",
    image: resolveThumbnail("onestopsg-seo"),
    company: "ONESTOPSG",
    metrics: [
      { label: "Traffic Increase", value: "150%" },
      { label: "Conversion Rate", value: "40%" },
      { label: "Keywords Ranking", value: "200+" },
      { label: "ROI", value: "320%" },
    ],
    industry: "Digital Marketing",
    challenge:
      "The client, an e-commerce business selling premium home goods, was struggling with low organic visibility and high customer acquisition costs through paid channels.",
    solution:
      "We implemented a comprehensive SEO strategy including technical fixes, content optimization, and strategic link building with high-intent keyword targeting.",
    results:
      "Within six months, organic traffic increased by 150%, with a 40% improvement in conversion rates and a 320% return on investment.",
    testimonial: {
      quote:
        "ONESTOPSG transformed our online presence through their strategic SEO approach. The results exceeded our expectations.",
      author: "Sarah Chen",
      position: "Marketing Director, Premium Home Goods",
    },
  },
  {
    id: "growthlab-community",
    title: "GrowthLab: Building ASEAN's Startup Ecosystem",
    description:
      "Scaled a global founder network to 2,500+ members and 1,200+ startups — LinkedIn for startups with funding, mentorship, and AI tools.",
    image: resolveThumbnail("growthlab-community"),
    company: "GrowthLab",
    metrics: [
      { label: "Members", value: "2,500+" },
      { label: "Startups", value: "1,200+" },
      { label: "Funding Facilitated", value: "$500K+" },
      { label: "Member Rating", value: "4.9/5" },
    ],
    industry: "Startup Ecosystem",
    challenge:
      "ASEAN's startup ecosystem is fragmented across countries and tools, with limited coordination between founders, investors, and institutional builders — causing missed connections at scale.",
    solution:
      "We built GrowthLab as a community + platform: professional networking, business pages, jobs, fundraising, mentorship, AI matching, and live events — partnering with *SCAPE, Claude AI, Affinidi, SGInnovate, and others.",
    results:
      "2,500+ members, 1,200+ startups, $500K+ funding facilitated, and a growing calendar of workshops and mixers across Singapore.",
    testimonial: {
      quote:
        "I founded GrowthLab with a simple vision: to bridge the gap between innovation and opportunity. Every entrepreneur deserves access to the right network, resources, and support to turn their ideas into reality.",
      author: "Arul Murugan",
      position: "Founder & CEO, GrowthLab",
    },
  },
  {
    id: "velantec-security",
    title: "VELANTEC: Cybersecurity Solution for Financial Institution",
    description:
      "Implemented robust security measures for a financial institution, preventing potential breaches and ensuring regulatory compliance.",
    image: resolveThumbnail("velantec-security"),
    company: "VELANTEC",
    metrics: [
      { label: "Security Improvement", value: "100%" },
      { label: "Vulnerabilities Fixed", value: "47" },
      { label: "Compliance Score", value: "98%" },
      { label: "Cost Savings", value: "$150K" },
    ],
    industry: "Cybersecurity",
    challenge:
      "A mid-sized financial institution faced significant cybersecurity vulnerabilities that put customer data at risk.",
    solution:
      "VELANTEC ran a full security audit and deployed multi-layered protection with monitoring and incident response.",
    results:
      "47 vulnerabilities fixed, 98% compliance score, and estimated $150K in prevented loss and remediation costs.",
    testimonial: {
      quote: "VELANTEC gave us peace of mind during our digital transformation. Outstanding technical expertise.",
      author: "Priya Sharma",
      position: "CEO, Innovative Solutions Asia",
    },
  },
  {
    id: "avalsg-ecommerce",
    title: "Aval.sg: E-commerce Growth and Optimization",
    description:
      "Scaled e-commerce operations to handle 200+ orders per month with efficient fulfillment and 95% customer satisfaction.",
    image: resolveThumbnail("avalsg-ecommerce"),
    company: "Aval.sg",
    metrics: [
      { label: "Monthly Orders", value: "200+" },
      { label: "Customer Satisfaction", value: "95%" },
      { label: "Repeat Purchase Rate", value: "68%" },
      { label: "Revenue Growth", value: "210%" },
    ],
    industry: "E-commerce",
    challenge:
      "Scaling authentic ethnic wear retail required inventory control, fulfillment reliability, and a premium customer experience.",
    solution:
      "We optimized sourcing, fulfillment workflows, and the storefront experience across Aval.sg and Avan.sg.",
    results: "200+ monthly orders, 95% satisfaction, and 210% revenue growth with strong repeat purchase rates.",
    testimonial: {
      quote: "Arul's understanding of e-commerce and supply chain is exceptional. Strong vision and execution.",
      author: "David Wong",
      position: "Operations Manager, Singapore Retail Group",
    },
  },
  {
    id: "mrassistant-ai",
    title: "MrAssistant.Ai: Voice AI for Phone Automation",
    description:
      "Launched a no-code AI voice agent platform — 40+ languages, parallel calls, and white-label plans for agencies and call centers.",
    image: resolveThumbnail("mrassistant-ai"),
    company: "MrAssistant.Ai",
    metrics: [
      { label: "Languages", value: "40+" },
      { label: "Integrations", value: "250+" },
      { label: "Phone Countries", value: "150+" },
      { label: "Setup Time", value: "~60s" },
    ],
    industry: "Artificial Intelligence",
    challenge:
      "Businesses miss calls, wait in IVR hell, and can't scale human agents — losing leads in sales, clinics, real estate, and support.",
    solution:
      "We shipped MrAssistant: no-code voice agents for inbound/outbound, calendars, CRM tools, human handoff, recordings, and compliance-minded deployment (PDPA/GDPR/HIPAA options).",
    results:
      "Production-ready voice AI with Starter-to-Enterprise pricing, white-label for agencies, and live demo call experiences on mrassistant.ai.",
    testimonial: {
      quote: "Create no-code AI phone call systems with our AI voice agents: never miss a call again and convert more leads.",
      author: "MrAssistant.Ai",
      position: "Product positioning",
    },
  },
]

"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import PageHero from "@/components/page-hero"
import { motion } from "framer-motion"
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import NetflixButton from "@/components/netflix-button"
import SiteFooter from "@/components/site-footer"
import { personalData, stockPhotos } from "@/lib/personal-data"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const subject = encodeURIComponent(formData.subject || `Message from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
      )
      window.location.href = `${personalData.contact.emailHref}?subject=${subject}&body=${body}`
      toast.success("Opening your email app", {
        description: "Review the draft and send when ready.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {
      toast.error("Error", {
        description: "Could not open your email app. Please email me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="nf-page">
        <PageHero
          title="Get In Touch"
          subtitle={`${personalData.availability} · Based in ${personalData.location.display}`}
          backgroundImage={stockPhotos.networking}
        />

        <section className="nf-gutter py-[clamp(1.5rem,4vw,3rem)] pb-[clamp(3rem,6vw,5rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-[2px] overflow-hidden shrink-0">
                  <Image src={stockPhotos.headshot} alt={personalData.fullName} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <h2 className="text-nf-text text-lg font-bold">{personalData.fullName}</h2>
                  <p className="text-nf-muted text-sm">{personalData.headline}</p>
                </div>
              </div>

              <h2 className="text-nf-text text-xl font-bold mb-5">Contact Information</h2>
              <div className="space-y-3">
                {[
                  {
                    icon: FaEnvelope,
                    label: "Email",
                    value: personalData.contact.email,
                    href: personalData.contact.emailHref,
                  },
                  {
                    icon: FaPhone,
                    label: "Phone",
                    value: personalData.contact.phone,
                    href: personalData.contact.phoneHref,
                  },
                  {
                    icon: FaMapMarkerAlt,
                    label: "Location",
                    value: `${personalData.location.display} · ${personalData.location.address}`,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 bg-nf-elevated p-4 rounded-[2px]">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#E50914] text-white shrink-0">
                      <item.icon size={14} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-nf-text font-semibold text-sm">{item.label}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-nf-muted text-sm hover:text-nf-text break-all">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-nf-muted text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-nf-text text-xl font-bold mt-8 mb-4">Social</h2>
              <div className="flex gap-3">
                <a
                  href={personalData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-[2px] overflow-hidden bg-nf-elevated hover:opacity-90 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <Image src="/images/logos/linkedin-logo.svg" alt="LinkedIn" width={48} height={48} className="w-full h-full object-cover" />
                </a>
                <a
                  href={personalData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-[2px] overflow-hidden bg-nf-elevated hover:opacity-90 transition-opacity"
                  aria-label="Instagram"
                >
                  <Image src="/images/logos/instagram-logo.svg" alt="Instagram" width={48} height={48} className="w-full h-full object-cover" />
                </a>
              </div>

              <div className="mt-8 bg-nf-elevated p-4 rounded-[2px]">
                <p className="text-nf-text text-sm font-semibold mb-2">Focus areas</p>
                <p className="text-nf-muted text-sm leading-relaxed">{personalData.focusAreas.join(" · ")}</p>
                <p className="text-nf-dim text-xs mt-3">{personalData.educationHighlight}</p>
                <p className="text-nf-dim text-xs mt-2">
                  GrowthLab:{" "}
                  <a href={`mailto:${personalData.contact.growthlabEmail}`} className="hover:text-nf-text">
                    {personalData.contact.growthlabEmail}
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <h2 className="text-nf-text text-xl font-bold mb-5">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 bg-nf-elevated p-4 sm:p-5 rounded-[2px]">
                <div>
                  <label htmlFor="name" className="block text-sm text-nf-muted mb-1.5">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-nf-input border-[color:var(--nf-border)] text-nf-text rounded-[2px]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-nf-muted mb-1.5">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-nf-input border-[color:var(--nf-border)] text-nf-text rounded-[2px]"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm text-nf-muted mb-1.5">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-nf-input border-[color:var(--nf-border)] text-nf-text rounded-[2px]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-nf-muted mb-1.5">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-nf-input border-[color:var(--nf-border)] text-nf-text rounded-[2px]"
                  />
                </div>
                <NetflixButton type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </NetflixButton>
              </form>
            </motion.div>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  )
}

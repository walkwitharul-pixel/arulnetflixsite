"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import NetflixButton from "./netflix-button"
import { Mail, CheckCircle } from "lucide-react"
import { personalData } from "@/lib/personal-data"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email address")
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }
    setError("")
    setIsSubmitting(true)
    try {
      const subject = encodeURIComponent("Portfolio newsletter signup")
      const body = encodeURIComponent(`Please add me to updates.\n\nEmail: ${email}`)
      window.location.href = `${personalData.contact.emailHref}?subject=${subject}&body=${body}`
      setIsSuccess(true)
      setEmail("")
      toast.success("Opening your email app", {
        description: "Send the draft to complete your signup.",
      })
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-nf-elevated border-t border-[color:var(--nf-border)]">
      <div className="nf-gutter py-[clamp(2rem,4vw,3rem)]">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-5">
            <h2 className="text-nf-text text-xl sm:text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="text-nf-muted text-sm sm:text-base">
              Get updates on ventures, case studies, and insights
            </p>
          </motion.div>

          {isSuccess ? (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 text-[#E50914] mx-auto mb-3" />
              <h3 className="text-nf-text font-bold mb-1">Thank you for subscribing</h3>
              <p className="text-nf-muted text-sm mb-4">You&apos;ll hear from me soon.</p>
              <Link
                href="/contact"
                className="text-sm text-nf-muted hover:text-nf-text underline underline-offset-2 transition-colors"
              >
                Prefer a direct message? Contact me
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-nf-dim" size={16} />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full h-[var(--nf-btn-h)] bg-nf-bg border border-[color:var(--nf-border)] rounded-[2px] pl-10 pr-3 text-nf-text text-sm placeholder:text-nf-dim focus:outline-none focus:ring-1 focus:ring-[#E50914]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <NetflixButton type="submit" variant="primary" size="md" isLoading={isSubmitting} className="sm:w-auto w-full">
                  Subscribe
                </NetflixButton>
              </div>
              {error && <p className="text-[#E50914] text-sm">{error}</p>}
              <p className="text-nf-dim text-xs text-center">
                You can unsubscribe at any time.{" "}
                <Link href="/contact" className="text-nf-muted hover:text-nf-text underline underline-offset-2">
                  Prefer a direct message? Contact me
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

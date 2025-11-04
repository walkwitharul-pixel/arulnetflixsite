"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import NetflixButton from "./netflix-button"
import { Mail, CheckCircle } from "lucide-react"

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

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-16 bg-netflix-dark">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-netflix-red/20 to-black p-8 rounded-lg border border-netflix-red/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay Updated</h2>
            <p className="text-gray-300">
              Subscribe to receive updates about my latest ventures, case studies, and insights
            </p>
          </motion.div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <CheckCircle className="w-16 h-16 text-netflix-red mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Thank You for Subscribing!</h3>
              <p className="text-gray-300">You'll receive updates about my latest ventures and insights.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <NetflixButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="md:w-auto w-full"
                >
                  Subscribe
                </NetflixButton>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2">
                  {error}
                </motion.p>
              )}

              <p className="text-gray-400 text-xs text-center mt-4">
                By subscribing, you agree to receive email updates. You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

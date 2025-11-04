"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const { toast } = useToast()
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
      // In a real application, you would send this data to your backend
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-netflix-black via-netflix-black to-black overflow-hidden">
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
              Get In Touch
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Let&apos;s connect and discuss opportunities, collaborations, or just say hello
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="bg-black text-white min-h-screen py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-netflix-red pb-2 inline-block">
                Contact Information
              </h2>

              <div className="space-y-6 mt-8">
                <motion.div
                  className="flex items-start space-x-4 p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="bg-netflix-red p-3 rounded-full flex-shrink-0">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:arulmuruganvelusamy@hotmail.com"
                      className="text-gray-400 hover:text-netflix-red transition-colors"
                    >
                      arulmuruganvelusamy@hotmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="bg-netflix-red p-3 rounded-full flex-shrink-0">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+6597371722"
                      className="text-gray-400 hover:text-netflix-red transition-colors"
                    >
                      +65 9737 1722
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="bg-netflix-red p-3 rounded-full flex-shrink-0">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Location</h3>
                    <p className="text-gray-400">Singapore</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-netflix-red pb-2 inline-block">
                  Social Media
                </h2>
                <div className="flex flex-wrap gap-6 md:gap-8 mt-6">
                  <motion.a
                    href="https://www.linkedin.com/in/arul-murugan-525b321a7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    aria-label="Connect with Arul on LinkedIn"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300 flex items-center justify-center p-3">
                      <Image
                        src="/images/logos/linkedin-logo.png"
                        alt="LinkedIn"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to SVG logo if image doesn't exist
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent && !parent.querySelector('svg')) {
                            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                            svg.setAttribute('class', 'w-full h-full text-[#0077B5]')
                            svg.setAttribute('fill', 'currentColor')
                            svg.setAttribute('viewBox', '0 0 24 24')
                            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                            path.setAttribute('d', 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z')
                            svg.appendChild(path)
                            parent.appendChild(svg)
                          }
                        }}
                      />
                    </div>
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/walkwitharul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    aria-label="Follow Arul on Instagram"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300 flex items-center justify-center p-3">
                      <Image
                        src="/images/logos/instagram-logo.png"
                        alt="Instagram"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to SVG logo if image doesn't exist
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent && !parent.querySelector('svg')) {
                            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                            svg.setAttribute('class', 'w-full h-full')
                            svg.setAttribute('viewBox', '0 0 24 24')
                            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
                            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
                            gradient.setAttribute('id', 'instagram-gradient')
                            gradient.setAttribute('x1', '0%')
                            gradient.setAttribute('y1', '0%')
                            gradient.setAttribute('x2', '100%')
                            gradient.setAttribute('y2', '100%')
                            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
                            stop1.setAttribute('offset', '0%')
                            stop1.setAttribute('stop-color', '#833AB4')
                            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
                            stop2.setAttribute('offset', '50%')
                            stop2.setAttribute('stop-color', '#FD1D1D')
                            const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
                            stop3.setAttribute('offset', '100%')
                            stop3.setAttribute('stop-color', '#FCAF45')
                            gradient.appendChild(stop1)
                            gradient.appendChild(stop2)
                            gradient.appendChild(stop3)
                            defs.appendChild(gradient)
                            svg.appendChild(defs)
                            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                            path.setAttribute('fill', 'url(#instagram-gradient)')
                            path.setAttribute('d', 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z')
                            svg.appendChild(path)
                            parent.appendChild(svg)
                          }
                        }}
                      />
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="contact-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-netflix-red pb-2 inline-block">
                Send Me a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-netflix-red hover:bg-netflix-red/90 text-white py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-netflix-red/50 font-medium"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

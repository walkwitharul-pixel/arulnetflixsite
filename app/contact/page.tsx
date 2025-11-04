"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaInstagram } from "react-icons/fa"
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
                <div className="flex space-x-4 mt-6">
                  <motion.a
                    href="https://www.linkedin.com/in/arul-murugan-525b321a7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0077B5] hover:bg-[#0077B5]/90 transition-all duration-300 p-4 rounded-full"
                    aria-label="Connect with Arul on LinkedIn"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaLinkedin className="text-white text-xl" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/walkwitharul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 p-4 rounded-full"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaInstagram className="text-white text-xl" />
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

"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import PageHero from "@/components/page-hero"
import { motion } from "framer-motion"
import { testimonialsData } from "@/lib/testimonials-data"
import Image from "next/image"
import { FaQuoteLeft } from "react-icons/fa"
import SiteFooter from "@/components/site-footer"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />
      <main id="main-content" className="nf-page">
        <PageHero
          title="Testimonials"
          subtitle="What people say about working with me"
          backgroundImage="/images/placeholders/posters/community-building.svg"
        />

        <section className="nf-gutter py-[clamp(1.5rem,4vw,3rem)] pb-[clamp(3rem,6vw,5rem)]">
          <div className="max-w-4xl mx-auto">
            {testimonialsData.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                className={`bg-nf-elevated rounded-[2px] p-5 sm:p-8 ${index === activeIndex ? "block" : "hidden"}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[2px] overflow-hidden shrink-0 border-2 border-white/20">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <FaQuoteLeft className="text-[#E50914] opacity-70 mb-3" size={22} />
                    <p className="text-nf-secondary text-base sm:text-lg leading-relaxed mb-5">{testimonial.testimonial}</p>
                    <h3 className="text-nf-text font-bold text-lg leading-tight">{testimonial.name}</h3>
                    <p className="text-[#E50914] text-sm mt-0.5">{testimonial.position}</p>
                    <p className="text-nf-dim text-sm mt-0.5">{testimonial.company}</p>
                  </div>
                </div>
              </motion.article>
            ))}

            <div className="flex justify-center mt-6 gap-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-[#E50914]" : "w-2 bg-[#555] hover:bg-[#777]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  )
}

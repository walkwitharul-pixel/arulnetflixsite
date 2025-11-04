"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { testimonialsData } from "@/lib/testimonials-data"
import Image from "next/image"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-16 text-center text-red-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What People Say About Me
          </motion.h1>

          <div className="relative">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`testimonial-card bg-gray-900 rounded-xl p-8 md:p-12 shadow-xl mb-8 ${
                  index === activeIndex ? "block" : "hidden"
                }`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-red-600">
                      <Image
                        src={`/images/testimonials/${testimonial.image}`}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 128px"
                      />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="relative">
                      <FaQuoteLeft className="text-red-600 opacity-30 text-4xl absolute -top-6 -left-2" />
                      <div className="testimonial-body text-gray-300 text-lg mb-6 mt-2">{testimonial.testimonial}</div>
                      <FaQuoteRight className="text-red-600 opacity-30 text-4xl absolute -bottom-6 right-0" />
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold">{testimonial.name}</h3>
                      <p className="text-red-600">{testimonial.position}</p>
                      <p className="text-gray-400 text-sm mt-1">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-center mt-8 gap-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-red-600" : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

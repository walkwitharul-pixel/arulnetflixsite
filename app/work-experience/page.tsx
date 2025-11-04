"use client"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import { FaBriefcase, FaGraduationCap, FaStar } from "react-icons/fa"
import { timelineData } from "@/lib/timeline-data"
import Image from "next/image"

export default function WorkExperience() {
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
              Journey & Timeline
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              My professional journey through work experience and education
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="bg-black text-white min-h-screen py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          <VerticalTimeline lineColor="#333">
            {timelineData.map((item, index) => {
              const imagePath = `/images/timeline/${item.name.toLowerCase().replace(/\s+/g, "-")}.jpg`

              return (
                <VerticalTimelineElement
                  key={index}
                  className={`vertical-timeline-element--${item.timelineType}`}
                  contentStyle={
                    item.timelineType === "work"
                      ? index === 0
                        ? { background: "rgb(33, 150, 243)", color: "#fff" }
                        : { background: "rgb(240, 240, 240)", color: "#fff" }
                      : { background: "rgb(255, 224, 230)", color: "#fff" }
                  }
                  contentArrowStyle={
                    item.timelineType === "work"
                      ? index === 0
                        ? { borderRight: "7px solid rgb(33, 150, 243)" }
                        : { borderRight: "7px solid rgb(240, 240, 240)" }
                      : { borderRight: "7px solid rgb(255, 224, 230)" }
                  }
                  date={item.dateRange}
                  iconStyle={
                    item.timelineType === "work"
                      ? { background: "rgb(33, 150, 243)", color: "#fff" }
                      : { background: "rgb(255, 160, 200)", color: "#fff" }
                  }
                  icon={item.timelineType === "work" ? <FaBriefcase /> : <FaGraduationCap />}
                >
                  {item.timelineType === "work" ? (
                    <div style={{ color: "black" }}>
                      <div className="relative w-full h-32 mb-4 rounded-md overflow-hidden">
                        <Image
                          src={imagePath || "/placeholder.svg?height=128&width=400&text=Timeline"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                      <h3 className="vertical-timeline-element-title">{item.title}</h3>
                      <h4 className="vertical-timeline-element-subtitle">{item.name}</h4>
                      <p className="vertical-timeline-element-tech">🔧 {item.techStack}</p>
                      <p>{item.summaryPoints}</p>
                    </div>
                  ) : (
                    <div style={{ color: "black" }}>
                      <div className="relative w-full h-32 mb-4 rounded-md overflow-hidden">
                        <Image
                          src={imagePath || "/placeholder.svg?height=128&width=400&text=Timeline"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                      <h3 className="vertical-timeline-element-title">{item.name}</h3>
                      <h4 className="vertical-timeline-element-subtitle">{item.title}</h4>
                      <p>{item.summaryPoints}</p>
                    </div>
                  )}
                </VerticalTimelineElement>
              )
            })}

            <VerticalTimelineElement iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }} icon={<FaStar />} />
          </VerticalTimeline>
        </div>
      </div>
    </>
  )
}

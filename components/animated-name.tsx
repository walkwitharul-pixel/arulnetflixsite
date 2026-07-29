"use client"

import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

interface AnimatedNameProps {
  name: string
  onAnimationComplete?: () => void
}

const TYPE_MS = 110
const HOLD_MS = 1600
const FADE_MS = 700

export default function AnimatedName({ name, onAnimationComplete }: AnimatedNameProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState<"typing" | "hold" | "fade">("typing")
  const startedRef = useRef(false)
  const doneRef = useRef(false)

  const chars = useMemo(() => name.split(""), [name])

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    let index = 0
    const typeTimer = window.setInterval(() => {
      index += 1
      setVisibleCount(index)
      if (index >= chars.length) {
        window.clearInterval(typeTimer)
        setPhase("hold")
      }
    }, TYPE_MS)

    return () => window.clearInterval(typeTimer)
  }, [chars.length])

  useEffect(() => {
    if (phase !== "hold") return
    const holdTimer = window.setTimeout(() => setPhase("fade"), HOLD_MS)
    return () => window.clearTimeout(holdTimer)
  }, [phase])

  useEffect(() => {
    if (phase !== "fade" || doneRef.current) return
    const fadeTimer = window.setTimeout(() => {
      doneRef.current = true
      onAnimationComplete?.()
    }, FADE_MS)
    return () => window.clearTimeout(fadeTimer)
  }, [phase, onAnimationComplete])

  return (
    <div className="animated-name-container">
      <motion.div
        className="animated-name"
        animate={{ opacity: phase === "fade" ? 0 : 1 }}
        transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
      >
        {chars.map((char, index) => {
          const isSpace = char === " "
          const isVisible = index < visibleCount

          if (isSpace) {
            return (
              <span
                key={`space-${index}`}
                className="name-letter name-space"
                style={{ opacity: isVisible ? 1 : 0 }}
                aria-hidden
              >
                {"\u00A0"}
              </span>
            )
          }

          return (
            <motion.span
              key={`letter-${index}`}
              className="name-letter"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {char}
            </motion.span>
          )
        })}
      </motion.div>
    </div>
  )
}

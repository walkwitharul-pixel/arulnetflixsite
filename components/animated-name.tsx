"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface AnimatedNameProps {
  name: string
  onAnimationComplete?: () => void
}

export default function AnimatedName({ name, onAnimationComplete }: AnimatedNameProps) {
  const [showLetters, setShowLetters] = useState<string[]>([])
  const [playPopOut, setPlayPopOut] = useState(false)
  const [allTyped, setAllTyped] = useState(false)

  // Split name into letters, handling spaces
  const allLetters: Array<{ letter: string; isSpace: boolean; index: number }> = []
  let letterIndex = 0
  
  name.split("").forEach((char, index) => {
    if (char === " ") {
      allLetters.push({ letter: " ", isSpace: true, index: letterIndex })
    } else {
      allLetters.push({ letter: char, isSpace: false, index: letterIndex })
      letterIndex++
    }
  })

  const totalLetters = letterIndex
  const middleIndex = Math.floor(totalLetters / 2)

  // Type out letters one by one
  useEffect(() => {
    let currentIndex = 0
    const letters: string[] = []

    // Start typing immediately
    const typingInterval = setInterval(() => {
      if (currentIndex < allLetters.length) {
        letters.push(allLetters[currentIndex].letter)
        setShowLetters([...letters])
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setAllTyped(true)
        // After all letters are typed, wait a bit then play pop-out animation
        setTimeout(() => {
          setPlayPopOut(true)
        }, 500)
      }
    }, 100) // Typing speed: 100ms per letter

    return () => clearInterval(typingInterval)
  }, [])

  // Trigger completion callback after animations
  useEffect(() => {
    if (playPopOut) {
      const timer = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete()
        }
      }, 3500) // After pop-out animation completes
      return () => clearTimeout(timer)
    }
  }, [playPopOut, onAnimationComplete])

  let currentLetterIndex = 0

  return (
    <div className="animated-name-container">
      <div className="animated-name">
        {allLetters.map((item, index) => {
          const isVisible = index < showLetters.length
          
          if (item.isSpace) {
            return (
              <span
                key={`space-${index}`}
                className="name-letter name-space"
                style={{ opacity: isVisible ? 1 : 0 }}
              />
            )
          }

          const letterPos = currentLetterIndex++
          const offset = letterPos - middleIndex
          const absOffset = Math.abs(offset)
          const isMiddle = offset === 0
          const isLeft = offset < 0

          // Netflix-style 3D transform calculations
          const rotationY = isMiddle ? 0 : isLeft ? 89.5 : -89.5
          const baseScaleX = isMiddle ? 1 : Math.max(0.5, (95.9 - absOffset * 10) / 100)
          const fontSize = isMiddle ? 0.85 : 0.9 + 0.015 * Math.pow(absOffset, 2)

          // Create 3D shadow effect
          const createShadow = (depth: number, color: string, x: number, y: number, blur: number) => {
            let shadow = ""
            for (let i = 1; i <= depth; i++) {
              const offsetX = isMiddle ? 0 : -0.25 * offset
              shadow += `${Math.round(i * x + offsetX)}px ${Math.round(i * y)}px ${blur}px ${color}`
              if (i < depth) shadow += ", "
            }
            return shadow
          }

          return (
            <motion.span
              key={`letter-${index}`}
              className="name-letter"
              style={{
                fontSize: `${fontSize}em`,
                transformOrigin: isMiddle ? "50% 50%" : `${50 + (50 / Math.max(1, Math.abs(offset)))}% 200%`,
                display: "block",
              }}
              initial={{
                opacity: 0,
                transform: `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(0)`,
                color: "rgb(255, 255, 255)",
                textShadow: createShadow(15, "rgba(255, 255, 255, 0)", 0, 0, 0) + ", " + createShadow(50, "rgba(0, 0, 0, 0)", 0, 0, 0),
              }}
              animate={
                playPopOut && allTyped
                  ? {
                      // Netflix-style pop-out then fade-back animation
                      opacity: [0, 1, 1, 1, 1, 0.3, 0],
                      transform: [
                        `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(0)`,
                        `scaleX(${isMiddle ? 1.2 : baseScaleX * 1.2}) rotateY(${rotationY}deg) scaleY(1.2) translateY(-16%)`,
                        `scaleX(${isMiddle ? 1.1 : baseScaleX * 1.1}) rotateY(${rotationY}deg) scaleY(1.1) translateY(-12%)`,
                        `scaleX(${isMiddle ? 1.05 : baseScaleX * 1.05}) rotateY(${rotationY}deg) scaleY(1.05) translateY(-7%)`,
                        `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                        `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                        `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                      ],
                      color: [
                        "rgb(255, 255, 255)",
                        "rgb(255, 255, 255)",
                        "rgb(255, 255, 255)",
                        "rgb(255, 255, 255)",
                        "rgb(255, 255, 255)",
                        "rgb(255, 255, 255)",
                        "rgb(229, 9, 20)",
                      ],
                      textShadow: [
                        createShadow(15, "rgba(255, 255, 255, 0)", 0, 0, 0) + ", " + createShadow(50, "rgba(0, 0, 0, 0)", 0, 0, 0),
                        createShadow(15, "rgba(255, 255, 255, 0.8)", isMiddle ? 0 : -0.25 * offset, 1, 1) + ", " + createShadow(50, "rgba(0, 0, 0, 0.6)", 1, 3, 3),
                        createShadow(15, "rgba(255, 255, 255, 0.8)", isMiddle ? 0 : -0.25 * offset, 1, 1) + ", " + createShadow(50, "rgba(0, 0, 0, 0.6)", 1, 3, 3),
                        createShadow(15, "rgba(255, 255, 255, 0)", 0, 0, 0) + ", " + createShadow(50, "rgba(0, 0, 0, 0)", 0, 0, 0),
                        createShadow(15, "rgba(255, 255, 255, 0)", 0, 0, 0) + ", " + createShadow(50, "rgba(0, 0, 0, 0)", 0, 0, 0),
                        createShadow(15, "rgba(255, 255, 255, 0)", 0, 0, 0) + ", " + createShadow(50, "rgba(0, 0, 0, 0)", 0, 0, 0),
                        createShadow(15, "rgba(255, 255, 255, 0)", 0, 0, 0) + ", " + createShadow(50, "rgba(0, 0, 0, 0)", 0, 0, 0),
                      ],
                    }
                  : {
                      // Typing animation - letters appear one by one (simple, no 3D transform during typing)
                      opacity: isVisible ? 1 : 0,
                      transform: `scaleX(1) rotateY(0deg) scaleY(1)`,
                      color: "rgb(255, 255, 255)",
                      textShadow: "none",
                    }
              }
              transition={
                playPopOut && allTyped
                  ? {
                      duration: 4,
                      times: [0, 0.15, 0.25, 0.35, 0.5, 0.7, 1],
                      delay: letterPos * 0.05,
                      ease: [0.4, 0, 0.2, 1],
                    }
                  : {
                      duration: 0.3,
                      delay: 0,
                      ease: "easeOut",
                    }
              }
            >
              {item.letter}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}


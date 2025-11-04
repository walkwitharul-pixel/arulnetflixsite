"use client"

import { motion } from "framer-motion"

interface AnimatedNameProps {
  name: string
  onAnimationComplete?: () => void
}

export default function AnimatedName({ name, onAnimationComplete }: AnimatedNameProps) {
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
  let currentLetterIndex = 0

  return (
    <div className="animated-name-container">
      <div className="animated-name">
        {allLetters.map((item, index) => {
          if (item.isSpace) {
            return <span key={`space-${index}`} className="name-letter name-space" />
          }

          const letterPos = currentLetterIndex++
          const offset = letterPos - middleIndex
          const absOffset = Math.abs(offset)
          const isMiddle = offset === 0
          const isLeft = offset < 0

          // Calculate transform values similar to Netflix animation
          const rotationY = isMiddle ? 0 : isLeft ? 89.5 : -89.5
          const baseScaleX = isMiddle ? 1 : Math.max(0.5, 95.9 - absOffset * 10) / 100
          const fontSize = isMiddle ? 0.85 : 0.9 + 0.015 * Math.pow(absOffset, 2)

          // Animation sequence: pop out, hold, fade back, color change
          const baseDelay = letterPos * 0.06

          return (
            <motion.span
              key={`letter-${index}`}
              className="name-letter"
              style={{
                fontSize: `${fontSize}em`,
                transformOrigin: isMiddle ? "50% 50%" : `${50 + (50 / Math.max(1, Math.abs(offset)))}% 200%`,
              }}
              initial={{
                opacity: 0,
                transform: `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(0)`,
                color: "rgb(255, 255, 255)",
                filter: "brightness(1)",
              }}
              animate={{
                opacity: [0, 1, 1, 1, 0.3, 0],
                transform: [
                  `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(0)`,
                  `scaleX(${isMiddle ? 1.2 : baseScaleX * 1.2}) rotateY(${rotationY}deg) scaleY(1.2) translateY(-16%)`,
                  `scaleX(${isMiddle ? 1.1 : baseScaleX * 1.1}) rotateY(${rotationY}deg) scaleY(1.1) translateY(-12%)`,
                  `scaleX(${isMiddle ? 1.05 : baseScaleX * 1.05}) rotateY(${rotationY}deg) scaleY(1.05) translateY(-7%)`,
                  `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                  `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                ],
                color: [
                  "rgb(255, 255, 255)",
                  "rgb(255, 255, 255)",
                  "rgb(255, 255, 255)",
                  "rgb(255, 255, 255)",
                  "rgb(255, 255, 255)",
                  "rgb(229, 9, 20)",
                ],
                filter: [
                  "brightness(1)",
                  "brightness(1.2)",
                  "brightness(1.1)",
                  "brightness(1)",
                  "brightness(0.8)",
                  "brightness(1)",
                ],
              }}
              transition={{
                duration: 4,
                times: [0, 0.15, 0.25, 0.35, 0.5, 1],
                delay: baseDelay,
                ease: [0.4, 0, 0.2, 1],
              }}
              onAnimationComplete={() => {
                if (letterPos === totalLetters - 1 && onAnimationComplete) {
                  setTimeout(onAnimationComplete, 300)
                }
              }}
            >
              {item.letter}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}


"use client"

import { motion } from "framer-motion"

interface AnimatedNameProps {
  name: string
  onAnimationComplete?: () => void
}

export default function AnimatedName({ name, onAnimationComplete }: AnimatedNameProps) {
  const letters = name.split(" ").map((word, wordIndex) =>
    word.split("").map((letter, letterIndex) => ({
      letter,
      isSpace: false,
      wordIndex,
      letterIndex: wordIndex > 0 ? letterIndex + name.split(" ")[0].length : letterIndex,
    }))
  ).flat()

  // Add space between words
  const allLetters: Array<{ letter: string; isSpace: boolean; wordIndex: number; letterIndex: number }> = []
  letters.forEach((item, index) => {
    allLetters.push(item)
    if (index < letters.length - 1 && letters[index + 1]?.wordIndex !== item.wordIndex) {
      allLetters.push({ letter: " ", isSpace: true, wordIndex: item.wordIndex, letterIndex: item.letterIndex })
    }
  })

  const totalLetters = allLetters.length
  const middleIndex = Math.floor(totalLetters / 2)

  return (
    <div className="animated-name-container">
      <div className="animated-name">
        {allLetters.map((item, index) => {
          if (item.isSpace) {
            return <span key={`space-${index}`} className="name-letter name-space" />
          }

          const offset = index - middleIndex
          const absOffset = Math.abs(offset)
          const isMiddle = offset === 0
          const isLeft = offset < 0

          // Calculate transform values similar to Netflix animation
          const rotationY = isMiddle ? 0 : isLeft ? 89.5 : -89.5
          const scaleX = isMiddle ? 1 : 95.9 - absOffset * 10
          const fontSize = isMiddle ? 0.85 : 0.9 + 0.015 * Math.pow(absOffset, 2)

          // Animation delays - letters appear sequentially
          const baseDelay = index * 0.08
          const popOutDelay = baseDelay
          const fadeBackDelay = baseDelay + 2.5
          const colorChangeDelay = baseDelay + 3.8

          return (
            <motion.span
              key={`letter-${index}`}
              className="name-letter"
              style={{
                fontSize: `${fontSize}em`,
                transformOrigin: isMiddle ? "50% 50%" : `${50 + (50 / (offset || 1))}% 200%`,
              }}
              initial={{
                opacity: 0,
                transform: `scaleX(${scaleX}) rotateY(${rotationY}deg) scaleY(0)`,
                color: "rgb(255, 255, 255)",
              }}
              animate={{
                opacity: [0, 1, 1, 0, 0],
                transform: [
                  `scaleX(${scaleX}) rotateY(${rotationY}deg) scaleY(0)`,
                  `scaleX(${isMiddle ? 1.2 : scaleX * 1.2}) rotateY(${rotationY}deg) scaleY(1.2) translateY(-16%)`,
                  `scaleX(${isMiddle ? 1.1 : scaleX * 1.1}) rotateY(${rotationY}deg) scaleY(1.1) translateY(-12%)`,
                  `scaleX(${isMiddle ? 1.05 : scaleX * 1.05}) rotateY(${rotationY}deg) scaleY(1.05) translateY(-7%)`,
                  `scaleX(${scaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                ],
                color: ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(229, 9, 20)"],
                textShadow: [
                  "0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(0, 0, 0, 0)",
                  `0 ${isMiddle ? 0 : -0.25 * offset}px 1px rgba(255, 255, 255, 0.8), 1px 3px 3px rgba(0, 0, 0, 0.6)`,
                  `0 ${isMiddle ? 0 : -0.25 * offset}px 1px rgba(255, 255, 255, 0.8), 1px 3px 3px rgba(0, 0, 0, 0.6)`,
                  "0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(0, 0, 0, 0)",
                  "0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(0, 0, 0, 0)",
                ],
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.3, 0.5, 0.7, 1],
                delay: popOutDelay,
              }}
              onAnimationComplete={() => {
                if (index === allLetters.length - 1 && onAnimationComplete) {
                  setTimeout(onAnimationComplete, 500)
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


"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface AnimatedNameProps {
  name: string
  onAnimationComplete?: () => void
}

export default function AnimatedName({ name, onAnimationComplete }: AnimatedNameProps) {
  const [showLetters, setShowLetters] = useState<string[]>([])

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
        // After all letters are typed, wait a bit then trigger completion for fade out
        setTimeout(() => {
          if (onAnimationComplete) {
            onAnimationComplete()
          }
        }, 1000) // Show completed name for 1 second before fading
      }
    }, 100) // Typing speed: 100ms per letter

    return () => clearInterval(typingInterval)
  }, [onAnimationComplete])

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

          // Simple font sizing - all letters same size for typing
          const fontSize = 1

          return (
            <motion.span
              key={`letter-${index}`}
              className="name-letter"
              style={{
                fontSize: `${fontSize}em`,
              }}
              initial={{
                opacity: 0,
                transform: `scaleX(1) rotateY(0deg) scaleY(1)`,
                color: "rgb(255, 255, 255)",
              }}
              animate={{
                // Typing animation - letters appear one by one
                opacity: isVisible ? 1 : 0,
                transform: `scaleX(1) rotateY(0deg) scaleY(1)`,
                color: "rgb(255, 255, 255)",
              }}
              transition={{
                duration: 0.3,
                delay: 0,
                ease: "easeOut",
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


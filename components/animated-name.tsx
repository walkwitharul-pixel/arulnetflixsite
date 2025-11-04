"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef, useMemo } from "react"

interface AnimatedNameProps {
  name: string
  onAnimationComplete?: () => void
}

export default function AnimatedName({ name, onAnimationComplete }: AnimatedNameProps) {
  const [showLetters, setShowLetters] = useState<string[]>([])
  const [allTyped, setAllTyped] = useState(false)
  const hasStartedRef = useRef(false)

  // Split name into letters, handling spaces
  const allLetters: Array<{ letter: string; isSpace: boolean }> = []
  
  name.split("").forEach((char) => {
    if (char === " ") {
      allLetters.push({ letter: " ", isSpace: true })
    } else {
      allLetters.push({ letter: char, isSpace: false })
    }
  })

  // Type out letters one by one - only run once on mount
  useEffect(() => {
    if (hasStartedRef.current) return // Prevent duplicate typing
    hasStartedRef.current = true
    
    let currentIndex = 0
    const letters: string[] = []
    let isActive = true

    // Start typing immediately
    const typingInterval = setInterval(() => {
      if (!isActive) return
      
      if (currentIndex < allLetters.length) {
        letters.push(allLetters[currentIndex].letter)
        setShowLetters([...letters])
        currentIndex++
      } else {
        clearInterval(typingInterval)
        if (isActive) {
          setAllTyped(true)
          // After all letters are typed, wait a bit then trigger completion
          setTimeout(() => {
            if (isActive && onAnimationComplete) {
              onAnimationComplete()
            }
          }, 1000) // Show completed name for 1 second before fading
        }
      }
    }, 100) // Typing speed: 100ms per letter

    return () => {
      isActive = false
      clearInterval(typingInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

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

          return (
            <motion.span
              key={`letter-${index}`}
              className="name-letter"
              style={{
                fontSize: "1em",
              }}
              initial={{
                opacity: 0,
                color: "rgb(229, 9, 20)", // Netflix red
              }}
              animate={{
                // Simple typing animation - letters appear one by one
                opacity: isVisible ? 1 : 0,
                color: "rgb(229, 9, 20)", // Netflix red
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


"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useMemo, useRef } from "react"

interface AnimatedNameProps {
  name: string
  onAnimationComplete?: () => void
}

export default function AnimatedName({ name, onAnimationComplete }: AnimatedNameProps) {
  const [showLetters, setShowLetters] = useState<string[]>([])
  const [playPopOut, setPlayPopOut] = useState(false)
  const [allTyped, setAllTyped] = useState(false)
  const hasStartedTyping = useRef(false)

  // Split name into letters, handling spaces - memoize to prevent recalculation
  const { allLetters, totalLetters, middleIndex } = useMemo(() => {
    const letters: Array<{ letter: string; isSpace: boolean; index: number }> = []
    let letterIndex = 0
    
    name.split("").forEach((char) => {
      if (char === " ") {
        letters.push({ letter: " ", isSpace: true, index: letterIndex })
      } else {
        letters.push({ letter: char, isSpace: false, index: letterIndex })
        letterIndex++
      }
    })

    return {
      allLetters: letters,
      totalLetters: letterIndex,
      middleIndex: Math.floor(letterIndex / 2)
    }
  }, [name])

  // Type out letters one by one
  useEffect(() => {
    // Prevent duplicate typing
    if (hasStartedTyping.current) return
    hasStartedTyping.current = true

    let currentIndex = 0
    const letters: string[] = []
    let isCancelled = false

    // Start typing immediately
    const typingInterval = setInterval(() => {
      if (isCancelled) return
      
      if (currentIndex < allLetters.length) {
        letters.push(allLetters[currentIndex].letter)
        setShowLetters([...letters])
        currentIndex++
      } else {
        clearInterval(typingInterval)
        if (!isCancelled) {
          setAllTyped(true)
          // After all letters are typed, wait a bit then change color
          setTimeout(() => {
            if (!isCancelled) {
              setPlayPopOut(true)
            }
          }, 500)
        }
      }
    }, 100) // Typing speed: 100ms per letter

    return () => {
      isCancelled = true
      clearInterval(typingInterval)
    }
  }, [allLetters])

  // Trigger completion callback after animations
  useEffect(() => {
    if (playPopOut) {
      const timer = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete()
        }
      }, 1500) // After fade completes
      return () => clearTimeout(timer)
    }
  }, [playPopOut, onAnimationComplete])

  // Memoize letter positions to prevent recalculation
  const letterPositions = useMemo(() => {
    let currentIndex = 0
    return allLetters.map((item) => {
      if (!item.isSpace) {
        return currentIndex++
      }
      return -1 // Space marker
    })
  }, [allLetters])

  return (
    <div className="animated-name-container">
      <div className="animated-name">
        {allLetters.map((item, index) => {
          const isVisible = index < showLetters.length
          const letterPos = letterPositions[index]
          
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
              initial={{
                opacity: 0,
                color: "rgb(229, 9, 20)",
              }}
              animate={
                playPopOut && allTyped
                  ? {
                      // Fade out while staying red
                      opacity: [1, 0.3, 0],
                      color: "rgb(229, 9, 20)",
                    }
                  : {
                      // Typing animation - letters appear one by one in Netflix red
                      opacity: isVisible ? 1 : 0,
                      color: "rgb(229, 9, 20)",
                    }
              }
              transition={
                playPopOut && allTyped
                  ? {
                      duration: 1.5,
                      times: [0, 0.5, 1],
                      ease: "easeInOut",
                    }
                  : {
                      duration: 0.2,
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


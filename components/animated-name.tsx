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
          // After all letters are typed, wait a bit then play pop-out animation
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
      }, 2000) // After fade and color change completes
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

          // Calculate offset from center (like in the Netflix guide)
          const offset = letterPos - middleIndex
          const absOffset = Math.abs(offset)
          const isMiddle = offset === 0
          const isLeft = offset < 0
          
          // Netflix-style 3D transform calculations (from guide)
          const rotationY = isMiddle ? 0 : isLeft ? 89.5 : -89.5
          const baseScaleX = isMiddle ? 1 : Math.max(0.5, (95.9 - absOffset * 10) / 100)
          const fontSize = isMiddle ? 0.85 : 0.9 + 0.015 * Math.pow(absOffset, 2)
          const transformOrigin = isMiddle ? "50% 50%" : `${50 + (50 / Math.max(1, absOffset))}% 200%`

          return (
            <motion.span
              key={`letter-${index}`}
              className="name-letter"
              style={{
                fontFamily: "impact, 'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: `${fontSize}em`,
                display: "block",
                transformOrigin: transformOrigin,
              }}
              initial={{
                opacity: 0,
                color: "rgb(255, 255, 255)",
                transform: `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(0)`,
              }}
              animate={
                playPopOut && allTyped
                  ? {
                      // Netflix-style: fade back then change to red
                      opacity: [1, 1, 0.3, 0],
                      color: ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(229, 9, 20)"],
                      transform: [
                        `scaleX(${isMiddle ? 1.1 : baseScaleX * 1.1}) rotateY(${rotationY}deg) scaleY(1.1) translateY(-12%)`,
                        `scaleX(${isMiddle ? 1.05 : baseScaleX * 1.05}) rotateY(${rotationY}deg) scaleY(1.05) translateY(-7%)`,
                        `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                        `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                      ],
                    }
                  : {
                      // Typing animation - letters appear one by one (white)
                      opacity: isVisible ? 1 : 0,
                      color: "rgb(255, 255, 255)",
                      transform: `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1)`,
                    }
              }
              transition={
                playPopOut && allTyped
                  ? {
                      duration: 2,
                      times: [0, 0.2, 1, 1],
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


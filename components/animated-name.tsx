"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef, useMemo } from "react"

interface AnimatedNameProps {
  name: string
  onAnimationComplete?: () => void
}

export default function AnimatedName({ name, onAnimationComplete }: AnimatedNameProps) {
  const [showLetters, setShowLetters] = useState<string[]>([])
  const [playPopOut, setPlayPopOut] = useState(false)
  const [allTyped, setAllTyped] = useState(false)
  const hasStartedRef = useRef(false)

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

  // Type out letters one by one - only run once on mount
  useEffect(() => {
    // Double-check: prevent if already started or if all typed
    if (hasStartedRef.current || allTyped) return
    hasStartedRef.current = true
    
    let currentIndex = 0
    const letters: string[] = []
    let isActive = true
    let intervalId: NodeJS.Timeout | null = null

    // Start typing immediately
    intervalId = setInterval(() => {
      if (!isActive || hasStartedRef.current === false) {
        if (intervalId) clearInterval(intervalId)
        return
      }
      
      if (currentIndex < allLetters.length) {
        letters.push(allLetters[currentIndex].letter)
        setShowLetters((prev) => {
          // Prevent duplicate letters - only add if not already there
          if (prev.length >= letters.length) return prev
          return [...letters]
        })
        currentIndex++
      } else {
        if (intervalId) clearInterval(intervalId)
        if (isActive && !allTyped) {
          setAllTyped(true)
          // After all letters are typed, wait a bit then play pop-out animation
          setTimeout(() => {
            if (isActive) {
              setPlayPopOut(true)
            }
          }, 500)
        }
      }
    }, 100) // Typing speed: 100ms per letter

    return () => {
      isActive = false
      if (intervalId) clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount - allLetters is captured from closure

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

  // Calculate letter positions once and memoize
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
          
          if (item.isSpace) {
            return (
              <span
                key={`space-${index}`}
                className="name-letter name-space"
                style={{ opacity: isVisible ? 1 : 0 }}
              />
            )
          }

          const letterPos = letterPositions[index]
          if (letterPos === -1) return null // Skip spaces (shouldn't happen but safety check)
          
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
                // Always start from typing initial state - static
                opacity: 0,
                transform: `scaleX(1) rotateY(0deg) scaleY(1)`,
                color: "rgb(229, 9, 20)",
                textShadow: "none",
              }}
              animate={
                playPopOut && allTyped
                  ? {
                      // Netflix-style pop-out then fade-back animation
                      // Start from current state (opacity 1) to prevent reset
                      opacity: [1, 1, 1, 1, 1, 0.3, 0],
                      transform: [
                        `scaleX(1) rotateY(0deg) scaleY(1) translateY(0%)`, // Current typed position - no reset
                        `scaleX(${isMiddle ? 1.2 : baseScaleX * 1.2}) rotateY(${rotationY}deg) scaleY(1.2) translateY(-16%)`,
                        `scaleX(${isMiddle ? 1.1 : baseScaleX * 1.1}) rotateY(${rotationY}deg) scaleY(1.1) translateY(-12%)`,
                        `scaleX(${isMiddle ? 1.05 : baseScaleX * 1.05}) rotateY(${rotationY}deg) scaleY(1.05) translateY(-7%)`,
                        `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                        `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                        `scaleX(${baseScaleX}) rotateY(${rotationY}deg) scaleY(1) translateY(0%)`,
                      ],
                      color: [
                        "rgb(229, 9, 20)", // Netflix red throughout
                        "rgb(229, 9, 20)",
                        "rgb(229, 9, 20)",
                        "rgb(229, 9, 20)",
                        "rgb(229, 9, 20)",
                        "rgb(229, 9, 20)",
                        "rgb(229, 9, 20)",
                      ],
                      textShadow: [
                        "none", // Start with no shadow (already typed state)
                        createShadow(15, "rgba(255, 255, 255, 0.8)", isMiddle ? 0 : -0.25 * offset, 1, 1) + ", " + createShadow(50, "rgba(0, 0, 0, 0.6)", 1, 3, 3),
                        createShadow(15, "rgba(255, 255, 255, 0.8)", isMiddle ? 0 : -0.25 * offset, 1, 1) + ", " + createShadow(50, "rgba(0, 0, 0, 0.6)", 1, 3, 3),
                        "none",
                        "none",
                        "none",
                        "none",
                      ],
                    }
                  : {
                      // Typing animation - letters appear one by one in Netflix red
                      opacity: isVisible ? 1 : 0,
                      transform: `scaleX(1) rotateY(0deg) scaleY(1)`,
                      color: "rgb(229, 9, 20)", // Netflix red from the start
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
              layout={false}
              layoutId={undefined}
            >
              {item.letter}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}


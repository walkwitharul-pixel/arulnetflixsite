"use client"

import { motion, AnimatePresence, type Variants } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

interface PageTransitionProps {
  children: ReactNode
}

const easeOutSoft = [0.25, 0.1, 0.25, 1.0] as const

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: easeOutSoft,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: easeOutSoft,
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial={isFirstRender ? "enter" : "hidden"}
        animate="enter"
        exit="exit"
        className="min-h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

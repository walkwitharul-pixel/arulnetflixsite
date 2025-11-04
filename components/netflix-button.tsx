"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface NetflixButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: ReactNode
  isLoading?: boolean
  href?: string
  external?: boolean
}

export default function NetflixButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  isLoading = false,
  href,
  external = false,
  className = "",
  ...props
}: NetflixButtonProps) {
  // Button styling based on variant
  const variantStyles = {
    primary: "bg-netflix-red hover:bg-netflix-red/80 text-white",
    secondary: "bg-gray-600/70 hover:bg-gray-700 text-white",
    ghost: "bg-transparent hover:bg-white/10 text-white",
  }

  // Button sizing
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-6",
    lg: "py-3 px-8 text-lg",
  }

  // Common button styles
  const buttonStyles = `
    font-medium rounded-md transition-all duration-200
    flex items-center justify-center gap-2
    ${variantStyles[variant]} ${sizeStyles[size]} ${className}
  `

  // If loading, show spinner
  const content = (
    <>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </>
  )

  // If href is provided, render as Link
  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={buttonStyles}>
          {content}
        </a>
      )
    }

    return (
      <Link href={href} className={buttonStyles}>
        {content}
      </Link>
    )
  }

  // Otherwise render as button
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={buttonStyles}
      disabled={isLoading}
      {...props}
    >
      {content}
    </motion.button>
  )
}

"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button type="button" className={`nf-header__icon-btn ${className}`} aria-label="Toggle theme" disabled>
        <Sun className="h-5 w-5 opacity-40" />
      </button>
    )
  }

  const isDark = resolvedTheme !== "light"

  return (
    <button
      type="button"
      className={`nf-header__icon-btn ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="h-[1.25rem] w-[1.25rem]" strokeWidth={2.2} /> : <Moon className="h-[1.25rem] w-[1.25rem]" strokeWidth={2.2} />}
    </button>
  )
}

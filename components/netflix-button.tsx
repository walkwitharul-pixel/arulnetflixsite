"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type NetflixVariant = "play" | "info" | "primary" | "manage" | "ghost"
type NetflixSize = "sm" | "md" | "lg"

interface NetflixButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: NetflixVariant
  size?: NetflixSize
  icon?: ReactNode
  isLoading?: boolean
  href?: string
  external?: boolean
}

const variantStyles: Record<NetflixVariant, string> = {
  play: "bg-white text-black hover:bg-white/85 focus-visible:ring-white rounded-full",
  info: "bg-[rgba(109,109,110,0.7)] text-white hover:bg-[rgba(109,109,110,0.55)] focus-visible:ring-white/60 rounded-full backdrop-blur-[1px]",
  primary: "bg-[#E50914] text-white hover:bg-[#f40612] focus-visible:ring-[#E50914] rounded-full",
  manage:
    "bg-transparent text-nf-dim border border-nf-dim hover:border-[color:var(--nf-text)] hover:text-nf-text tracking-[0.1em] uppercase font-normal focus-visible:ring-white/40 rounded-[2px]",
  ghost: "bg-transparent text-nf-text hover:bg-nf-hover focus-visible:ring-white/40 rounded-full",
}

const sizeStyles: Record<NetflixSize, string> = {
  sm: "h-8 px-4 text-[0.8125rem] gap-1.5 [&_svg]:w-3.5 [&_svg]:h-3.5",
  md: "h-[var(--nf-btn-h)] px-[var(--nf-btn-px)] text-[var(--nf-btn)] gap-2 [&_svg]:w-[1.05em] [&_svg]:h-[1.05em]",
  lg: "h-[var(--nf-btn-h-lg)] px-[var(--nf-btn-px-lg)] text-[var(--nf-btn)] gap-2.5 [&_svg]:w-[1.2em] [&_svg]:h-[1.2em] min-w-0",
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
  const buttonStyles = cn(
    "nf-btn inline-flex items-center justify-center font-bold leading-none whitespace-nowrap",
    "max-w-full overflow-hidden",
    "transition-[background-color,color,border-color,opacity,transform] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:opacity-50 disabled:pointer-events-none select-none",
    variant === "manage" && "font-normal",
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0 inline-flex items-center justify-center">{icon}</span>
      ) : null}
      <span className="truncate">{children}</span>
    </>
  )

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

  return (
    <button type="button" className={buttonStyles} disabled={isLoading || props.disabled} {...props}>
      {content}
    </button>
  )
}

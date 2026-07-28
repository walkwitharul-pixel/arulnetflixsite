"use client"

import { motion } from "framer-motion"

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

/** Compact Netflix-style page header shared across secondary pages */
export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <header className="relative w-full min-h-[min(52vw,16rem)] sm:min-h-[42vw] max-h-[52vh] pt-[var(--nf-nav-h)] overflow-hidden bg-nf-bg">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : "radial-gradient(ellipse at 30% 40%, rgba(229,9,20,0.35), transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(80,80,80,0.2), transparent 50%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-nf-veil via-nf-veil/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-nf-veil via-transparent to-black/40" />

      <div className="relative z-10 nf-gutter h-full flex items-end pb-[clamp(1.75rem,6vw,3.5rem)] min-h-[inherit]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[min(96%,40rem)]"
        >
          <h1 className="nf-billboard-title mb-[0.35em]">{title}</h1>
          {subtitle && <p className="nf-synopsis mb-0 !text-white/80">{subtitle}</p>}
        </motion.div>
      </div>
    </header>
  )
}

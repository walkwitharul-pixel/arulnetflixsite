"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  image: string
  link?: string
  badge?: string
}

interface ContentRowProps {
  title: string
  items: ContentItem[]
}

function ContentCard({ item, index }: { item: ContentItem; index: number }) {
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  const cardVisual = (
    <>
      {!imageError ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 42vw, 280px"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2f2f2f] to-[#141414] flex items-end p-2.5">
          <span className="text-white text-[0.7rem] sm:text-[0.8rem] font-semibold line-clamp-2 leading-snug">
            {item.title}
          </span>
        </div>
      )}

      {item.badge && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-[#E50914] text-white text-[0.55rem] font-extrabold px-1.5 py-1 leading-none tracking-wide">
            {item.badge}
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 to-transparent md:hidden pointer-events-none">
        <p className="nf-truncate text-white text-[0.7rem] font-medium">{item.title}</p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.24) }}
      className="flex-shrink-0 group relative pr-1.5 sm:pr-2"
    >
      <div className="relative w-[min(42vw,16.5rem)] sm:w-[min(28vw,17rem)] md:w-[min(20vw,18rem)] lg:w-[min(16.5vw,18.5rem)] aspect-video rounded-md overflow-hidden bg-nf-elevated transition-transform duration-[280ms] ease-out group-hover:scale-[1.06] group-hover:z-30 origin-center shadow-md group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.75)]">
        {item.link ? (
          <Link href={item.link} className="absolute inset-0 block cursor-pointer">
            {cardVisual}
          </Link>
        ) : (
          <div className="absolute inset-0">{cardVisual}</div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none group-hover:pointer-events-auto">
          <p className="nf-truncate text-white text-[0.75rem] sm:text-[0.8125rem] font-semibold mb-2 drop-shadow pointer-events-none">
            {item.title}
          </p>
          <div className="flex items-center gap-1.5">
            {item.link ? (
              <Link
                href={item.link}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shrink-0"
                aria-label={`Play ${item.title}`}
              >
                <Play className="w-3 h-3 fill-black" strokeWidth={0} />
              </Link>
            ) : (
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shrink-0">
                <Play className="w-3 h-3 fill-black" strokeWidth={0} />
              </span>
            )}
            <button
              type="button"
              aria-label="Add to My List"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/70 text-white bg-black/40 shrink-0 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toast("Added to My List")
              }}
            >
              <Plus className="w-3 h-3" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              aria-label="Like"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/70 text-white bg-black/40 shrink-0 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toast("Thanks for the feedback")
              }}
            >
              <ThumbsUp className="w-2.5 h-2.5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              aria-label="More info"
              className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/70 text-white bg-black/40 shrink-0 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (item.link) {
                  router.push(item.link)
                } else {
                  toast("More info coming soon")
                }
              }}
            >
              <ChevronDown className="w-3 h-3" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ContentRow({ title, items }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const [pageCount, setPageCount] = useState(1)
  const [activePage, setActivePage] = useState(0)

  const updateArrows = () => {
    const el = rowRef.current
    if (!el) return
    setShowLeft(el.scrollLeft > 4)
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    const pages = Math.max(1, Math.ceil(el.scrollWidth / Math.max(el.clientWidth, 1)))
    setPageCount(pages)
    const page = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1))
    setActivePage(Math.min(pages - 1, Math.max(0, page)))
  }

  useEffect(() => {
    updateArrows()
    const onResize = () => updateArrows()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [items.length])

  const scroll = (dir: "left" | "right") => {
    const el = rowRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.92, 300)
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
    setTimeout(updateArrows, 320)
  }

  return (
    <section className="mb-[clamp(1.75rem,3.5vw,3rem)] group/row relative overflow-visible">
      <div className="nf-gutter flex items-end justify-between gap-4 mb-2 sm:mb-2.5">
        <h2 className="text-[var(--nf-row-title)] font-semibold leading-tight text-nf-secondary hover:text-nf-text transition-colors cursor-pointer m-0 truncate">
          {title}
        </h2>
        {pageCount > 1 && (
          <div className="hidden sm:flex items-center gap-1 pb-1 opacity-0 group-hover/row:opacity-100 transition-opacity shrink-0" aria-hidden>
            {Array.from({ length: pageCount }).map((_, i) => (
              <span
                key={i}
                className={`h-[2px] w-3 rounded-full transition-colors ${
                  i === activePage ? "bg-nf-text" : "bg-nf-dim/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        {showLeft && (
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-40 w-[var(--nf-gutter)] min-w-[2rem] max-w-[3.5rem] bg-black/40 hover:bg-black/65 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronLeft className="text-white w-7 h-7 sm:w-9 sm:h-9 stroke-[1.5]" />
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={updateArrows}
          className="flex overflow-x-auto nf-gutter scrollbar-hide scroll-smooth py-1 touch-pan-x -mx-0"
        >
          {items.map((item, index) => (
            <ContentCard key={`${item.id}-${index}`} item={item} index={index} />
          ))}
        </div>

        {showRight && items.length > 3 && (
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-40 w-[var(--nf-gutter)] min-w-[2rem] max-w-[3.5rem] bg-black/40 hover:bg-black/65 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronRight className="text-white w-7 h-7 sm:w-9 sm:h-9 stroke-[1.5]" />
          </button>
        )}
      </div>
    </section>
  )
}

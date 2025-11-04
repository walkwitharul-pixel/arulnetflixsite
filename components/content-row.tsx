"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

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

// Individual content card component to handle image errors properly
function ContentCard({ item, index }: { item: ContentItem; index: number }) {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = `https://via.placeholder.com/350x200/1a1a1a/ffffff?text=${encodeURIComponent(item.title)}`

  const cardContent = (
    <div className="relative w-[280px] h-[160px] md:w-[320px] md:h-[180px] lg:w-[360px] lg:h-[200px] rounded overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10 shadow-xl hover:shadow-2xl group-hover:shadow-red-500/20">
      <Image
        src={imageError ? fallbackImage : item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
        onError={() => setImageError(true)}
      />
      {item.badge && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-20 shadow-xl">
          {item.badge}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm md:text-base font-semibold truncate drop-shadow-2xl">{item.title}</p>
      </div>
    </div>
  )

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex-shrink-0 group cursor-pointer"
    >
      {item.link ? (
        <Link href={item.link}>{cardContent}</Link>
      ) : (
        cardContent
      )}
    </motion.div>
  )
}

export default function ContentRow({ title, items }: ContentRowProps) {
  return (
    <div className="mb-12 md:mb-16 lg:mb-20">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6 px-4 md:px-8 lg:px-12 tracking-tight">
        {title}
      </h2>
      <div className="relative group/row">
        <div className="flex overflow-x-auto gap-4 px-4 md:px-8 lg:px-12 scrollbar-hide scroll-smooth pb-4">
          {items.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}


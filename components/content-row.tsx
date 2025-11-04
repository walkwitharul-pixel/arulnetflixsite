"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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

export default function ContentRow({ title, items }: ContentRowProps) {
  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-4 md:px-8">
        {title}
      </h2>
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 px-4 md:px-8 scrollbar-hide scroll-smooth">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex-shrink-0 group cursor-pointer"
            >
              {item.link ? (
                <Link href={item.link}>
                  <div className="relative w-[280px] h-[160px] md:w-[320px] md:h-[180px] rounded overflow-hidden transition-transform duration-300 hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 280px, 320px"
                    />
                    {item.badge && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {item.badge}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ) : (
                <div className="relative w-[280px] h-[160px] md:w-[320px] md:h-[180px] rounded overflow-hidden transition-transform duration-300 hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                  {item.badge && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {item.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


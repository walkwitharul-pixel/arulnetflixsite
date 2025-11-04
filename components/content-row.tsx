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
    <div className="mb-10 md:mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 px-4 md:px-8 lg:px-12 tracking-tight">
        {title}
      </h2>
      <div className="relative group/row">
        <div className="flex overflow-x-auto gap-5 px-4 md:px-8 lg:px-12 scrollbar-hide scroll-smooth pb-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex-shrink-0 group cursor-pointer"
            >
              {item.link ? (
                <Link href={item.link}>
                  <div className="relative w-[300px] h-[170px] md:w-[350px] md:h-[200px] rounded overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10 shadow-lg hover:shadow-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 300px, 350px"
                    />
                    {item.badge && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-20 shadow-lg">
                        {item.badge}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-base font-semibold truncate drop-shadow-lg">{item.title}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative w-[300px] h-[170px] md:w-[350px] md:h-[200px] rounded overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10 shadow-lg hover:shadow-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 300px, 350px"
                  />
                  {item.badge && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-20 shadow-lg">
                      {item.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-base font-semibold truncate drop-shadow-lg">{item.title}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


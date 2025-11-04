"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import ResponsiveImage from "./responsive-image"

interface SearchResult {
  id: string
  title: string
  type: "project" | "case-study" | "skill" | "experience"
  image?: string
  description?: string
  url: string
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Mock search data - in a real app, this would come from an API
  const searchData: SearchResult[] = [
    {
      id: "onestopsg",
      title: "ONESTOPSG",
      type: "project",
      image: "/placeholder.svg?height=200&width=300&text=ONESTOPSG",
      description: "Digital marketing agency specializing in branding, SEO, and performance marketing.",
      url: "/projects/onestopsg",
    },
    {
      id: "growthlab",
      title: "GrowthLab",
      type: "project",
      image: "/placeholder.svg?height=200&width=300&text=GrowthLab",
      description: "Singapore-based startup community aiming to be the Y Combinator of Asia.",
      url: "/projects/growthlab",
    },
    {
      id: "onestopsg-seo",
      title: "ONESTOPSG: SEO Campaign",
      type: "case-study",
      image: "/placeholder.svg?height=200&width=300&text=SEO+Campaign",
      description: "Increased organic traffic by 150% for an e-commerce client.",
      url: "/case-studies/onestopsg-seo",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      type: "skill",
      description: "Expertise in comprehensive digital marketing strategies and campaign management.",
      url: "/skills#digital-marketing",
    },
    {
      id: "velantec-founder",
      title: "Founder and CEO at VELANTEC",
      type: "experience",
      description: "Leading a technology company focused on AI, cybersecurity, and software development solutions.",
      url: "/work-experience#velantec",
    },
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (searchQuery.length > 1) {
      setIsLoading(true)
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = searchData.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        setResults(filtered)
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [searchQuery])

  const handleResultClick = (url: string) => {
    router.push(url)
    onClose()
    setSearchQuery("")
  }

  const handleImageError = (resultId: string) => {
    setImageErrors((prev) => ({ ...prev, [resultId]: true }))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project":
        return "🚀"
      case "case-study":
        return "📊"
      case "skill":
        return "🔧"
      case "experience":
        return "💼"
      default:
        return "📄"
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          className="w-full max-w-3xl bg-netflix-dark rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center p-4 border-b border-gray-800">
            <Search className="text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for projects, case studies, skills..."
              className="flex-1 bg-transparent text-white border-none outline-none text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center text-gray-400">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-netflix-red border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="p-2">
                {results.map((result) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start p-3 rounded-md hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => handleResultClick(result.url)}
                  >
                    {result.image && !imageErrors[result.id] ? (
                      <div className="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded">
                        <ResponsiveImage
                          src={result.image}
                          alt={result.title}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                          fallbackText={result.title}
                          onError={() => handleImageError(result.id)}
                          containerClassName="w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-16 h-16 mr-4 bg-netflix-red/20 rounded flex items-center justify-center text-2xl">
                        {getTypeIcon(result.type)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-xs uppercase text-netflix-red mr-2">{result.type.replace("-", " ")}</span>
                        <h4 className="text-white font-medium">{result.title}</h4>
                      </div>
                      {result.description && <p className="text-gray-400 text-sm mt-1">{result.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : searchQuery.length > 1 ? (
              <div className="p-8 text-center text-gray-400">
                <p>No results found for "{searchQuery}"</p>
                <p className="mt-2 text-sm">Try searching for projects, case studies, or skills</p>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <p>Start typing to search</p>
                <div className="mt-4 grid grid-cols-2 gap-2 max-w-md mx-auto">
                  <div className="bg-gray-800 p-2 rounded text-sm">ONESTOPSG</div>
                  <div className="bg-gray-800 p-2 rounded text-sm">Digital Marketing</div>
                  <div className="bg-gray-800 p-2 rounded text-sm">Case Studies</div>
                  <div className="bg-gray-800 p-2 rounded text-sm">Cybersecurity</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

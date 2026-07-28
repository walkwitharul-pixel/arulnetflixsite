"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { projectsData } from "@/lib/projects-data"
import { caseStudiesData } from "@/lib/case-studies-data"
import { skillsData } from "@/lib/skills-data"
import { timelineData } from "@/lib/timeline-data"
import { resolveThumbnail, slugify } from "@/lib/design-tokens"

interface SearchResult {
  id: string
  title: string
  type: "project" | "case-study" | "skill" | "experience" | "page"
  image?: string
  description?: string
  url: string
}

const TYPE_LABEL: Record<SearchResult["type"], string> = {
  project: "Venture",
  "case-study": "Case Study",
  skill: "Skill",
  experience: "Experience",
  page: "Page",
}

const SUGGESTIONS = ["VELANTEC", "GrowthLab", "Digital Marketing", "Case Studies", "MrAssistant", "Skills"]

function buildSearchIndex(): SearchResult[] {
  const projects: SearchResult[] = projectsData.map((p) => ({
    id: `project-${p.id}`,
    title: p.title,
    type: "project",
    image: p.image,
    description: p.description,
    url: `/projects/${p.id}`,
  }))

  const cases: SearchResult[] = caseStudiesData.map((c) => ({
    id: `case-${c.id}`,
    title: c.title,
    type: "case-study",
    image: c.image,
    description: c.description,
    url: `/case-studies/${c.id}`,
  }))

  const skills: SearchResult[] = skillsData.map((s) => ({
    id: `skill-${s.name}`,
    title: s.name,
    type: "skill",
    image: resolveThumbnail(s.name),
    description: s.description,
    url: `/skills#skill-${slugify(s.name)}`,
  }))

  const experience: SearchResult[] = timelineData
    .filter((t) => t.timelineType === "work")
    .map((t) => {
      const slug = slugify(t.name)
      return {
        id: `exp-${slug}`,
        title: `${t.title} at ${t.name}`,
        type: "experience" as const,
        image: resolveThumbnail(t.name),
        description: t.summaryPoints,
        url: `/work-experience#${slug}`,
      }
    })

  const pages: SearchResult[] = [
    { id: "page-about", title: "About", type: "page", description: "My story and ventures", url: "/about" },
    { id: "page-contact", title: "Contact", type: "page", description: "Get in touch", url: "/contact" },
    { id: "page-testimonials", title: "Testimonials", type: "page", description: "What people say", url: "/testimonials" },
    { id: "page-case-studies", title: "Case Studies", type: "page", description: "Impact and results", url: "/case-studies" },
    { id: "page-projects", title: "Ventures", type: "page", description: "Companies and products", url: "/projects" },
    { id: "page-skills", title: "Skills", type: "page", description: "Capabilities and tools", url: "/skills" },
  ]

  return [...projects, ...cases, ...skills, ...experience, ...pages]
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchData = useMemo(() => buildSearchIndex(), [])

  useEffect(() => {
    if (!isOpen) return
    setSearchQuery("")
    setResults([])
    const t = window.setTimeout(() => inputRef.current?.focus(), 40)
    return () => window.clearTimeout(t)
  }, [isOpen])

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      return
    }
    const q = searchQuery.toLowerCase().trim()
    setResults(
      searchData
        .filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q) ||
            TYPE_LABEL[item.type].toLowerCase().includes(q) ||
            item.type.includes(q),
        )
        .slice(0, 14),
    )
  }, [searchQuery, searchData])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen, onClose])

  const handleResultClick = (url: string) => {
    router.push(url)
    onClose()
    setSearchQuery("")
  }

  const showEmpty = searchQuery.trim().length > 1 && results.length === 0
  const showIdle = searchQuery.trim().length < 2

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="nf-search"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="nf-search"
        >
          <div className="nf-search__bar">
            <button type="button" className="nf-search__icon-btn" onClick={onClose} aria-label="Close search">
              <ArrowLeft strokeWidth={2.2} />
            </button>

            <div className="nf-search__field">
              <Search className="nf-search__field-icon" strokeWidth={2.2} aria-hidden />
              <input
                ref={inputRef}
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Titles, ventures, skills"
                className="nf-search__input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  className="nf-search__clear"
                  onClick={() => {
                    setSearchQuery("")
                    inputRef.current?.focus()
                  }}
                  aria-label="Clear search"
                >
                  <X strokeWidth={2.4} />
                </button>
              )}
            </div>
          </div>

          <div className="nf-search__body">
            {showIdle && (
              <div className="nf-search__section">
                <h2 className="nf-search__heading">Top Searches</h2>
                <ul className="nf-search__suggestions">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button type="button" className="nf-search__suggestion" onClick={() => setSearchQuery(s)}>
                        <Search className="nf-search__suggestion-icon" strokeWidth={2} aria-hidden />
                        <span>{s}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showEmpty && (
              <div className="nf-search__empty">
                <p>
                  No results for <span>&ldquo;{searchQuery.trim()}&rdquo;</span>
                </p>
                <p className="nf-search__empty-hint">Try another title, venture, or skill.</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="nf-search__section">
                <h2 className="nf-search__heading">
                  {results.length} Result{results.length === 1 ? "" : "s"}
                </h2>
                <ul className="nf-search__results">
                  {results.map((result) => (
                    <li key={result.id}>
                      <button type="button" className="nf-search__result" onClick={() => handleResultClick(result.url)}>
                        <div className="nf-search__thumb">
                          {result.image ? (
                            <Image src={result.image} alt="" fill className="object-cover" sizes="112px" />
                          ) : (
                            <span className="nf-search__thumb-fallback">{TYPE_LABEL[result.type].slice(0, 1)}</span>
                          )}
                        </div>
                        <div className="nf-search__meta">
                          <p className="nf-search__type">{TYPE_LABEL[result.type]}</p>
                          <h3 className="nf-search__title">{result.title}</h3>
                          {result.description && <p className="nf-search__desc">{result.description}</p>}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

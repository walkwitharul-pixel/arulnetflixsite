"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Clapperboard, Briefcase, UserRound, Search } from "lucide-react"
import { useProfile } from "@/context/profile-context"
import { useEffect, useState } from "react"
import SearchModal from "./search-modal"

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { activeProfile } = useProfile()
  const [searchOpen, setSearchOpen] = useState(false)

  const hide = pathname === "/" || pathname === "/browse"

  useEffect(() => {
    document.documentElement.classList.toggle("has-mobile-nav", !hide)
    return () => document.documentElement.classList.remove("has-mobile-nav")
  }, [hide])

  // Hide on intro + browse (Netflix profile picker)
  if (hide) return null

  const homePath = activeProfile ? `/profile/${activeProfile}` : "/browse"

  const tabs = [
    { name: "Home", href: homePath, icon: Home, match: (p: string) => p.startsWith("/profile") },
    {
      name: "Ventures",
      href: "/projects",
      icon: Clapperboard,
      match: (p: string) => p.startsWith("/projects") || p.startsWith("/case-studies"),
    },
    { name: "Search", href: "#search", icon: Search, match: () => false, action: "search" as const },
    {
      name: "Work",
      href: "/work-experience",
      icon: Briefcase,
      match: (p: string) => p.startsWith("/work") || p.startsWith("/skills"),
    },
    {
      name: "About",
      href: "/about",
      icon: UserRound,
      match: (p: string) =>
        p.startsWith("/about") || p.startsWith("/contact") || p.startsWith("/testimonials"),
    },
  ]

  return (
    <>
      <nav className="nf-mobile-tabbar" aria-label="Mobile navigation">
          {tabs.map((tab) => {
          const active = tab.action === "search" ? searchOpen : tab.match(pathname)
          const Icon = tab.icon
          if (tab.action === "search") {
            return (
              <button
                key={tab.name}
                type="button"
                className={`nf-mobile-tab ${active ? "is-active" : ""}`}
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Icon className="nf-mobile-tab__icon" strokeWidth={2.2} />
                <span>{tab.name}</span>
              </button>
            )
          }
          return (
            <Link key={tab.name} href={tab.href} className={`nf-mobile-tab ${active ? "is-active" : ""}`}>
              <Icon className="nf-mobile-tab__icon" strokeWidth={2.2} />
              <span>{tab.name}</span>
            </Link>
          )
        })}
      </nav>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import SearchModal from "./search-modal"
import ThemeToggle from "./theme-toggle"
import { useProfile } from "@/context/profile-context"

const notifications = [
  {
    id: "1",
    title: "New case study",
    body: "ONESTOPSG digital marketing results are live",
    href: "/case-studies/onestopsg-seo",
    time: "2d ago",
  },
  {
    id: "2",
    title: "Venture update",
    body: "Explore VELANTEC and the full venture stack",
    href: "/projects/velantec",
    time: "5d ago",
  },
  {
    id: "3",
    title: "Community",
    body: "GrowthLab founder network highlights",
    href: "/projects/growthlab",
    time: "1w ago",
  },
  {
    id: "4",
    title: "Get in touch",
    body: "Open to collaborations and opportunities",
    href: "/contact",
    time: "1w ago",
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { activeProfile } = useProfile()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setNotifOpen(false)
    setProfileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (notifRef.current && !notifRef.current.contains(t)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(t)) setProfileOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const homePath = activeProfile ? `/profile/${activeProfile}` : "/browse"
  const profileLabel = activeProfile
    ? activeProfile.charAt(0).toUpperCase() + activeProfile.slice(1)
    : "Profile"

  const navLinks = [
    { name: "Home", path: homePath },
    { name: "Ventures", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/work-experience" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const isActive = (path: string) =>
    pathname === path || (path !== homePath && pathname.startsWith(path))

  const header = (
    <header className={`nf-header ${scrolled ? "nf-header--scrolled" : ""}`} role="banner">
      <nav className="nf-header__inner" aria-label="Main navigation">
        <div className="nf-header__left">
          <Link href={homePath} className="nf-header__logo" aria-label="ARUL home">
            ARUL
          </Link>

          <ul className="nf-header__links">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    aria-current={active ? "page" : undefined}
                    className={active ? "nf-header__link nf-header__link--active" : "nf-header__link"}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="nf-header__right">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="nf-header__icon-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm9.5 2.5-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <ThemeToggle />

          <div className="nf-header__notif" ref={notifRef}>
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={notifOpen}
              onClick={() => {
                setNotifOpen((v) => !v)
                setProfileOpen(false)
              }}
              className="nf-header__icon-btn nf-header__bell"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 22a2.2 2.2 0 0 0 2.2-2.2h-4.4A2.2 2.2 0 0 0 12 22Zm7.2-5.5V11a7.2 7.2 0 0 0-5.4-6.95V3.6a1.8 1.8 0 1 0-3.6 0v.45A7.2 7.2 0 0 0 4.8 11v5.5L3 18.3v.9h18v-.9l-1.8-1.8Z" />
              </svg>
              <span className="nf-header__badge">{notifications.length}</span>
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="nf-header__dropdown nf-header__dropdown--wide"
                >
                  <div className="nf-header__dropdown-title">Notifications</div>
                  <ul className="nf-header__dropdown-list">
                    {notifications.map((n) => (
                      <li key={n.id}>
                        <Link href={n.href} onClick={() => setNotifOpen(false)}>
                          <div className="nf-header__dropdown-row">
                            <span>{n.title}</span>
                            <time>{n.time}</time>
                          </div>
                          <p>{n.body}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/testimonials" className="nf-header__kids">
            <Image src="/images/profiles/kids.svg" alt="" width={32} height={32} />
            <span>Kids</span>
          </Link>

          <div className="nf-header__profile" ref={profileRef}>
            <button
              type="button"
              aria-label="Account menu"
              aria-expanded={profileOpen}
              onClick={() => {
                setProfileOpen((v) => !v)
                setNotifOpen(false)
              }}
              className="nf-header__profile-btn"
            >
              <Image src="/images/profiles/smiley.svg" alt="" width={32} height={32} />
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                className={profileOpen ? "nf-header__caret nf-header__caret--open" : "nf-header__caret"}
                aria-hidden
              >
                <path d="M0 0l5 6 5-6H0z" fill="currentColor" />
              </svg>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="nf-header__dropdown"
                >
                  <div className="nf-header__dropdown-profile">
                    <Image src="/images/profiles/smiley.svg" alt="" width={32} height={32} />
                    <span>{profileLabel}</span>
                  </div>
                  <ul className="nf-header__dropdown-list">
                    {[
                      { href: "/browse", label: "Switch Profiles" },
                      { href: "/about", label: "Account" },
                      { href: "/contact", label: "Help Center" },
                      { href: "/testimonials", label: "Testimonials" },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} onClick={() => setProfileOpen(false)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="nf-header__menu-btn"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="nf-header__mobile"
          >
            <ul>
              {navLinks.map((link) => {
                const active = isActive(link.path)
                return (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className={active ? "nf-header__link nf-header__link--active" : "nf-header__link"}
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      {mounted ? createPortal(header, document.body) : header}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

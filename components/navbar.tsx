"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearch, FaBell } from "react-icons/fa"
import { ModeToggle } from "./mode-toggle"
import SearchModal from "./search-modal"
import { useProfile } from "@/context/profile-context"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { activeProfile, profileColor, profileTheme } = useProfile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Home", path: activeProfile ? `/profile/${activeProfile}` : "/profile/recruiter" },
    { name: "About Me", path: "/about" },
    { name: "Ventures", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/work-experience" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Contact", path: "/contact" },
  ]

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-netflix-black shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
        style={{ backgroundColor: scrolled ? profileTheme.secondary : undefined }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href={activeProfile ? `/profile/${activeProfile}` : "/profile/recruiter"}
                className="flex-shrink-0"
                aria-label="Go to homepage"
              >
                <div className="h-8 w-auto relative">
                  {/* Use a text logo with your name */}
                  <div className="text-2xl font-bold" style={{ color: profileColor }}>
                    ARUL MURUGAN
                  </div>
                </div>
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-300 ${
                      pathname === link.path ? "text-white border-b-2" : "text-gray-300 hover:text-white"
                    }`}
                    style={{
                      borderColor: pathname === link.path ? profileColor : undefined,
                      color: pathname === link.path ? profileColor : undefined,
                    }}
                    aria-current={pathname === link.path ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <ModeToggle />
              <button
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <FaSearch className="h-5 w-5" />
              </button>
              <button className="text-gray-300 hover:text-white transition-colors" aria-label="Notifications">
                <FaBell className="h-5 w-5" />
              </button>
              <div className="relative">
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                  aria-label="Profile menu"
                >
                  <div
                    className="w-8 h-8 relative rounded-md overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: profileColor }}
                  >
                    <span className="text-white font-bold">A</span>
                  </div>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex md:hidden items-center space-x-4">
              <button
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <FaSearch className="h-5 w-5" />
              </button>
              <ModeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden bg-netflix-black overflow-hidden"
              style={{ backgroundColor: profileTheme.secondary }}
            >
              <div className="pt-2 pb-4 space-y-1">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={menuItemVariants}>
                    <Link
                      href={link.path}
                      className={`block pl-3 pr-4 py-2 text-base font-medium ${
                        pathname === link.path
                          ? "border-l-4 text-white"
                          : "text-gray-300 hover:text-white hover:bg-gray-900"
                      }`}
                      style={{
                        borderColor: pathname === link.path ? profileColor : undefined,
                        color: pathname === link.path ? profileColor : undefined,
                      }}
                      aria-current={pathname === link.path ? "page" : undefined}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

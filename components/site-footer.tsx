"use client"

import Link from "next/link"
import { personalData } from "@/lib/personal-data"
import { useProfile } from "@/context/profile-context"

const footerLinks = [
  { name: "Ventures", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/work-experience" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Videos", href: "/about#videos" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
]

export default function SiteFooter() {
  const { activeProfile } = useProfile()
  const homeHref = activeProfile ? `/profile/${activeProfile}` : "/browse"

  return (
    <footer className="bg-nf-bg border-t border-[color:var(--nf-border)] mt-auto">
      <div className="nf-gutter py-8 sm:py-10">
        <p className="text-nf-text font-semibold mb-1">{personalData.fullName}</p>
        <p className="text-nf-dim text-sm mb-6 max-w-xl">{personalData.tagline}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 max-w-3xl">
          <Link href={homeHref} className="text-nf-dim hover:text-nf-text text-sm transition-colors">
            Home
          </Link>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-nf-dim hover:text-nf-text text-sm transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <a
            href={personalData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-nf-dim hover:text-nf-text text-sm"
          >
            LinkedIn
          </a>
          <a
            href={personalData.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-nf-dim hover:text-nf-text text-sm"
          >
            Instagram
          </a>
          <a href={personalData.contact.emailHref} className="text-nf-dim hover:text-nf-text text-sm">
            {personalData.contact.email}
          </a>
          <a href={personalData.contact.phoneHref} className="text-nf-dim hover:text-nf-text text-sm">
            {personalData.contact.phone}
          </a>
          <span className="text-nf-dim text-sm">{personalData.location.display}</span>
        </div>

        <p className="text-nf-dim text-xs">
          © {new Date().getFullYear()} {personalData.fullName}. Portfolio inspired by streaming UI patterns — not
          affiliated with Netflix.
        </p>
      </div>
    </footer>
  )
}

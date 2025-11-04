import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ImagePreloadProvider from "@/components/image-preload-provider"
import SoundPlayer from "@/components/sound-player"
import PageTransition from "@/components/page-transition"
import { ProfileProvider } from "@/context/profile-context"

// Load Netflix Sans font
const netflixSans = localFont({
  src: [
    {
      path: "../public/fonts/NetflixSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/NetflixSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NetflixSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NetflixSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-netflix-sans",
})

export const metadata: Metadata = {
  title: "Arul Murugan | Portfolio",
  description: "Personal portfolio of Arul Murugan - Entrepreneur, Founder, and CEO of multiple ventures",
    generator: 'v0.app'
}

// Define critical images to preload for each route
const criticalImages = {
  "/": ["/images/logos/velantec-logo.png"],
  "/browse": [
    "/images/profiles/stalker.png",
    "/images/profiles/investor.png",
    "/images/profiles/recruiter.png",
    "/images/profiles/community.png",
    "/images/profiles/adventurer.png",
  ],
  "/profile": [
    "/images/logos/velantec-logo.png",
    "/images/logos/onestopsg-logo.png",
    "/images/logos/growthlab-logo.png",
  ],
  "/projects": [
    "/images/logos/velantec-logo.png",
    "/images/logos/onestopsg-logo.png",
    "/images/logos/growthlab-logo.png",
  ],
  "/case-studies": ["/images/logos/velantec-logo.png", "/images/logos/onestopsg-logo.png"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/NetflixSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/NetflixSans-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Add preconnect for external resources */}
        <link rel="preconnect" href="https://i.giphy.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${netflixSans.variable} font-netflix text-white bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ProfileProvider>
            <ImagePreloadProvider criticalImages={criticalImages}>
              <PageTransition>{children}</PageTransition>
              <SoundPlayer />
            </ImagePreloadProvider>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

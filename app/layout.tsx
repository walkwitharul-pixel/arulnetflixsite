import type React from "react"
import type { Metadata } from "next"
import { Outfit, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ImagePreloadProvider from "@/components/image-preload-provider"
import SoundPlayer from "@/components/sound-player"
import PageTransition from "@/components/page-transition"
import { ProfileProvider } from "@/context/profile-context"
import ThemeAwareToaster from "@/components/theme-aware-toaster"
import MobileBottomNav from "@/components/mobile-bottom-nav"

/** Geometric sans that reads like Netflix UI without proprietary fonts */
const netflixSans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-netflix-sans",
  display: "swap",
})

/** Tall condensed display — Graphique-style intro letters (open alternative) */
const graphiqueDisplay = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graphique",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Arul Murugan | Portfolio",
  description:
    "Portfolio of Arul Murugan — founder of VELANTEC, ONESTOPSG, Aval.sg, GrowthLab, and MrAssistant.Ai. Based in Singapore.",
  generator: "v0.app",
}

const criticalImages = {
  "/": ["/images/logos/velantec-logo.png"],
  "/browse": [
    "/images/profiles/stalker.svg",
    "/images/profiles/investor.svg",
    "/images/profiles/recruiter.svg",
    "/images/profiles/community.svg",
    "/images/profiles/adventurer.svg",
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={`${netflixSans.variable} ${graphiqueDisplay.variable} font-netflix antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          themes={["light", "dark"]}
          disableTransitionOnChange
        >
          <ProfileProvider>
            <ImagePreloadProvider criticalImages={criticalImages}>
              <PageTransition>{children}</PageTransition>
              <MobileBottomNav />
              <SoundPlayer />
              <ThemeAwareToaster />
            </ImagePreloadProvider>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

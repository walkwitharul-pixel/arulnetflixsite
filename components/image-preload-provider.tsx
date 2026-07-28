"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"

type PreloadStatus = {
  [key: string]: "idle" | "loading" | "loaded" | "error"
}

type PreloadContextType = {
  preloadImages: (urls: string[]) => void
  preloadStatus: PreloadStatus
  preloadedImages: Set<string>
  isLoading: boolean
}

const PreloadContext = createContext<PreloadContextType>({
  preloadImages: () => {},
  preloadStatus: {},
  preloadedImages: new Set(),
  isLoading: false,
})

export const useImagePreloader = () => useContext(PreloadContext)

interface PreloadProviderProps {
  children: ReactNode
  criticalImages?: Record<string, string[]>
}

export const ImagePreloadProvider: React.FC<PreloadProviderProps> = ({ children, criticalImages = {} }) => {
  const pathname = usePathname()
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
  const [preloadStatus, setPreloadStatus] = useState<PreloadStatus>({})
  const [isLoading, setIsLoading] = useState(false)
  const isInitialMount = useRef(true)
  const criticalImagesRef = useRef(criticalImages)

  // Update ref when criticalImages changes
  useEffect(() => {
    criticalImagesRef.current = criticalImages
  }, [criticalImages])

  // Preload critical images based on current route
  useEffect(() => {
    if (!pathname) return

    // Skip on initial mount to prevent double loading
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const pagePath = Object.keys(criticalImagesRef.current).find(
      (path) => pathname.startsWith(path) || pathname === path,
    )

    if (pagePath && criticalImagesRef.current[pagePath]) {
      preloadImages(criticalImagesRef.current[pagePath])
    }
  }, [pathname]) // Only re-run when pathname changes

  const preloadImages = (urls: string[]) => {
    if (!urls || !urls.length) return

    // Filter out already loaded or loading images and invalid URLs
    const newImages = urls.filter(
      (url) => url && !preloadedImages.has(url) && preloadStatus[url] !== "loading" && preloadStatus[url] !== "loaded",
    )

    if (newImages.length === 0) return

    setIsLoading(true)

    // Mark images as loading
    const newStatus = { ...preloadStatus }
    newImages.forEach((url) => {
      newStatus[url] = "loading"
    })
    setPreloadStatus(newStatus)

    // Preload each image
    newImages.forEach((url) => {
      if (!url) return

      const img = new Image()

      img.onload = () => {
        setPreloadStatus((prev) => ({ ...prev, [url]: "loaded" }))
        setPreloadedImages((prev) => {
          const updated = new Set(prev)
          updated.add(url)
          return updated
        })

        // Check if all images are loaded
        checkAllLoaded(newStatus)
      }

      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`)
        setPreloadStatus((prev) => ({ ...prev, [url]: "error" }))

        // Check if all images are loaded or failed
        checkAllLoaded(newStatus)
      }

      img.src = url
    })
  }

  // Helper function to check if all images are loaded
  const checkAllLoaded = (statusObj: PreloadStatus) => {
    const allLoaded = Object.values(statusObj).every((status) => status === "loaded" || status === "error")

    if (allLoaded) {
      setIsLoading(false)
    }
  }

  return (
    <PreloadContext.Provider
      value={{
        preloadImages,
        preloadStatus,
        preloadedImages,
        isLoading,
      }}
    >
      {children}
    </PreloadContext.Provider>
  )
}

export default ImagePreloadProvider

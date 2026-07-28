"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from "react"
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

function matchCriticalPath(pathname: string, paths: string[]): string | undefined {
  // Prefer longest / most specific prefix; treat "/" as exact-only
  const ranked = paths
    .filter((path) => (path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`) || pathname.startsWith(path)))
    .sort((a, b) => b.length - a.length)
  return ranked[0]
}

export const ImagePreloadProvider: React.FC<PreloadProviderProps> = ({ children, criticalImages = {} }) => {
  const pathname = usePathname()
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
  const [preloadStatus, setPreloadStatus] = useState<PreloadStatus>({})
  const [isLoading, setIsLoading] = useState(false)
  const criticalImagesRef = useRef(criticalImages)
  const preloadedRef = useRef(preloadedImages)
  const statusRef = useRef(preloadStatus)

  useEffect(() => {
    criticalImagesRef.current = criticalImages
  }, [criticalImages])

  useEffect(() => {
    preloadedRef.current = preloadedImages
  }, [preloadedImages])

  useEffect(() => {
    statusRef.current = preloadStatus
  }, [preloadStatus])

  const preloadImages = useCallback((urls: string[]) => {
    if (!urls?.length) return

    const status = statusRef.current
    const already = preloadedRef.current
    const newImages = urls.filter(
      (url) => url && !already.has(url) && status[url] !== "loading" && status[url] !== "loaded",
    )
    if (newImages.length === 0) return

    setIsLoading(true)
    setPreloadStatus((prev) => {
      const next = { ...prev }
      newImages.forEach((url) => {
        next[url] = "loading"
      })
      return next
    })

    newImages.forEach((url) => {
      const img = new Image()
      img.onload = () => {
        setPreloadStatus((prev) => {
          const next = { ...prev, [url]: "loaded" as const }
          const allDone = Object.values(next).every((s) => s === "loaded" || s === "error")
          if (allDone) setIsLoading(false)
          return next
        })
        setPreloadedImages((prev) => {
          const updated = new Set(prev)
          updated.add(url)
          return updated
        })
      }
      img.onerror = () => {
        setPreloadStatus((prev) => {
          const next = { ...prev, [url]: "error" as const }
          const allDone = Object.values(next).every((s) => s === "loaded" || s === "error")
          if (allDone) setIsLoading(false)
          return next
        })
      }
      img.src = url
    })
  }, [])

  useEffect(() => {
    if (!pathname) return
    const pagePath = matchCriticalPath(pathname, Object.keys(criticalImagesRef.current))
    if (pagePath && criticalImagesRef.current[pagePath]) {
      preloadImages(criticalImagesRef.current[pagePath])
    }
  }, [pathname, preloadImages])

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

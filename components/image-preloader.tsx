"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

// Define critical images to preload based on the current route
const routeToImagesMap: Record<string, string[]> = {
  // Home/browse page critical images
  "/browse": ["/placeholder.svg?height=150&width=150&text=Profile"],
  // Profile page critical images
  "/profile": ["/placeholder.svg?height=150&width=150&text=Profile"],
  // Projects page critical images
  "/projects": ["/placeholder.svg?height=192&width=384&text=Project"],
  // Case studies page critical images
  "/case-studies": ["/placeholder.svg?height=192&width=384&text=Case+Study"],
}

// Fallback images to preload for all routes
const globalImages = ["/placeholder.svg?height=150&width=150&text=Profile"]

interface ImagePreloaderProps {
  additionalImages?: string[]
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ additionalImages = [] }) => {
  const pathname = usePathname()
  const [preloadedImages, setPreloadedImages] = useState<string[]>([])
  const [loadingStatus, setLoadingStatus] = useState<Record<string, boolean>>({})
  const additionalImagesRef = useRef<string[]>(additionalImages)
  const isInitialMount = useRef(true)

  // Filter out external URLs that might cause issues
  const filterSafeUrls = (urls: string[]): string[] => {
    return urls.filter((url) => url && !url.startsWith("http") && !url.startsWith("blob:") && !url.includes("blob.com"))
  }

  // Update ref when additionalImages changes
  useEffect(() => {
    additionalImagesRef.current = filterSafeUrls(additionalImages)
  }, [additionalImages])

  useEffect(() => {
    if (!pathname) return

    // Skip on initial mount to prevent double loading
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // Determine which images to preload based on current route
    let imagesToPreload: string[] = [...globalImages]

    // Add route-specific images
    Object.entries(routeToImagesMap).forEach(([route, images]) => {
      if (pathname.startsWith(route)) {
        imagesToPreload = [...imagesToPreload, ...images]
      }
    })

    // Add any additional images passed as props
    if (additionalImagesRef.current.length > 0) {
      imagesToPreload = [...new Set([...imagesToPreload, ...additionalImagesRef.current])]
    }

    // Filter out external URLs and already preloaded images
    const safeImagesToPreload = filterSafeUrls(imagesToPreload)
    const newImagesToPreload = safeImagesToPreload.filter((img) => !preloadedImages.includes(img))

    if (newImagesToPreload.length === 0) return

    // Track loading status
    const newLoadingStatus = { ...loadingStatus }
    newImagesToPreload.forEach((src) => {
      newLoadingStatus[src] = false
    })
    setLoadingStatus(newLoadingStatus)

    // Preload images
    const preloadPromises = newImagesToPreload.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          setLoadingStatus((prev) => ({ ...prev, [src]: true }))
          resolve()
        }
        img.onerror = () => {
          console.warn(`Failed to preload image: ${src}`)
          setLoadingStatus((prev) => ({ ...prev, [src]: true }))
          resolve() // Resolve anyway to not block other images
        }
      })
    })

    // Update preloaded images list after all images are loaded
    Promise.all(preloadPromises)
      .then(() => {
        setPreloadedImages((prev) => [...prev, ...newImagesToPreload])
        console.log(`Preloaded ${newImagesToPreload.length} images for ${pathname}`)
      })
      .catch((error) => {
        console.error("Error preloading images:", error)
      })
  }, [pathname]) // Only re-run when pathname changes

  // Render link preload tags for critical images
  return (
    <>
      {pathname &&
        Object.entries(routeToImagesMap)
          .filter(([route]) => pathname.startsWith(route))
          .flatMap(([_, images]) => filterSafeUrls(images))
          .map((src) => (
            <link
              key={src}
              rel="preload"
              href={src}
              as="image"
              type={
                src.endsWith(".jpg") || src.endsWith(".jpeg")
                  ? "image/jpeg"
                  : src.endsWith(".png")
                    ? "image/png"
                    : src.endsWith(".svg")
                      ? "image/svg+xml"
                      : src.endsWith(".webp")
                        ? "image/webp"
                        : "image"
              }
              crossOrigin="anonymous"
            />
          ))}
    </>
  )
}

export default ImagePreloader

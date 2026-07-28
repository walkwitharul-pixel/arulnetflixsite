"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ImagePreloadLinkProps {
  src: string
  type?: string
  priority?: boolean
}

/**
 * Component to add preload link tags to the document head
 */
const ImagePreloadLink: React.FC<ImagePreloadLinkProps> = ({ src, type, priority = false }) => {
  const linkRef = useRef<HTMLLinkElement | null>(null)

  useEffect(() => {
    if (!src) return

    // Determine image type from extension if not provided
    const inferredType =
      type ||
      (src.endsWith(".jpg") || src.endsWith(".jpeg")
        ? "image/jpeg"
        : src.endsWith(".png")
          ? "image/png"
          : src.endsWith(".svg")
            ? "image/svg+xml"
            : src.endsWith(".webp")
              ? "image/webp"
              : src.endsWith(".gif")
                ? "image/gif"
                : "image")

    // Create link element if it doesn't exist
    if (!linkRef.current) {
      const link = document.createElement("link")
      link.rel = priority ? "preload" : "prefetch"
      link.as = "image"
      link.href = src
      link.type = inferredType
      link.crossOrigin = "anonymous"

      document.head.appendChild(link)
      linkRef.current = link
    }

    // Cleanup function to remove the link element
    return () => {
      if (linkRef.current && document.head.contains(linkRef.current)) {
        document.head.removeChild(linkRef.current)
      }
    }
  }, [src, type, priority])

  // This component doesn't render anything
  return null
}

export default ImagePreloadLink

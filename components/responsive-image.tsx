"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { AlertCircle } from "lucide-react"

interface ResponsiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  containerClassName?: string
  fallbackText?: string
  fallbackColor?: string
  showErrorIcon?: boolean
  priority?: boolean
  sizes?: string
  quality?: number
  unoptimized?: boolean
  retryOnError?: boolean
}

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  containerClassName = "",
  fallbackText,
  fallbackColor = "bg-gray-800",
  showErrorIcon = true,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  quality = 85,
  unoptimized = false,
  retryOnError = false,
}: ResponsiveImageProps) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  // Check if the URL is a blob URL or external URL that might cause issues
  const isExternalOrBlobUrl = src && (src.startsWith("http") || src.startsWith("blob:") || src.includes("blob.com"))

  // Reset state when src changes
  useEffect(() => {
    setHasError(false)
    setIsLoading(true)
    setRetryCount(0)
  }, [src])

  // Generate appropriate fallback URL
  const fallbackSrc = `/placeholder.svg?height=${height || 150}&width=${width || 150}&text=${encodeURIComponent(
    fallbackText || alt || "Image",
  )}`

  // Handle external URLs that might fail
  const imageSrc = hasError
    ? fallbackSrc
    : isExternalOrBlobUrl && !unoptimized
      ? // If it's an external URL and we're not using unoptimized, use a placeholder
        fallbackSrc
      : src

  // Show fallback UI if image fails to load
  if (hasError && !retryOnError) {
    return (
      <div
        className={`flex flex-col items-center justify-center ${fallbackColor} ${containerClassName}`}
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "100%",
          minHeight: height ? `${height}px` : "100px",
        }}
        role="img"
        aria-label={`Failed to load: ${alt}`}
      >
        {showErrorIcon && <AlertCircle className="w-8 h-8 text-netflix-red mb-2" />}
        <p className="text-gray-400 text-sm text-center px-2">{fallbackText || alt || "Image failed to load"}</p>
      </div>
    )
  }

  // Handle error and retry logic
  const handleImageError = () => {
    console.error(`Image error: ${src}`)

    if (retryOnError && retryCount < 2) {
      // Try again with a short delay
      setTimeout(() => {
        setRetryCount((prev) => prev + 1)
        setIsLoading(true)
        setHasError(false)
      }, 1000)
    } else {
      setHasError(true)
      setIsLoading(false)
    }
  }

  // Render the image
  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
          <div className="w-8 h-8 rounded-full border-2 border-netflix-red border-t-transparent animate-spin" />
        </div>
      )}

      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        className={`${className} transition-opacity duration-300`}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized || isExternalOrBlobUrl}
        onError={handleImageError}
        onLoad={() => {
          console.log(`Image loaded: ${src}`)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

export default ResponsiveImage

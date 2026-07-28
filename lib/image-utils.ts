/**
 * Utility functions for image handling
 */

// Verify if an image exists (client-side only)
export const verifyImageExists = async (src: string): Promise<boolean> => {
  if (typeof window === "undefined") return true

  try {
    const response = await fetch(src, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Error verifying image: ${src}`, error)
    return false
  }
}

// Generate a placeholder URL with text
export const generatePlaceholder = (text: string, width = 300, height = 200): string => {
  const encodedText = encodeURIComponent(text || "Image")
  return `/placeholder.svg?height=${height}&width=${width}&text=${encodedText}`
}

// Log image loading status
export const logImageStatus = (src: string, status: "loading" | "loaded" | "error"): void => {
  console.log(`Image ${status}: ${src}`)
}

// Create a debug image component
export const createDebugImage = (src: string): HTMLImageElement => {
  const img = new Image()
  img.onload = () => logImageStatus(src, "loaded")
  img.onerror = () => logImageStatus(src, "error")
  img.src = src
  return img
}

/**
 * Utility functions for generating profile avatars
 */

// Generate a colored avatar with initials
export const generateInitialsAvatar = (name: string, size = 150): string => {
  // Get the first letter of the name
  const initial = name.charAt(0).toUpperCase()

  // Generate a consistent color based on the name
  const colors = ["E50914", "0077B5", "6441A4", "FF9900", "1DB954", "5865F2"]
  const colorIndex = name.length % colors.length
  const backgroundColor = colors[colorIndex]

  // Create a data URI for an SVG
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Crect width='${size}' height='${size}' fill='%23${backgroundColor}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='${size / 2}px' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${initial}%3C/text%3E%3C/svg%3E`
}

// Generate a placeholder URL with text and color
export const generateColoredPlaceholder = (text: string, color: string, width = 150, height = 150): string => {
  const encodedText = encodeURIComponent(text || "Profile")
  const encodedColor = encodeURIComponent(color || "E50914")
  return `/placeholder.svg?height=${height}&width=${width}&text=${encodedText}&color=${encodedColor}`
}

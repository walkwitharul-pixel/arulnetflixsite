"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertCircle } from "lucide-react"

interface Props {
  children: ReactNode
  fallbackText?: string
  showErrorIcon?: boolean
  fallbackColor?: string
  className?: string
}

interface State {
  hasError: boolean
}

class ImageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Image error caught by boundary:", error, errorInfo)
  }

  render() {
    const { children, fallbackText, showErrorIcon = true, fallbackColor = "bg-gray-800", className = "" } = this.props

    if (this.state.hasError) {
      return (
        <div className={`flex flex-col items-center justify-center ${fallbackColor} ${className}`}>
          {showErrorIcon && <AlertCircle className="w-8 h-8 text-netflix-red mb-2" />}
          <p className="text-gray-400 text-sm text-center px-2">{fallbackText || "Image could not be loaded"}</p>
        </div>
      )
    }

    return children
  }
}

export default ImageErrorBoundary

"use client"

import { useEffect, useState } from "react"
import { verifyImageExists } from "@/lib/image-utils"

interface ImageVerifierProps {
  imagePaths: string[]
}

export default function ImageVerifier({ imagePaths }: ImageVerifierProps) {
  const [results, setResults] = useState<Record<string, boolean>>({})
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkImages = async () => {
      const checks = await Promise.all(
        imagePaths.map(async (path) => {
          const exists = await verifyImageExists(path)
          return { path, exists }
        }),
      )

      const resultsMap = checks.reduce((acc, { path, exists }) => {
        acc[path] = exists
        return acc
      }, {})

      setResults(resultsMap)
      setIsChecking(false)
    }

    checkImages()
  }, [imagePaths])

  if (isChecking) {
    return <div className="text-white text-sm">Checking image paths...</div>
  }

  return (
    <div className="bg-gray-900 p-4 rounded-md mt-4 max-w-md mx-auto">
      <h3 className="text-white font-bold mb-2">Image Path Verification</h3>
      <ul className="text-sm">
        {Object.entries(results).map(([path, exists]) => (
          <li key={path} className={`mb-1 ${exists ? "text-green-500" : "text-red-500"}`}>
            {path}: {exists ? "✓ Found" : "✗ Not Found"}
          </li>
        ))}
      </ul>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import ResponsiveImage from "./responsive-image"

interface GalleryImage {
  id: string
  src: string
  alt: string
  caption: string
  category: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(images)

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(images.map((img) => img.category)))]

  useEffect(() => {
    if (filter === "all") {
      setFilteredImages(images)
    } else {
      setFilteredImages(images.filter((img) => img.category === filter))
    }
  }, [filter, images])

  const handlePrevImage = () => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[prevIndex])
  }

  const handleNextImage = () => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[nextIndex])
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category ? "bg-netflix-red text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="cursor-pointer overflow-hidden rounded-lg relative group"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square">
                <ResponsiveImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-center px-2">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl h-full max-h-[80vh] flex flex-col items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 text-white hover:text-netflix-red z-10"
              aria-label="Close image"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={handlePrevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-netflix-red transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ResponsiveImage
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                containerClassName="w-full h-full"
              />
            </div>

            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-netflix-red transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-center">
              <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
              <p className="text-gray-300 text-sm mt-1">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useLanguage } from "@/lib/context"
import type { RestaurantImage, TranslatedText } from "@/lib/types"
import Image from "next/image"

interface RestaurantGalleryProps {
  images: RestaurantImage[]
}

export function RestaurantGallery({ images }: RestaurantGalleryProps) {
  const { t, language } = useLanguage()

  if (images.length === 0) {
    return null
  }

  return (
    <section className="bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">{t("photoGallery")}</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-lg ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              } aspect-square hover:opacity-90 transition-opacity`}
            >
              <Image
                src={image.image_url || "/placeholder.svg"}
                alt={(image.alt_text as TranslatedText)[language] || ""}
                fill
                className="object-cover"
                sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

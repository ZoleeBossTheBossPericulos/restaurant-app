"use client"

import { useLanguage } from "@/lib/context"
import type { RestaurantImage, TranslatedText } from "@/lib/types"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

interface RestaurantGalleryProps {
  images: RestaurantImage[]
}

export function RestaurantGallery({ images }: RestaurantGalleryProps) {
  const { t, language } = useLanguage()

  if (images.length === 0) {
    return null
  }

  const autoplayPlugin = Autoplay({
    delay: 4000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  })

  return (
    <section className="bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">{t("photoGallery")}</h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayPlugin]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {images.map((image, index) => (
              <CarouselItem key={image.id} className="pl-0 basis-full">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={image.image_url || "/placeholder.svg"}
                    alt={(image.alt_text as TranslatedText)[language] || ""}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-background/80 hover:bg-background" />
          <CarouselNext className="right-4 bg-background/80 hover:bg-background" />
          <CarouselDots />
        </Carousel>
      </div>
    </section>
  )
}

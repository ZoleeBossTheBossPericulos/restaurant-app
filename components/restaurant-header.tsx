"use client"

import { useLanguage } from "@/lib/context"
import type { Restaurant, TranslatedText } from "@/lib/types"
import { LanguageSwitcher } from "./language-switcher"
import Image from "next/image"

interface RestaurantHeaderProps {
  restaurant: Restaurant
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const { language } = useLanguage()

  return (
    <header className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      {restaurant.cover_image_url ? (
        <Image
          src={restaurant.cover_image_url || "/placeholder.svg"}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col">
        <div className="flex justify-end p-4">
          <LanguageSwitcher />
        </div>

        <div className="flex flex-1 items-end">
          <div className="w-full px-6 pb-8 md:px-12">
            {restaurant.logo_url && (
              <div className="mb-4 h-16 w-16 overflow-hidden rounded-full bg-white p-2 md:h-20 md:w-20">
                <Image
                  src={restaurant.logo_url || "/placeholder.svg"}
                  alt={restaurant.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            )}
            <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl lg:text-6xl">{restaurant.name}</h1>
            <p className="max-w-2xl text-lg text-white/90 md:text-xl">
              {(restaurant.description as TranslatedText)[language]}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import { useLanguage } from "@/lib/context"
import type { Restaurant, TranslatedText } from "@/lib/types"

interface RestaurantStoryProps {
  restaurant: Restaurant
}

export function RestaurantStory({ restaurant }: RestaurantStoryProps) {
  const { t, language } = useLanguage()

  const story = (restaurant.story as TranslatedText)[language]

  if (!story || story.trim() === "") {
    return null
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">{t("ourStory")}</h2>
        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">{story}</p>
        </div>
      </div>
    </section>
  )
}

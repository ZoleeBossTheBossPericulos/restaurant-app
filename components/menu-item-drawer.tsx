"use client"

import { useLanguage } from "@/lib/context"
import type { MenuItem, TranslatedText, TranslatedIngredients } from "@/lib/types"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { Leaf, Sprout, Wheat, AlertCircle, X } from "lucide-react"
import { useState, useRef } from "react"

interface MenuItemDrawerProps {
  item: MenuItem
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MenuItemDrawer({ item, open, onOpenChange }: MenuItemDrawerProps) {
  const { t, language } = useLanguage()
  const [, setApi] = useState<any>()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const images = item.image_url && item.image_url.trim() ? [item.image_url] : []

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-dvh max-h-dvh flex flex-col !mt-0 rounded-none data-[vaul-drawer-direction=bottom]:!max-h-screen md:h-auto md:max-h-[85vh] md:max-w-2xl md:mx-auto md:rounded-t-lg">
        <Button variant="secondary" size="icon" className="absolute right-4 cursor-pointer top-4 z-10" onClick={() => onOpenChange(false)}>
          <X className="h-4 w-4" />
        </Button>

        <div className="flex flex-col flex-1 overflow-hidden">
          {images.length > 0 && (
            <div className="relative w-full h-64 shrink-0 overflow-hidden">
              {images.length === 1 ? (
                <div className="relative h-full w-full">
                  <Image
                    src={images[0]}
                    alt={(item.name as TranslatedText)[language]}
                    fill
                    className="object-cover rounded-t-lg"
                    priority
                  />
                  {!item.is_available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <Badge variant="destructive" className="text-base px-4 py-2">
                        {t("notAvailable")}
                      </Badge>
                    </div>
                  )}
                </div>
              ) : (
                <Carousel setApi={setApi} className="w-full h-full">
                  <CarouselContent className="h-full">
                    {images.map((imageUrl, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="relative h-full w-full">
                          <Image
                            src={imageUrl}
                            alt={`${(item.name as TranslatedText)[language]} ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                  {!item.is_available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none">
                      <Badge variant="destructive" className="text-base px-4 py-2">
                        {t("notAvailable")}
                      </Badge>
                    </div>
                  )}
                </Carousel>
              )}
            </div>
          )}

          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6">
          <DrawerHeader className="p-0 mb-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <DrawerTitle className="text-2xl">{(item.name as TranslatedText)[language]}</DrawerTitle>
              <span className="text-2xl font-bold text-primary whitespace-nowrap">
                {item.price.toFixed(2)} {item.currency}
              </span>
            </div>
            {item.description && (item.description as TranslatedText)[language] && (
              <DrawerDescription className="text-base mt-2">
                {(item.description as TranslatedText)[language]}
              </DrawerDescription>
            )}
          </DrawerHeader>

          {/* Dietary & Allergen badges */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {item.is_vegetarian && (
              <Badge variant="outline" className="gap-1 border-green-600 text-green-700 dark:text-green-400">
                <Leaf className="h-4 w-4" />
                {t("vegetarian")}
              </Badge>
            )}
            {item.is_vegan && (
              <Badge variant="outline" className="gap-1 border-green-600 text-green-700 dark:text-green-400">
                <Sprout className="h-4 w-4" />
                {t("vegan")}
              </Badge>
            )}
            {item.is_gluten_free && (
              <Badge variant="outline" className="gap-1 border-amber-600 text-amber-700 dark:text-amber-400">
                <Wheat className="h-4 w-4" />
                {t("glutenFree")}
              </Badge>
            )}
          </div>

          {/* Ingredients */}
          {item.ingredients && (item.ingredients as TranslatedIngredients)[language]?.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold">{t("ingredients")}</h3>
              <ul className="space-y-2">
                {(item.ingredients as TranslatedIngredients)[language].map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.allergens && item.allergens.length > 0 && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <h4 className="mb-1 font-medium">{t("allergenWarning")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.allergens.map((allergen) => t(allergen as any)).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

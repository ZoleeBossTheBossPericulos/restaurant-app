"use client"

import { useLanguage } from "@/lib/context"
import type { MenuItem, TranslatedText, TranslatedIngredients } from "@/lib/types"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { Leaf, Sprout, Wheat, AlertCircle, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface MenuItemDrawerProps {
  item: MenuItem
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MenuItemDrawer({ item, open, onOpenChange }: MenuItemDrawerProps) {
  const { t, language } = useLanguage()
  const [, setApi] = useState<any>()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  const images = item.image_url ? [item.image_url] : []

  // Handle scroll to adjust image size
  useEffect(() => {
    if (!open) {
      setScrollY(0)
      return
    }

    let handleScroll: (() => void) | null = null

    // Use a small delay to ensure the ref is attached after drawer opens
    const timer = setTimeout(() => {
      const scrollContainer = scrollContainerRef.current
      if (!scrollContainer) return

      handleScroll = () => {
        setScrollY(scrollContainer.scrollTop)
      }

      // Reset scroll position
      scrollContainer.scrollTop = 0
      setScrollY(0)

      // Add scroll listener
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true })
    }, 50)

    return () => {
      clearTimeout(timer)
      const scrollContainer = scrollContainerRef.current
      if (scrollContainer && handleScroll) {
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [open])

  // Calculate image height based on scroll position
  // Full height (320px) at scrollTop = 0, minimum height (96px) when scrolled
  // On desktop (md breakpoint), always use fixed height (320px)
  const MAX_SCROLL = 150 // Scroll distance for full transition
  const MAX_HEIGHT = 320 // Full height
  const MIN_HEIGHT = 96 // Minimum height when scrolled
  const DESKTOP_HEIGHT = 320 // Fixed height for desktop (h-80 = 320px)
  
  // Calculate height - use scroll-based on mobile, fixed on desktop
  // Desktop uses fixed height, mobile uses dynamic scroll-based height
  const [isDesktop, setIsDesktop] = useState(false)
  
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])
  
  const imageHeight = isDesktop
    ? DESKTOP_HEIGHT
    : Math.round(
        Math.max(
          MIN_HEIGHT,
          Math.min(
            MAX_HEIGHT,
            MAX_HEIGHT - (scrollY / MAX_SCROLL) * (MAX_HEIGHT - MIN_HEIGHT)
          )
        )
      )

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-dvh max-h-dvh flex flex-col !mt-0 rounded-none data-[vaul-drawer-direction=bottom]:!max-h-screen md:h-auto md:max-h-[85vh] md:max-w-2xl md:mx-auto md:rounded-t-lg">
        <Button variant="secondary" size="icon" className="absolute right-4 cursor-pointer top-4 z-10" onClick={() => onOpenChange(false)}>
          <X className="h-4 w-4" />
        </Button>

        <div className="flex flex-col flex-1 overflow-hidden">
          {images.length > 0 && (
            <div
              className="relative w-full shrink-0 overflow-hidden transition-[height] duration-300 ease-out will-change-[height] md:h-80"
              style={{ height: isDesktop ? `${DESKTOP_HEIGHT}px` : `${imageHeight}px` }}
            >
              {images.length === 1 ? (
                <div className="relative h-full w-full">
                  <Image
                    src={images[0] || "/placeholder.svg"}
                    alt={(item.name as TranslatedText)[language]}
                    fill
                    className="object-cover rounded-t-lg transition-transform duration-300 ease-out"
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
                            src={imageUrl || "/placeholder.svg"}
                            alt={`${(item.name as TranslatedText)[language]} ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 ease-out"
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

"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/context"
import type { MenuItem, TranslatedText, TranslatedIngredients } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Leaf, Sprout, Wheat, AlertCircle } from "lucide-react"
import { MenuItemDrawer } from "./menu-item-drawer"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { t, language } = useLanguage()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Card
        className={`overflow-hidden transition-all cursor-pointer hover:shadow-lg active:scale-[0.98] ${!item.is_available ? "opacity-60" : ""}`}
        onClick={() => setDrawerOpen(true)}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          {item.image_url && (
            <div className="relative h-48 w-full sm:h-auto sm:w-48">
              <Image
                src={item.image_url || "/placeholder.svg"}
                alt={(item.name as TranslatedText)[language]}
                fill
                className="object-cover"
              />
              {!item.is_available && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Badge variant="destructive">{t("notAvailable")}</Badge>
                </div>
              )}
            </div>
          )}

          <CardContent className="flex flex-1 flex-col justify-between p-4">
            {/* Header */}
            <div>
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold leading-tight">{(item.name as TranslatedText)[language]}</h3>
                <span className="whitespace-nowrap text-lg font-bold text-primary">
                  {item.price.toFixed(2)} {item.currency}
                </span>
              </div>

              {/* Description */}
              {item.description && (item.description as TranslatedText)[language] && (
                <p className="mb-3 text-sm text-muted-foreground">{(item.description as TranslatedText)[language]}</p>
              )}

              {/* Ingredients */}
              {item.ingredients && (item.ingredients as TranslatedIngredients)[language]?.length > 0 && (
                <div className="mb-3">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">{t("ingredients")}:</p>
                  <p className="text-sm">{(item.ingredients as TranslatedIngredients)[language].join(", ")}</p>
                </div>
              )}
            </div>

            {/* Footer with badges */}
            <div className="flex flex-wrap items-center gap-2">
              {item.is_vegetarian && (
                <Badge variant="outline" className="gap-1 border-green-600 text-green-700 dark:text-green-400">
                  <Leaf className="h-3 w-3" />
                  {t("vegetarian")}
                </Badge>
              )}
              {item.is_vegan && (
                <Badge variant="outline" className="gap-1 border-green-600 text-green-700 dark:text-green-400">
                  <Sprout className="h-3 w-3" />
                  {t("vegan")}
                </Badge>
              )}
              {item.is_gluten_free && (
                <Badge variant="outline" className="gap-1 border-amber-600 text-amber-700 dark:text-amber-400">
                  <Wheat className="h-3 w-3" />
                  {t("glutenFree")}
                </Badge>
              )}
              {item.allergens && item.allergens.length > 0 && (
                <Badge variant="outline" className="gap-1 border-red-600 text-red-700 dark:text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {item.allergens.map((allergen) => t(allergen as any)).join(", ")}
                </Badge>
              )}
            </div>
          </CardContent>
        </div>
      </Card>

      <MenuItemDrawer item={item} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  )
}

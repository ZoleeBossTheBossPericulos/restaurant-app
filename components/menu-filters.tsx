"use client"

import { useLanguage } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Leaf, Sprout, Wheat, X } from "lucide-react"
import { ALLERGENS } from "@/lib/types"
import { useState } from "react"

interface MenuFiltersProps {
  selectedAllergens: string[]
  onAllergenToggle: (allergen: string) => void
  showVegetarian: boolean
  onVegetarianToggle: () => void
  showVegan: boolean
  onVeganToggle: () => void
  showGlutenFree: boolean
  onGlutenFreeToggle: () => void
}

export function MenuFilters({
  selectedAllergens,
  onAllergenToggle,
  showVegetarian,
  onVegetarianToggle,
  showVegan,
  onVeganToggle,
  showGlutenFree,
  onGlutenFreeToggle,
}: MenuFiltersProps) {
  const { t } = useLanguage()
  const [showAllAllergens, setShowAllAllergens] = useState(false)

  const displayedAllergens = showAllAllergens ? ALLERGENS : ALLERGENS.slice(0, 6)

  return (
    <Card className="p-4 md:p-6">
      <div className="space-y-4">
        {/* Dietary filters */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t("filterByAllergen")}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={showVegetarian ? "default" : "outline"}
              size="sm"
              onClick={onVegetarianToggle}
              className="gap-2"
            >
              <Leaf className="h-4 w-4" />
              {t("vegetarian")}
            </Button>
            <Button variant={showVegan ? "default" : "outline"} size="sm" onClick={onVeganToggle} className="gap-2">
              <Sprout className="h-4 w-4" />
              {t("vegan")}
            </Button>
            <Button
              variant={showGlutenFree ? "default" : "outline"}
              size="sm"
              onClick={onGlutenFreeToggle}
              className="gap-2"
            >
              <Wheat className="h-4 w-4" />
              {t("glutenFree")}
            </Button>
          </div>
        </div>

        {/* Allergen filters */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("allergens")}</h3>
          <div className="flex flex-wrap gap-2">
            {displayedAllergens.map((allergen) => (
              <Badge
                key={allergen}
                variant={selectedAllergens.includes(allergen) ? "default" : "outline"}
                className="cursor-pointer px-3 py-1 hover:bg-accent"
                onClick={() => onAllergenToggle(allergen)}
              >
                {t(allergen as any)}
                {selectedAllergens.includes(allergen) && <X className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
          {ALLERGENS.length > 6 && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setShowAllAllergens(!showAllAllergens)}
              className="mt-2 text-xs"
            >
              {showAllAllergens ? t("showAll") : `+${ALLERGENS.length - 6} ${t("allergens").toLowerCase()}`}
            </Button>
          )}
        </div>

        {/* Active filters count */}
        {(selectedAllergens.length > 0 || showVegetarian || showVegan || showGlutenFree) && (
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-sm text-muted-foreground">
              {selectedAllergens.length + (showVegetarian ? 1 : 0) + (showVegan ? 1 : 0) + (showGlutenFree ? 1 : 0)}{" "}
              filters active
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                selectedAllergens.forEach((allergen) => onAllergenToggle(allergen))
                if (showVegetarian) onVegetarianToggle()
                if (showVegan) onVeganToggle()
                if (showGlutenFree) onGlutenFreeToggle()
              }}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

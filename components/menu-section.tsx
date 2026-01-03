"use client"

import { useLanguage } from "@/lib/context"
import type { MenuCategory, MenuItem, TranslatedText } from "@/lib/types"
import { MenuItemCard } from "./menu-item-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MenuSectionProps {
  categories: (MenuCategory & { items: MenuItem[] })[]
}

export function MenuSection({ categories }: MenuSectionProps) {
  const { t, language } = useLanguage()

  return (
    <section id="menu" className="py-12 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">{t("menu")}</h2>

        {/* Tabs */}
        <Tabs defaultValue={categories[0]?.id.toString()} className="w-full">
          <TabsList className="mb-8 w-full overflow-x-auto justify-start h-auto gap-2 flex-nowrap">
            {categories.map((category) => (
              <TabsTrigger key={category.id} id={`menu-category-${category.id}`} aria-controls={`menu-category-${category.id}`} value={category.id.toString()} className="text-base cursor-pointer flex-shrink-0">
                {(category.name as TranslatedText)[language]}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} id={`menu-category-${category.id}`} aria-labelledby={`menu-category-${category.id}`} value={category.id.toString()} className="mt-0">
              {category.description && (category.description as TranslatedText)[language] && (
                <p className="mb-6 text-muted-foreground">{(category.description as TranslatedText)[language]}</p>
              )}
              <div className="grid gap-6 lg:grid-cols-2">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

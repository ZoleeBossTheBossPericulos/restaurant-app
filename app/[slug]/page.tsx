import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"
import { RestaurantHeader } from "@/components/restaurant-header"
import { RestaurantNav } from "@/components/restaurant-nav"
import { RestaurantStory } from "@/components/restaurant-story"
import { RestaurantGallery } from "@/components/restaurant-gallery"
import { RestaurantInfo } from "@/components/restaurant-info"
import { MenuSection } from "@/components/menu-section"
import { LanguageProvider } from "@/lib/context"
import type { Restaurant, RestaurantImage, MenuCategory, MenuItem } from "@/lib/types"

export async function generateStaticParams() {
  const supabase = await createClient()
  const { data: restaurants } = await supabase.from("restaurants").select("slug")

  return (
    restaurants?.map((restaurant) => ({
      slug: restaurant.slug,
    })) ?? []
  )
}

export default async function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch restaurant data
  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .single()

  if (restaurantError || !restaurant) {
    notFound()
  }

  // Fetch restaurant images
  const { data: images } = await supabase
    .from("restaurant_images")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("display_order", { ascending: true })

  // Fetch menu categories with items
  const { data: categories } = await supabase
    .from("menu_categories")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("display_order", { ascending: true })

  const categoriesWithItems = await Promise.all(
    (categories || []).map(async (category) => {
      const { data: items } = await supabase
        .from("menu_items")
        .select("*")
        .eq("category_id", category.id)
        .order("display_order", { ascending: true })

      return {
        ...category,
        items: items || [],
      }
    }),
  )

  return (
    <LanguageProvider defaultLanguage="ro">
      <div className="min-h-screen bg-background">
        <RestaurantHeader restaurant={restaurant as Restaurant} />
        <RestaurantNav />

        <main>
          <MenuSection categories={categoriesWithItems as (MenuCategory & { items: MenuItem[] })[]} />

          <div id="about">
            <RestaurantStory restaurant={restaurant as Restaurant} />
          </div>

          <div id="gallery">
            <RestaurantGallery images={(images || []) as RestaurantImage[]} />
          </div>

          <div id="contact">
            <RestaurantInfo restaurant={restaurant as Restaurant} />
          </div>
        </main>
      </div>
    </LanguageProvider>
  )
}

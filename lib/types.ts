export interface Restaurant {
  id: string
  slug: string
  name: string
  description: TranslatedText
  story: TranslatedText
  phone?: string
  email?: string
  address?: string
  city?: string
  country?: string
  opening_hours?: OpeningHours
  logo_url?: string
  cover_image_url?: string
  created_at: string
  updated_at: string
}

export interface RestaurantImage {
  id: string
  restaurant_id: string
  image_url: string
  alt_text: TranslatedText
  display_order: number
  created_at: string
}

export interface MenuCategory {
  id: string
  restaurant_id: string
  name: TranslatedText
  description?: TranslatedText
  display_order: number
  created_at: string
}

export interface MenuItem {
  id: string
  category_id: string
  restaurant_id: string
  name: TranslatedText
  description?: TranslatedText
  ingredients: TranslatedIngredients
  allergens: string[]
  price: number
  currency: string
  image_url?: string
  is_available: boolean
  is_vegetarian: boolean
  is_vegan: boolean
  is_gluten_free: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface TranslatedText {
  ro: string
  en: string
  hu: string
}

export interface TranslatedIngredients {
  ro: string[]
  en: string[]
  hu: string[]
}

export interface OpeningHours {
  [key: string]: {
    open: string
    close: string
    closed?: boolean
  }
}

export type Language = "ro" | "en" | "hu"

export const ALLERGENS = [
  "gluten",
  "crustaceans",
  "eggs",
  "fish",
  "peanuts",
  "soybeans",
  "milk",
  "nuts",
  "celery",
  "mustard",
  "sesame",
  "sulphites",
  "lupin",
  "molluscs",
] as const

export type Allergen = (typeof ALLERGENS)[number]

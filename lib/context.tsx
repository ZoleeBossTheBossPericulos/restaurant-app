"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Language } from "@/lib/types"
import { translations, type TranslationKey } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getLanguageFromStorage(): Language {
  if (typeof window === "undefined") return "ro"
  
  // Try to get from cookie first (for SSR compatibility)
  const cookies = document.cookie.split(";")
  const langCookie = cookies.find((c) => c.trim().startsWith("preferred-language="))
  if (langCookie) {
    const lang = langCookie.split("=")[1]?.trim() as Language
    if (lang && ["ro", "en", "hu"].includes(lang)) {
      return lang
    }
  }
  
  // Fallback to localStorage
  const savedLanguage = localStorage.getItem("preferred-language") as Language | null
  if (savedLanguage && ["ro", "en", "hu"].includes(savedLanguage)) {
    return savedLanguage
  }
  
  return "ro"
}

function setLanguageInStorage(lang: Language) {
  // Set in both cookie and localStorage
  document.cookie = `preferred-language=${lang}; path=/; max-age=31536000; SameSite=Lax`
  localStorage.setItem("preferred-language", lang)
}

export function LanguageProvider({
  children,
  defaultLanguage = "ro",
}: { children: ReactNode; defaultLanguage?: Language }) {
  // Initialize with defaultLanguage to match SSR, then update in useEffect
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Sync language preference after mount
    // If localStorage has a different value than cookies, sync them
    const savedLanguage = getLanguageFromStorage()
    
    // If saved language differs from defaultLanguage (from server/cookies), update it
    if (savedLanguage !== defaultLanguage) {
      setLanguageState(savedLanguage)
      // Ensure cookie is set if we got it from localStorage
      if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";")
        const langCookie = cookies.find((c) => c.trim().startsWith("preferred-language="))
        if (!langCookie) {
          // Cookie doesn't exist but localStorage does - sync it
          document.cookie = `preferred-language=${savedLanguage}; path=/; max-age=31536000; SameSite=Lax`
        }
      }
    }
  }, [defaultLanguage])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setLanguageInStorage(lang)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

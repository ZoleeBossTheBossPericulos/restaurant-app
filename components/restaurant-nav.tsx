"use client"

import { useLanguage } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Menu, Info, ImageIcon, Phone } from "lucide-react"

export function RestaurantNav() {
  const { t } = useLanguage()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Find the sticky nav element
      const navElement = document.querySelector("nav") as HTMLElement | null
      const navHeight = navElement ? navElement.offsetHeight : 60 // Fallback to 60px
      
      // Get the element's position relative to the document
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      
      // Calculate offset: nav height + 16px extra padding for breathing room
      const offsetPosition = elementPosition - navHeight - 16

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-3">
        <Button variant="ghost" size="sm" onClick={() => scrollToSection("menu")} className="gap-2">
          <Menu className="h-4 w-4" />
          <span className="hidden sm:inline">{t("menu")}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => scrollToSection("about")} className="gap-2">
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">{t("about")}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => scrollToSection("gallery")} className="gap-2">
          <ImageIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{t("gallery")}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => scrollToSection("contact")} className="gap-2">
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">{t("contact")}</span>
        </Button>
      </div>
    </nav>
  )
}

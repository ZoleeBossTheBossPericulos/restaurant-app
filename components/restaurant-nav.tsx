"use client"

import { useLanguage } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Menu, Info, ImageIcon, Phone } from "lucide-react"

export function RestaurantNav() {
  const { t } = useLanguage()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
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

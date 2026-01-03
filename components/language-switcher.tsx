"use client"

import { useLanguage } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Language } from "@/lib/types"
import { RomaniaFlag, UnitedKingdomFlag, HungaryFlag } from "@/components/flags"

const LANGUAGES: { code: Language; label: string; FlagComponent: React.ComponentType<{ className?: string }> }[] = [
  { code: "ro", label: "Română", FlagComponent: RomaniaFlag },
  { code: "en", label: "English", FlagComponent: UnitedKingdomFlag },
  { code: "hu", label: "Magyar", FlagComponent: HungaryFlag },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const currentLanguage = LANGUAGES.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button id='language-switcher' variant="outline" size="sm" className="gap-2 bg-background/80 backdrop-blur-sm hover:bg-background border-border/50">
          {currentLanguage && <currentLanguage.FlagComponent className="w-5 h-4" />}
          <span className="hidden sm:inline">{currentLanguage?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border">
        {LANGUAGES.map((lang) => {
          const FlagComponent = lang.FlagComponent
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={language === lang.code ? "bg-accent" : "hover:bg-accent/50"}
            >
              <FlagComponent className="mr-2 w-5 h-4" />
              {lang.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

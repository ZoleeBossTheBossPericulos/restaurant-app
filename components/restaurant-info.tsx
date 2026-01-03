"use client"

import { useLanguage } from "@/lib/context"
import type { Restaurant, OpeningHours } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"

interface RestaurantInfoProps {
  restaurant: Restaurant
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  const { t } = useLanguage()

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const

  return (
    <section className="bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Information */}
            <Card className="py-6">
            <CardHeader>
              <CardTitle className="text-2xl">{t("contact")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {restaurant.phone && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-auto py-2 px-3 hover:bg-accent"
                  asChild
                >
                  <a href={`tel:${restaurant.phone}`}>
                    <Phone className="h-4 w-4 shrink-0 text-primary" />
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{t("phone")}</span>
                      <span className="font-medium text-xs sm:text-sm">{restaurant.phone}</span>
                    </div>
                  </a>
                </Button>
              )}
              {restaurant.email && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-auto py-2 px-3 hover:bg-accent"
                  asChild
                >
                  <a href={`mailto:${restaurant.email}`}>
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{t("email")}</span>
                      <span
                        className="font-medium text-xs sm:text-sm break-all text-left"
                        style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
                      >
                        {restaurant.email}
                      </span>
                    </div>
                  </a>
                </Button>
              )}
              {restaurant.address && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-auto py-2 px-3 hover:bg-accent"
                  asChild
                >
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${restaurant.address}${restaurant.city ? `, ${restaurant.city}` : ""}${restaurant.country ? `, ${restaurant.country}` : ""}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{t("address")}</span>
                      <span className="font-medium text-xs sm:text-sm break-words text-left">
                        {restaurant.address}
                        {restaurant.city && `, ${restaurant.city}`}
                        {restaurant.country && `, ${restaurant.country}`}
                      </span>
                    </div>
                    <ExternalLink className="h-3 w-3 shrink-0 ml-auto text-muted-foreground" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Opening Hours */}
          {restaurant.opening_hours && (
            <Card className="py-6">
              <CardHeader>
                <CardTitle className="text-2xl">{t("openingHours")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {days.map((day) => {
                    const hours = (restaurant.opening_hours as OpeningHours)?.[day]
                    if (!hours) return null

                    return (
                      <div key={day} className="contents">
                        <span className="font-medium capitalize text-sm sm:text-base">
                          {t(day)}
                        </span>
                        {hours.closed ? (
                          <span className="text-muted-foreground text-sm sm:text-base">
                            {t("closed")}
                          </span>
                        ) : (
                          <span className="font-medium text-right text-sm sm:text-base whitespace-nowrap">
                            {hours.open} - {hours.close}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

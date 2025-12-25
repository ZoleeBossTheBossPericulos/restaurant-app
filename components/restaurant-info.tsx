"use client"

import { useLanguage } from "@/lib/context"
import type { Restaurant, OpeningHours } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"

interface RestaurantInfoProps {
  restaurant: Restaurant
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  const { t, language } = useLanguage()

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const

  return (
    <section className="bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("contact")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {restaurant.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("phone")}</p>
                    <a href={`tel:${restaurant.phone}`} className="font-medium hover:text-primary">
                      {restaurant.phone}
                    </a>
                  </div>
                </div>
              )}
              {restaurant.email && (
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("email")}</p>
                    <a href={`mailto:${restaurant.email}`} className="font-medium hover:text-primary">
                      {restaurant.email}
                    </a>
                  </div>
                </div>
              )}
              {restaurant.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("address")}</p>
                    <p className="font-medium">
                      {restaurant.address}
                      {restaurant.city && `, ${restaurant.city}`}
                      {restaurant.country && `, ${restaurant.country}`}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Opening Hours */}
          {restaurant.opening_hours && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t("openingHours")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {days.map((day) => {
                    const hours = (restaurant.opening_hours as OpeningHours)?.[day]
                    if (!hours) return null

                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="font-medium capitalize">{t(day)}</span>
                        {hours.closed ? (
                          <span className="text-muted-foreground">{t("closed")}</span>
                        ) : (
                          <span className="font-medium">
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

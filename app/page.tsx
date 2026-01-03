import { createClient } from "@/lib/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: restaurants } = await supabase.from("restaurants").select("*").order("name")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Restaurant Menus</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Descoperiți meniurile noastre</h2>
            <p className="text-lg text-muted-foreground">
              Explorați restaurantele partenere și meniurile lor delicioase
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restaurants?.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden py-4 transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{restaurant.name}</CardTitle>
                  <CardDescription>{restaurant.description.ro}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {restaurant.city && (
                      <p className="text-sm text-muted-foreground">
                        📍 {restaurant.city}, {restaurant.country}
                      </p>
                    )}
                    <Button asChild className="w-full">
                      <Link href={`/${restaurant.slug}`}>Vezi meniul</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {(!restaurants || restaurants.length === 0) && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Nu există restaurante disponibile momentan. Vă rugăm să reveniți mai târziu.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Restaurant Menus. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  )
}

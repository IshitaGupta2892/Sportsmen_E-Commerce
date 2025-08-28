import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturedCollections() {
  const collections = [
    {
      title: "Running Essentials",
      description: "Lightweight, breathable gear for your daily runs",
      image: "/running-shoes-and-athletic-wear-on-track.png",
      href: "/search?q=running",
    },
    {
      title: "Gym Performance",
      description: "Strength training apparel built for intense workouts",
      image: "/gym-equipment-weights-athletic-clothing.png",
      href: "/search?q=gym",
    },
    {
      title: "Outdoor Adventure",
      description: "Weather-resistant gear for outdoor activities",
      image: "/outdoor-hiking-athletic-gear-mountains.png",
      href: "/search?q=outdoor",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">Featured Collections</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Explore our curated collections designed for every sport and activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-2">{collection.title}</h3>
                <p className="text-muted-foreground mb-4 text-pretty">{collection.description}</p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={collection.href}>Explore Collection</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function CategoryGrid() {
  const categories = [
    {
      name: "T-Shirts",
      image: "/mens-athletic-sportswear-clothing.png",
      href: "/search?q=tshirt",
    },
    {
      name: "Lowers",
      image: "/womens-athletic-sportswear-clothing.png",
      href: "/search?q=lowers",
    },
    {
      name: "Caps",
      image: "/sports-accessories-bags-water-bottles.png",
      href: "/search?q=cap",
    },
    {
      name: "Shorts",
      image: "/athletic-running-shoes-sneakers.png",
      href: "/search?q=shorts",
    },
    {
      name: "Full Sleeves",
      image: "/discounted-athletic-wear-sale-items.png",
      href: "/search?q=full%20sleeve",
    },
    {
      name: "Tracksuits",
      image: "/athletic-runner-in-motion-on-track-dynamic-action-.png",
      href: "/search?q=tracksuit",
    },
  ]

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">Shop Cricket Sportswear</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Explore premium cricket apparel—built for comfort, performance, and style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.href}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-40 md:h-48 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-center text-sm md:text-base">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

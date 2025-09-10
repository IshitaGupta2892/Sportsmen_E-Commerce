import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  images: string[]
  brand: string
  rating: number
  reviews: number
  onSale: boolean
}

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative overflow-hidden">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              {product.onSale && (
                <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                  Sale
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                </Link>

                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

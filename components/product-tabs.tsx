"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Product {
  specifications?: {
    material?: string
    fit?: string
    care?: string
    origin?: string
  }
  features: string[]
  reviews: number
  rating: number
}

interface ProductTabsProps {
  product: Product
}

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    title: "Perfect for running!",
    content:
      "This shirt is amazing for my morning runs. The moisture-wicking technology really works and it stays comfortable even during long distances.",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    author: "Mike R.",
    rating: 4,
    date: "2024-01-10",
    title: "Great quality, runs small",
    content:
      "Love the quality and feel of this shirt. Only issue is it runs a bit small, so I'd recommend sizing up. Otherwise, excellent product!",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    author: "Jennifer L.",
    rating: 5,
    date: "2024-01-05",
    title: "Exceeded expectations",
    content:
      "I was skeptical about the price, but this shirt has exceeded all my expectations. The fit is perfect and it looks great too.",
    helpful: 15,
    verified: true,
  },
]

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className="mb-16">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold">Product Features</h3>
                <div className="grid gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold">Product Specifications</h3>
                <div className="grid gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Material</span>
                    <span className="text-muted-foreground">{product.specifications?.material || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Fit</span>
                    <span className="text-muted-foreground">{product.specifications?.fit || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Care Instructions</span>
                    <span className="text-muted-foreground">{product.specifications?.care || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Origin</span>
                    <span className="text-muted-foreground">{product.specifications?.origin || "—"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {/* Reviews Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{product.rating}</div>
                    <div className="flex justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{product.reviews} reviews</div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-3">{stars}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{
                                width: `${stars === 5 ? 60 : stars === 4 ? 30 : stars === 3 ? 8 : stars === 2 ? 2 : 0}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {stars === 5 ? 77 : stars === 4 ? 38 : stars === 3 ? 10 : stars === 2 ? 3 : 0}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.author}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-muted-foreground">{review.content}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

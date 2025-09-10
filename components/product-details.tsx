"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Share2, Truck, Shield, RotateCcw } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  brand: string
  rating: number
  reviews: number
  colors: Array<{ name: string; value: string; hex: string }>
  sizes: string[]
  onSale: boolean
  description: string
  features: string[]
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState("")


  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Brand and Name */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-balance">{product.name}</h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{product.rating}</span>
        <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">₹{product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
            <Badge variant="destructive">{discountPercentage}% OFF</Badge>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{product.description}</p>

      <Separator />

      {/* Color Selection */}
      <div>
        <h3 className="font-medium mb-3">Color: {selectedColor.name}</h3>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-colors ${
                selectedColor.value === color.value ? "border-primary" : "border-gray-300"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="font-medium mb-3">Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2 px-4 border rounded-md text-sm font-medium transition-colors ${
                selectedSize === size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>


      {/* Share Button */}
      <div className="space-y-3">
        <Button variant="outline" size="lg" className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Share Product
        </Button>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-medium mb-3">Key Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Separator />

    </div>
  )
}

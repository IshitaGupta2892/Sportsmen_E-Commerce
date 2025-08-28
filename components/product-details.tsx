"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"

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
  inStock: boolean
  stockCount: number
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const increaseQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

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
        <span className="text-3xl font-bold">${product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
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

      {/* Quantity */}
      <div>
        <h3 className="font-medium mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stockCount}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">{product.stockCount} items available</span>
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button size="lg" className="w-full" disabled={!selectedSize || !product.inStock}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 bg-transparent"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            {isFavorite ? "Favorited" : "Add to Favorites"}
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
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

      {/* Shipping Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-4 w-4 text-primary" />
          <span>Free shipping on orders over $75</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="h-4 w-4 text-primary" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="h-4 w-4 text-primary" />
          <span>2-year warranty included</span>
        </div>
      </div>
    </div>
  )
}

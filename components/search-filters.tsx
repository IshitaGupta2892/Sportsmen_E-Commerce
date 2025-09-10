"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface Filters {
  categories: string[]
  brands: string[]
  colors: string[]
  sizes: string[]
  priceRange: [number, number]
  onSale: boolean
  rating: number
}

interface SearchFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  allProducts: any[]
}

export function SearchFilters({ filters, onFiltersChange, allProducts }: SearchFiltersProps) {
  // Extract unique values from all products
  const categories = [...new Set(allProducts.map((p) => p.category))]
  const brands = [...new Set(allProducts.map((p) => p.brand))]
  const colors = [...new Set(allProducts.flatMap((p) => p.colors))]
  const sizes = [...new Set(allProducts.flatMap((p) => p.sizes))]

  const updateFilters = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: keyof Filters, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilters(key, newArray)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      colors: [],
      sizes: [],
      priceRange: [0, 12000],
      onSale: false,
      rating: 0,
    })
  }

  const getActiveFilterCount = () => {
    return (
      filters.categories.length +
      filters.brands.length +
      filters.colors.length +
      filters.sizes.length +
      (filters.onSale ? 1 : 0) +
      (filters.rating > 0 ? 1 : 0) +
      (filters.priceRange[0] > 0 || filters.priceRange[1] < 12000 ? 1 : 0)
    )
  }

  const removeFilter = (type: string, value?: string) => {
    switch (type) {
      case "category":
        updateFilters(
          "categories",
          filters.categories.filter((c) => c !== value),
        )
        break
      case "brand":
        updateFilters(
          "brands",
          filters.brands.filter((b) => b !== value),
        )
        break
      case "color":
        updateFilters(
          "colors",
          filters.colors.filter((c) => c !== value),
        )
        break
      case "size":
        updateFilters(
          "sizes",
          filters.sizes.filter((s) => s !== value),
        )
        break
      case "sale":
        updateFilters("onSale", false)
        break
      case "rating":
        updateFilters("rating", 0)
        break
      case "price":
        updateFilters("priceRange", [0, 12000])
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters ({getActiveFilterCount()})</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge key={category} variant="secondary" className="gap-1">
                  {category}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("category", category)} />
                </Badge>
              ))}
              {filters.brands.map((brand) => (
                <Badge key={brand} variant="secondary" className="gap-1">
                  {brand}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("brand", brand)} />
                </Badge>
              ))}
              {filters.colors.map((color) => (
                <Badge key={color} variant="secondary" className="gap-1">
                  {color}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("color", color)} />
                </Badge>
              ))}
              {filters.sizes.map((size) => (
                <Badge key={size} variant="secondary" className="gap-1">
                  {size}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("size", size)} />
                </Badge>
              ))}
              {filters.onSale && (
                <Badge variant="secondary" className="gap-1">
                  On Sale
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("sale")} />
                </Badge>
              )}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="gap-1">
                  {filters.rating}+ Stars
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("rating")} />
                </Badge>
              )}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 12000) && (
                <Badge variant="secondary" className="gap-1">
                  ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("price")} />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Options */}
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Price Range</Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters("priceRange", value as [number, number])}
              max={12000}
              step={5}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Category</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleArrayFilter("categories", category)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm capitalize">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Brands */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Brand</Label>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => toggleArrayFilter("brands", brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Colors */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Color</Label>
            <div className="grid grid-cols-2 gap-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={() => toggleArrayFilter("colors", color)}
                  />
                  <Label htmlFor={`color-${color}`} className="text-sm capitalize">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Sizes */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Size</Label>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onCheckedChange={() => toggleArrayFilter("sizes", size)}
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Special Filters */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={filters.onSale}
                onCheckedChange={(checked) => updateFilters("onSale", checked)}
              />
              <Label htmlFor="on-sale" className="text-sm">
                On Sale
              </Label>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Minimum Rating</Label>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.rating === rating}
                      onCheckedChange={(checked) => updateFilters("rating", checked ? rating : 0)}
                    />
                    <Label htmlFor={`rating-${rating}`} className="text-sm">
                      {rating}+ Stars
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

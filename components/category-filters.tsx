"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function CategoryFilters() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [onSale, setOnSale] = useState(false)
  const [minRating, setMinRating] = useState(0)

  const brands = ["AthleteZone", "Nike", "Adidas", "Under Armour", "Puma"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = ["Black", "White", "Gray", "Navy", "Red", "Blue", "Green"]

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 200])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setOnSale(false)
    setMinRating(0)
  }

  const getActiveFilterCount = () => {
    return (
      selectedBrands.length +
      selectedSizes.length +
      selectedColors.length +
      (onSale ? 1 : 0) +
      (minRating > 0 ? 1 : 0) +
      (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0)
    )
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sale Filter */}
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" checked={onSale} onCheckedChange={(checked) => setOnSale(checked as boolean)} />
            <Label htmlFor="on-sale" className="text-sm">
              On Sale
            </Label>
          </div>
        </div>

        <Separator />

        {/* Rating Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={minRating === rating}
                  onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
                />
                <Label htmlFor={`rating-${rating}`} className="text-sm">
                  {rating}+ Stars
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range</Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={5} className="mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
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
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm">
                  {brand}
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
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <Label htmlFor={`size-${size}`} className="text-sm">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Colors */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Color</Label>
          <div className="space-y-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                />
                <Label htmlFor={`color-${color}`} className="text-sm">
                  {color}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

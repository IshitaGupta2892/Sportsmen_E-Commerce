"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { debounce } from "lodash"

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

// Memoize filter options to prevent unnecessary re-renders
const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="font-medium text-sm">{title}</h3>
    <div className="space-y-2">
      {children}
    </div>
  </div>
)

export function SearchFilters({ filters, onFiltersChange, allProducts }: SearchFiltersProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [open, setOpen] = useState(false)
  
  // Memoize filter options to prevent unnecessary re-renders
  const { categories, brands, colors, sizes } = useMemo(() => ({
    categories: [...new Set(allProducts.map((p) => p.category))],
    brands: [...new Set(allProducts.map((p) => p.brand))],
    colors: [...new Set(allProducts.flatMap((p) => p.colors))],
    sizes: [...new Set(allProducts.flatMap((p) => p.sizes))]
  }), [allProducts])

  // Debounce price range updates for better performance
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePriceRange = useCallback(
    debounce((value: [number, number]) => {
      onFiltersChange({ ...filters, priceRange: value })
    }, 300),
    [filters, onFiltersChange]
  )

  const updateFilters = useCallback((key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }, [filters, onFiltersChange])

  const toggleArrayFilter = useCallback((key: keyof Filters, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilters(key, newArray)
  }, [filters, updateFilters])

  const clearAllFilters = useCallback(() => {
    onFiltersChange({
      categories: [],
      brands: [],
      colors: [],
      sizes: [],
      priceRange: [0, 12000],
      onSale: false,
      rating: 0,
    })
  }, [onFiltersChange])

  const activeFilterCount = useMemo(() => (
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.onSale ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 12000 ? 1 : 0)
  ), [filters])

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

  // Mobile filter button and drawer
  const FilterButton = () => (
    <Button 
      variant="outline" 
      className="lg:hidden w-full justify-between"
      onClick={() => setOpen(true)}
    >
      <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
      <Filter className="ml-2 h-4 w-4" />
    </Button>
  )

  // Filter content component to avoid code duplication
  const FilterContent = useCallback(() => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Active Filters ({activeFilterCount})</h3>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
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
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("onSale", false)} />
              </Badge>
            )}
            {filters.rating > 0 && (
              <Badge variant="secondary" className="gap-1">
                {filters.rating}+ Stars
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("rating", 0)} />
              </Badge>
            )}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 12000) && (
              <Badge variant="secondary" className="gap-1">
                ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("priceRange", [0, 12000])} />
              </Badge>
            )}
          </div>
        </div>
      )}

      {activeFilterCount > 0 && <Separator />}

      {/* Filter Options */}
      <div className="space-y-6">
        {/* Price Range */}
        <FilterSection title="Price Range">
          <Slider
            value={filters.priceRange}
            onValueChange={updatePriceRange}
            max={12000}
            step={100}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </FilterSection>

        <Separator />

        {/* Categories */}
        <FilterSection title="Category">
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
        </FilterSection>

        <Separator />

        {/* Brands */}
        <FilterSection title="Brand">
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
        </FilterSection>

        <Separator />

        {/* Colors */}
        <FilterSection title="Color">
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
        </FilterSection>

        <Separator />

        {/* Sizes */}
        <FilterSection title="Size">
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
        </FilterSection>

        <Separator />

        {/* Special Filters */}
        <FilterSection title="Special Filters">
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
        </FilterSection>
      </div>
    </div>
  ), [activeFilterCount, brands, categories, clearAllFilters, colors, filters, removeFilter, sizes, toggleArrayFilter, updateFilters, updatePriceRange])
    
    // Get filtered products count for the mobile drawer button
  const filteredProductsCount = useMemo(() => {
    return allProducts.filter((product) => {
      // Filter by categories if any are selected
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      // Filter by brands if any are selected
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      // Filter by colors if any are selected
      if (filters.colors.length > 0 && !filters.colors.some((color) => product.colors.includes(color))) {
        return false;
      }
      // Filter by sizes if any are selected
      if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
        return false;
      }
      // Filter by price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      // Filter by sale status
      if (filters.onSale && !product.onSale) {
        return false;
      }
      // Filter by minimum rating
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }
      return true;
    }).length;
  }, [allProducts, filters]);

  return (
    <div className="space-y-4">
      {/* Mobile Filter Button */}
      <FilterButton />

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <Card className="sticky top-24">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filters</CardTitle>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FilterContent />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[80vh] max-h-[80vh] overflow-hidden">
          <div className="flex flex-col h-full">
            <DrawerHeader className="border-b">
              <div className="flex items-center justify-between">
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterContent />
            </div>
            <div className="border-t p-4">
              <Button className="w-full" onClick={() => setOpen(false)}>
                Show {filteredProductsCount} results
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

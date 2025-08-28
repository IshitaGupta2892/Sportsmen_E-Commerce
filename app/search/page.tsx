"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { SearchFilters } from "@/components/search-filters"
import { SearchResults } from "@/components/search-results"
import { SearchHeader } from "@/components/search-header"
import { allProducts as sourceProducts } from "@/lib/products"

// Map shared products to UI-friendly shape used by search and grid components
const allProducts = sourceProducts.map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  originalPrice: p.originalPrice,
  image: p.images[0],
  category: p.category,
  subcategory: p.subcategory,
  brand: p.brand,
  rating: p.rating,
  reviews: p.reviews,
  colors: p.colors.map((c) => c.value),
  sizes: p.sizes,
  onSale: p.onSale,
  tags: p.tags,
}))

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: [0, 200] as [number, number],
    onSale: false,
    rating: 0,
  })
  const [sortBy, setSortBy] = useState("relevance")

  // Filter and search logic
  useEffect(() => {
    let results = allProducts

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply filters
    if (filters.categories.length > 0) {
      results = results.filter((product) => filters.categories.includes(product.category))
    }

    if (filters.brands.length > 0) {
      results = results.filter((product) => filters.brands.includes(product.brand))
    }

    if (filters.colors.length > 0) {
      results = results.filter((product) => product.colors.some((color) => filters.colors.includes(color)))
    }

    if (filters.sizes.length > 0) {
      results = results.filter((product) => product.sizes.some((size) => filters.sizes.includes(size)))
    }

    // Price range filter
    results = results.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Sale filter
    if (filters.onSale) {
      results = results.filter((product) => product.onSale)
    }

    // Rating filter
    if (filters.rating > 0) {
      results = results.filter((product) => product.rating >= filters.rating)
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        results.sort((a, b) => b.id - a.id)
        break
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // relevance
        break
    }

    setFilteredProducts(results)
  }, [searchQuery, filters, sortBy])

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <SearchHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} resultCount={filteredProducts.length} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <SearchFilters filters={filters} onFiltersChange={setFilters} allProducts={allProducts} />
            </aside>
            <div className="flex-1">
              <SearchResults
                products={filteredProducts}
                sortBy={sortBy}
                onSortChange={setSortBy}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

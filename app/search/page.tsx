"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { SearchFilters } from "@/components/search-filters"
import { SearchResults } from "@/components/search-results"
import { SearchHeader } from "@/components/search-header"

// All products data for search
const allProducts = [
  {
    id: 1,
    name: "Performance Running Shirt",
    price: 49.99,
    originalPrice: 59.99,
    image: "/mens-running-shirt-athletic-wear.png",
    category: "men",
    subcategory: "shirts",
    brand: "AthleteZone",
    rating: 4.5,
    reviews: 128,
    colors: ["black", "navy", "gray"],
    sizes: ["S", "M", "L", "XL"],
    onSale: true,
    tags: ["running", "moisture-wicking", "breathable", "performance"],
  },
  {
    id: 2,
    name: "Training Shorts",
    price: 34.99,
    image: "/mens-training-shorts-athletic.png",
    category: "men",
    subcategory: "shorts",
    brand: "AthleteZone",
    rating: 4.3,
    reviews: 89,
    colors: ["black", "navy", "olive"],
    sizes: ["S", "M", "L", "XL"],
    onSale: false,
    tags: ["training", "gym", "workout", "shorts"],
  },
  {
    id: 3,
    name: "Compression Leggings",
    price: 69.99,
    image: "/mens-compression-leggings-athletic.png",
    category: "men",
    subcategory: "pants",
    brand: "AthleteZone",
    rating: 4.7,
    reviews: 156,
    colors: ["black", "gray"],
    sizes: ["S", "M", "L", "XL"],
    onSale: false,
    tags: ["compression", "leggings", "recovery", "performance"],
  },
  {
    id: 4,
    name: "Yoga Sports Bra",
    price: 39.99,
    image: "/womens-sports-bra-yoga-athletic.png",
    category: "women",
    subcategory: "tops",
    brand: "AthleteZone",
    rating: 4.6,
    reviews: 203,
    colors: ["black", "pink", "purple"],
    sizes: ["XS", "S", "M", "L"],
    onSale: false,
    tags: ["yoga", "sports bra", "support", "comfort"],
  },
  {
    id: 5,
    name: "High-Waist Leggings",
    price: 54.99,
    originalPrice: 64.99,
    image: "/womens-high-waist-leggings-athletic.png",
    category: "women",
    subcategory: "pants",
    brand: "AthleteZone",
    rating: 4.8,
    reviews: 312,
    colors: ["black", "navy", "burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    onSale: true,
    tags: ["high-waist", "leggings", "yoga", "workout"],
  },
  {
    id: 6,
    name: "Running Tank Top",
    price: 29.99,
    image: "/womens-running-tank-top-athletic.png",
    category: "women",
    subcategory: "tops",
    brand: "AthleteZone",
    rating: 4.4,
    reviews: 97,
    colors: ["white", "pink", "mint"],
    sizes: ["XS", "S", "M", "L"],
    onSale: false,
    tags: ["running", "tank top", "breathable", "lightweight"],
  },
  {
    id: 7,
    name: "Running Sneakers",
    price: 129.99,
    image: "/running-sneakers-athletic-shoes.png",
    category: "shoes",
    subcategory: "running",
    brand: "AthleteZone",
    rating: 4.5,
    reviews: 245,
    colors: ["white", "black", "blue"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    onSale: false,
    tags: ["running", "sneakers", "cushioning", "performance"],
  },
  {
    id: 8,
    name: "Cross Training Shoes",
    price: 109.99,
    originalPrice: 139.99,
    image: "/cross-training-shoes-athletic.png",
    category: "shoes",
    subcategory: "training",
    brand: "AthleteZone",
    rating: 4.3,
    reviews: 178,
    colors: ["black", "gray", "red"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    onSale: true,
    tags: ["cross training", "gym", "versatile", "stability"],
  },
  {
    id: 9,
    name: "Kids Athletic T-Shirt",
    price: 24.99,
    image: "/kids-athletic-t-shirt-sportswear.png",
    category: "kids",
    subcategory: "tops",
    brand: "AthleteZone",
    rating: 4.4,
    reviews: 67,
    colors: ["blue", "green", "orange"],
    sizes: ["4", "6", "8", "10", "12"],
    onSale: false,
    tags: ["kids", "t-shirt", "comfortable", "durable"],
  },
  {
    id: 10,
    name: "Sports Water Bottle",
    price: 19.99,
    image: "/sports-water-bottle-athletic-accessory.png",
    category: "accessories",
    subcategory: "hydration",
    brand: "AthleteZone",
    rating: 4.2,
    reviews: 134,
    colors: ["black", "blue", "pink"],
    sizes: ["One Size"],
    onSale: false,
    tags: ["water bottle", "hydration", "sports", "accessories"],
  },
]

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

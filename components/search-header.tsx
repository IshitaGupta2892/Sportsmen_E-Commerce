"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  resultCount: number
}

export function SearchHeader({ searchQuery, onSearchChange, resultCount }: SearchHeaderProps) {
  return (
    <section className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Search Products"}
          </h1>
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
          <p className="text-muted-foreground">
            {resultCount} {resultCount === 1 ? "product" : "products"} found
          </p>
        </div>
      </div>
    </section>
  )
}

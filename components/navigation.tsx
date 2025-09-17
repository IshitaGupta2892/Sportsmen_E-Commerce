"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, User } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const categories = ["T-Shirts", "Lowers", "Caps", "Shorts", "Full Sleeves", "Tracksuits"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/90 backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.jpg"
              alt="SportsMen Logo"
              width={40}
              height={40}
              className=""
            />
            
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/search?category=${encodeURIComponent(category.toLowerCase())}`}
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search and User */}
        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:block w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-white/90 focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* User Account */}
         

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            
            {/* Mobile Menu Content */}
            <SheetContent side="right" className="w-80 bg-white p-0">
              <div className="h-full flex flex-col">
                <SheetHeader className="border-b p-4">
                  <SheetTitle className="text-primary">Menu</SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                  
                  {/* Mobile Navigation */}
                  <nav className="space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/search?category=${encodeURIComponent(category.toLowerCase())}`}
                        className="block px-4 py-3 rounded-md hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                {/* Footer with Sign In */}
                
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

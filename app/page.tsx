import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCollections } from "@/components/featured-collections"
import { CategoryGrid } from "@/components/category-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedCollections />
        <CategoryGrid />
      </main>
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
            <span className="font-serif text-lg font-bold">AthleteZone</span>
          </div>
          <p className="text-muted-foreground">© 2024 AthleteZone. Premium sportswear for peak performance.</p>
        </div>
      </footer>
    </div>
  )
}

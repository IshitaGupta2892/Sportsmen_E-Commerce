import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCollections } from "@/components/featured-collections"
import { CategoryGrid } from "@/components/category-grid"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedCollections />
        <CategoryGrid />
      </main>
      <Footer/>
        
    </div>
  )
}

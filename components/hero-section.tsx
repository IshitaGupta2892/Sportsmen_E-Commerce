import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/athletic-runner-in-motion-on-track-dynamic-action-.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
          Unleash Your
          <span className="block text-primary">Athletic Potential</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
          Discover premium sportswear designed for peak performance. From professional athletes to weekend warriors,
          gear up with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6">
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-foreground"
          >
            View Collections
          </Button>
        </div>
      </div>
    </section>
  )
}

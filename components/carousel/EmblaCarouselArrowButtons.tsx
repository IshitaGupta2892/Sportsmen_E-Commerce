import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ButtonProps {
  onClick: () => void
  className?: string
}

export function PrevButton({ onClick, className = '' }: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`absolute left-4 z-10 h-12 w-12 rounded-full bg-black/30 p-0 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 ${className}`}
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
  )
}

export function NextButton({ onClick, className = '' }: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`absolute right-4 z-10 h-12 w-12 rounded-full bg-black/30 p-0 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 ${className}`}
      aria-label="Next slide"
    >
      <ChevronRight className="h-6 w-6" />
    </Button>
  )
}

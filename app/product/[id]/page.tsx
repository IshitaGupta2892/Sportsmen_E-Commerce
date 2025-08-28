import { Navigation } from "@/components/navigation"
import { ProductGallery } from "@/components/product-gallery"
import { ProductDetails } from "@/components/product-details"
import { ProductTabs } from "@/components/product-tabs"
import { RelatedProducts } from "@/components/related-products"
import { notFound } from "next/navigation"

// Extended mock product data with detailed information
const mockProducts = [
  {
    id: 1,
    name: "Performance Running Shirt",
    price: 49.99,
    originalPrice: 59.99,
    images: [
      "/mens-running-shirt-front-athletic-wear.png",
      "/mens-running-shirt-back-athletic-wear.png",
      "/mens-running-shirt-side-athletic-wear.png",
      "/mens-running-shirt-detail-athletic-wear.png",
    ],
    category: "men",
    subcategory: "shirts",
    brand: "AthleteZone",
    rating: 4.5,
    reviews: 128,
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Navy", value: "navy", hex: "#1e3a8a" },
      { name: "Gray", value: "gray", hex: "#6b7280" },
    ],
    sizes: ["S", "M", "L", "XL"],
    onSale: true,
    description:
      "Engineered for peak performance, this lightweight running shirt features moisture-wicking technology and strategic ventilation zones to keep you cool and dry during intense workouts.",
    features: [
      "Moisture-wicking fabric technology",
      "Strategic ventilation zones",
      "Reflective details for low-light visibility",
      "Flatlock seams to prevent chafing",
      "UPF 30+ sun protection",
    ],
    specifications: {
      material: "88% Polyester, 12% Elastane",
      fit: "Athletic Fit",
      care: "Machine wash cold, tumble dry low",
      origin: "Made in Vietnam",
    },
    inStock: true,
    stockCount: 15,
  },
  {
    id: 2,
    name: "Training Shorts",
    price: 34.99,
    images: [
      "/mens-training-shorts-front-athletic.png",
      "/mens-training-shorts-back-athletic.png",
      "/mens-training-shorts-side-athletic.png",
    ],
    category: "men",
    subcategory: "shorts",
    brand: "AthleteZone",
    rating: 4.3,
    reviews: 89,
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Navy", value: "navy", hex: "#1e3a8a" },
      { name: "Olive", value: "olive", hex: "#65a30d" },
    ],
    sizes: ["S", "M", "L", "XL"],
    onSale: false,
    description:
      "Versatile training shorts built for high-intensity workouts with four-way stretch fabric and secure pockets for your essentials.",
    features: [
      "Four-way stretch fabric",
      "Secure zip pocket",
      "Quick-dry technology",
      "7-inch inseam",
      "Elastic waistband with drawstring",
    ],
    specifications: {
      material: "92% Polyester, 8% Spandex",
      fit: "Regular Fit",
      care: "Machine wash cold, hang dry",
      origin: "Made in Thailand",
    },
    inStock: true,
    stockCount: 23,
  },
  // Add more products as needed...
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = Number.parseInt(params.id)
  const product = mockProducts.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  // Get related products (same category, different products)
  const relatedProducts = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductDetails product={product} />
        </div>

        {/* Product Information Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
      </main>
    </div>
  )
}

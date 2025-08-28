import { Navigation } from "@/components/navigation"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"
import { CategoryHeader } from "@/components/category-header"
import { notFound } from "next/navigation"
import { allProducts, getProductsByCategory } from "@/lib/products"

const categoryInfo = {
  men: {
    title: "Men's Athletic Wear",
    description: "High-performance sportswear designed for the modern athlete",
    image: "/mens-athletic-sportswear-clothing.png",
  },
  women: {
    title: "Women's Athletic Wear",
    description: "Stylish and functional activewear for every workout",
    image: "/womens-athletic-sportswear-clothing.png",
  },
  kids: {
    title: "Kids' Sportswear",
    description: "Comfortable and durable athletic wear for active kids",
    image: "/kids-children-athletic-sportswear.png",
  },
  shoes: {
    title: "Athletic Footwear",
    description: "Performance shoes for every sport and activity",
    image: "/athletic-running-shoes-sneakers.png",
  },
  accessories: {
    title: "Sports Accessories",
    description: "Essential gear to complete your athletic lifestyle",
    image: "/sports-accessories-bags-water-bottles.png",
  },
  sale: {
    title: "Sale Items",
    description: "Premium athletic wear at unbeatable prices",
    image: "/discounted-athletic-wear-sale-items.png",
  },
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  if (!categoryInfo[slug as keyof typeof categoryInfo]) {
    notFound()
  }

  const category = categoryInfo[slug as keyof typeof categoryInfo]
  const products = slug === "sale" ? [] : getProductsByCategory(slug as any)

  // For sale category, get all products on sale
  const saleProducts = slug === "sale" ? allProducts.filter((p) => p.onSale) : products

  const displayProducts = (slug === "sale" ? saleProducts : products).map((p) => ({
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
  }))

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <CategoryHeader title={category.title} description={category.description} image={category.image} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <CategoryFilters />
            </aside>
            <div className="flex-1">
              <ProductGrid products={displayProducts} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export function generateStaticParams() {
  return [
    { slug: "men" },
    { slug: "women" },
    { slug: "kids" },
    { slug: "shoes" },
    { slug: "accessories" },
    { slug: "sale" },
  ]
}

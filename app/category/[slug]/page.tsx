import { Navigation } from "@/components/navigation"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"
import { CategoryHeader } from "@/components/category-header"
import { notFound } from "next/navigation"

// Mock product data
const mockProducts = {
  men: [
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
    },
  ],
  women: [
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
    },
  ],
  shoes: [
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
    },
  ],
  kids: [
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
    },
  ],
  accessories: [
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
    },
  ],
}

const categoryInfo = {
  men: {
    title: "Men's Athletic Wear",
    description: "High-performance sportswear designed for the modern athlete",
    image: "/mens-category-hero-athletic-wear.png",
  },
  women: {
    title: "Women's Athletic Wear",
    description: "Stylish and functional activewear for every workout",
    image: "/womens-category-hero-athletic-wear.png",
  },
  kids: {
    title: "Kids' Sportswear",
    description: "Comfortable and durable athletic wear for active kids",
    image: "/kids-category-hero-athletic-wear.png",
  },
  shoes: {
    title: "Athletic Footwear",
    description: "Performance shoes for every sport and activity",
    image: "/shoes-category-hero-athletic-footwear.png",
  },
  accessories: {
    title: "Sports Accessories",
    description: "Essential gear to complete your athletic lifestyle",
    image: "/accessories-category-hero-sports-gear.png",
  },
  sale: {
    title: "Sale Items",
    description: "Premium athletic wear at unbeatable prices",
    image: "/sale-category-hero-discounted-athletic.png",
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
  const products = mockProducts[slug as keyof typeof mockProducts] || []

  // For sale category, get all products on sale
  const saleProducts =
    slug === "sale"
      ? Object.values(mockProducts)
          .flat()
          .filter((product) => product.onSale)
      : products

  const displayProducts = slug === "sale" ? saleProducts : products

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

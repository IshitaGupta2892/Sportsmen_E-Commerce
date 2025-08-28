export type ColorOption = { name: string; value: string; hex: string }

export type FullProduct = {
  id: number
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: "men" | "women" | "kids" | "shoes" | "accessories"
  subcategory: string
  brand: string
  rating: number
  reviews: number
  colors: ColorOption[]
  sizes: string[]
  onSale: boolean
  description: string
  features: string[]
  specifications?: Record<string, string>
  inStock: boolean
  stockCount: number
  tags: string[]
}

// Use only image filenames that exist in /public
const img = {
  men1: "/mens-athletic-sportswear-clothing.png",
  women1: "/womens-athletic-sportswear-clothing.png",
  kids1: "/kids-children-athletic-sportswear.png",
  shoes1: "/athletic-running-shoes-sneakers.png",
  shoes2: "/running-shoes-and-athletic-wear-on-track.png",
  accessories1: "/sports-accessories-bags-water-bottles.png",
  gym: "/gym-equipment-weights-athletic-clothing.png",
  outdoor: "/outdoor-hiking-athletic-gear-mountains.png",
  sale: "/discounted-athletic-wear-sale-items.png",
  action: "/athletic-runner-in-motion-on-track-dynamic-action-.png",
}

export const allProducts: FullProduct[] = [
  {
    id: 1,
    name: "Performance Running Shirt",
    price: 49.99,
    originalPrice: 59.99,
    images: [img.men1, img.action, img.gym],
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
      "Engineered for peak performance, this lightweight running shirt wicks moisture and keeps you cool during intense workouts.",
    features: [
      "Moisture-wicking fabric",
      "Strategic ventilation",
      "Reflective details",
      "Flatlock seams",
      "UPF 30+",
    ],
    specifications: {
      material: "88% Polyester, 12% Elastane",
      fit: "Athletic Fit",
      care: "Machine wash cold, tumble dry low",
      origin: "Made in Vietnam",
    },
    inStock: true,
    stockCount: 15,
    tags: ["running", "moisture-wicking", "breathable", "performance", "shirt"],
  },
  {
    id: 2,
    name: "Training Shorts",
    price: 34.99,
    images: [img.men1, img.gym, img.outdoor],
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
    description: "Versatile training shorts with four-way stretch and quick-dry technology.",
    features: ["4-way stretch", "Zip pocket", "Quick-dry", "7-inch inseam"],
    inStock: true,
    stockCount: 23,
    tags: ["training", "gym", "workout", "shorts"],
  },
  {
    id: 3,
    name: "Compression Leggings",
    price: 69.99,
    images: [img.men1, img.gym, img.outdoor],
    category: "men",
    subcategory: "pants",
    brand: "AthleteZone",
    rating: 4.7,
    reviews: 156,
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Gray", value: "gray", hex: "#6b7280" },
    ],
    sizes: ["S", "M", "L", "XL"],
    onSale: false,
    description: "Supportive compression leggings for peak performance and recovery.",
    features: ["Graduated compression", "Breathable panels", "Anti-chafe seams"],
    inStock: true,
    stockCount: 12,
    tags: ["compression", "leggings", "recovery", "performance"],
  },
  {
    id: 4,
    name: "Yoga Sports Bra",
    price: 39.99,
    images: [img.women1, img.gym, img.outdoor],
    category: "women",
    subcategory: "tops",
    brand: "AthleteZone",
    rating: 4.6,
    reviews: 203,
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Pink", value: "pink", hex: "#ec4899" },
      { name: "Purple", value: "purple", hex: "#8b5cf6" },
    ],
    sizes: ["XS", "S", "M", "L"],
    onSale: false,
    description: "Comfortable medium-support bra perfect for yoga and studio workouts.",
    features: ["Soft feel", "Removable pads", "Breathable"],
    inStock: true,
    stockCount: 30,
    tags: ["yoga", "sports bra", "support", "comfort"],
  },
  {
    id: 5,
    name: "High-Waist Leggings",
    price: 54.99,
    originalPrice: 64.99,
    images: [img.women1, img.sale, img.outdoor],
    category: "women",
    subcategory: "pants",
    brand: "AthleteZone",
    rating: 4.8,
    reviews: 312,
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Navy", value: "navy", hex: "#1e3a8a" },
      { name: "Burgundy", value: "burgundy", hex: "#7f1d1d" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    onSale: true,
    description: "Flattering high-waist leggings with buttery-soft fabric.",
    features: ["High-rise", "Squat proof", "Hidden pocket"],
    inStock: true,
    stockCount: 18,
    tags: ["high-waist", "leggings", "yoga", "workout"],
  },
  {
    id: 6,
    name: "Running Tank Top",
    price: 29.99,
    images: [img.women1, img.action, img.gym],
    category: "women",
    subcategory: "tops",
    brand: "AthleteZone",
    rating: 4.4,
    reviews: 97,
    colors: [
      { name: "White", value: "white", hex: "#ffffff" },
      { name: "Pink", value: "pink", hex: "#ec4899" },
      { name: "Mint", value: "mint", hex: "#86efac" },
    ],
    sizes: ["XS", "S", "M", "L"],
    onSale: false,
    description: "Featherlight tank with quick-dry performance for runs in the heat.",
    features: ["Featherlight", "Quick dry", "Reflective logo"],
    inStock: true,
    stockCount: 25,
    tags: ["running", "tank top", "breathable", "lightweight"],
  },
  {
    id: 7,
    name: "Running Sneakers",
    price: 129.99,
    images: [img.shoes1, img.shoes2, img.action],
    category: "shoes",
    subcategory: "running",
    brand: "AthleteZone",
    rating: 4.5,
    reviews: 245,
    colors: [
      { name: "White", value: "white", hex: "#ffffff" },
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Blue", value: "blue", hex: "#3b82f6" },
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    onSale: false,
    description: "Cushioned daily trainers built for comfort and durability.",
    features: ["Cushioned midsole", "Breathable upper", "Durable outsole"],
    inStock: true,
    stockCount: 20,
    tags: ["running", "sneakers", "cushioning", "performance"],
  },
  {
    id: 8,
    name: "Cross Training Shoes",
    price: 109.99,
    originalPrice: 139.99,
    images: [img.shoes2, img.shoes1, img.gym],
    category: "shoes",
    subcategory: "training",
    brand: "AthleteZone",
    rating: 4.3,
    reviews: 178,
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Gray", value: "gray", hex: "#6b7280" },
      { name: "Red", value: "red", hex: "#ef4444" },
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    onSale: true,
    description: "Stable cross-trainers for lifting and high-intensity circuits.",
    features: ["Stable platform", "Rope guard", "Lateral support"],
    inStock: true,
    stockCount: 14,
    tags: ["cross training", "gym", "versatile", "stability"],
  },
  {
    id: 9,
    name: "Kids Athletic T-Shirt",
    price: 24.99,
    images: [img.kids1, img.outdoor, img.action],
    category: "kids",
    subcategory: "tops",
    brand: "AthleteZone",
    rating: 4.4,
    reviews: 67,
    colors: [
      { name: "Blue", value: "blue", hex: "#3b82f6" },
      { name: "Green", value: "green", hex: "#22c55e" },
      { name: "Orange", value: "orange", hex: "#f97316" },
    ],
    sizes: ["4", "6", "8", "10", "12"],
    onSale: false,
    description: "Soft, durable tee for active kids and playground adventures.",
    features: ["Soft cotton blend", "Durable", "Machine washable"],
    inStock: true,
    stockCount: 40,
    tags: ["kids", "t-shirt", "comfortable", "durable"],
  },
  {
    id: 10,
    name: "Sports Water Bottle",
    price: 19.99,
    images: [img.accessories1, img.gym, img.outdoor],
    category: "accessories",
    subcategory: "hydration",
    brand: "AthleteZone",
    rating: 4.2,
    reviews: 134,
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Blue", value: "blue", hex: "#3b82f6" },
      { name: "Pink", value: "pink", hex: "#ec4899" },
    ],
    sizes: ["One Size"],
    onSale: false,
    description: "BPA-free bottle with leak-proof cap and carry loop.",
    features: ["BPA-free", "Leak-proof", "Dishwasher safe"],
    inStock: true,
    stockCount: 50,
    tags: ["water bottle", "hydration", "sports", "accessories"],
  },
]

export function getProductById(id: number) {
  return allProducts.find((p) => p.id === id)
}

export function getProductsByCategory(category: FullProduct["category"]) {
  return allProducts.filter((p) => p.category === category)
}

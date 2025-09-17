import { Navigation } from "@/components/navigation"
import { ProductGallery } from "@/components/product-gallery"
import { ProductDetails } from "@/components/product-details"
import { ProductTabs } from "@/components/product-tabs"
import { RelatedProducts } from "@/components/related-products"
import { notFound } from "next/navigation"
import { allProducts, getProductById } from "@/lib/products"
import Footer from "@/components/footer"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = Number.parseInt(params.id)
  const product = getProductById(productId)

  if (!product) {
    notFound()
  }

  // Get related products (same category, different products)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

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
      <Footer/>
    </div>
  )
}


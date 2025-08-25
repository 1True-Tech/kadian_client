import { mockCategories, mockProducts } from "@/assets/dummy-data/mockData";
import ProductGrid from "@/components/product/ProductGrid";
import { ParamsProps } from "@/types/structures";
import Image from "next/image";
import { notFound } from "next/navigation";

async function Category({ params }: ParamsProps<{ categorySlug: string | null }>) {
  const { categorySlug } = await params
  const category = mockCategories.find(c => c.slug === categorySlug);
  const categoryProducts = mockProducts.filter(p =>
    p.category.slug.toLowerCase() === categorySlug?.toLowerCase()
  );

  if (!category) {
    return notFound();
  }



  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="heading-section mb-4">{category.name}</h1>
        <p className="text-elegant max-w-2xl mx-auto mb-8">
          {category.description}
        </p>
        <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
          <Image
            width={720}
            height={480}
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Products Count */}
      <div className="mb-8">
        <p className="text-muted-foreground">
          Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Products Grid */}
      {categoryProducts.length > 0 ? (
        <ProductGrid
          products={categoryProducts}
        // onAddToWishlist={(id) => console.log('Add to wishlist:', id)}
        // onAddToCart={(id) => console.log('Add to cart:', id)}
        />
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-4">No products found</h3>
          <p className="text-muted-foreground mb-8">
            We&apos;re working on adding products to this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Category;
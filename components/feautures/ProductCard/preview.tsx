import { ProductCardData } from "@/types/product";
import ProductCard, { ProductCardProps } from ".";
import ProductCardSkeleton from "./skeleton";



export default function ProductGrid({
  loading = false,
  products,
  productProps
}: {
  loading: boolean;
  products: ProductCardData[];
  productProps?: Omit<ProductCardProps,"product">
}) {
  if (loading) return <ProductCardSkeleton />;
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {products.map((item, idx) => (
        <ProductCard key={idx} product={item} {...productProps} />
      ))}
    </div>
  );
}

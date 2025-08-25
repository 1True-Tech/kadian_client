"use client"
import { ProductReady } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: ProductReady[];
  onAddToCart?: (productId: string) => void;
  className?: string;
}

const ProductGrid = ({ products, onAddToCart, className = "" }: ProductGridProps) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s` } as any}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
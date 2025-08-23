"use client"
import { Product } from "@/assets/dummy-data/mockData";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToWishlist?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

const ProductGrid = ({ products, onAddToWishlist, onAddToCart, className = "" }: ProductGridProps) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToWishlist={onAddToWishlist}
          onAddToCart={onAddToCart}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s` } as any}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
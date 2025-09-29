"use client"
import { ProductReady } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: ProductReady[];
  className?: string;
}

const ProductGrid = ({ products, className = "" }: ProductGridProps) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] ld:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-6 ${className}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s` } as any}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
"use client"
import { ProductReady } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListContainerProps {
  products: ProductReady[];
  className?: string;
  display?: "grid" | "list";
}

const ProductListContainer = ({ products, className = "", display = "grid" }: ProductListContainerProps) => {
  if (display === "list") {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            display="list"
            className="animate-fade-up"
            style={{ animationDelay: `${index * 0.1}s` } as any}
          />
        ))}
      </div>
    );
  }
  // Default grid
  return (
    <div className={`grid grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] ld:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-6 ${className}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          display="grid"
          className="animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s` } as any}
        />
      ))}
    </div>
  );
};

export default ProductListContainer;
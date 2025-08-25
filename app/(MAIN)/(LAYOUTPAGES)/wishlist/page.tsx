"use client";
import { mockProducts } from "@/assets/dummy-data/mockData";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { notFound } from "next/navigation";
import { useState } from "react";

const Wishlist = () => {
  const { user } = useUserStore();
  const [wishlistItems, setWishlistItems] = useState(user?.wishlist);

  const wishlistProducts = mockProducts.filter((product) =>
    wishlistItems?.includes(product._id)
  );

  const addToCart = (productId: string) => {
    console.log("Add to cart:", productId);
    // Handle add to cart
  };

  if (wishlistProducts.length === 0) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-section">Wishlist</h1>
          <p className="text-muted-foreground mt-2">
            {wishlistProducts.length}{" "}
            {wishlistProducts.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline">Share Wishlist</Button>
          <Button
            variant="outline"
            onClick={() => setWishlistItems([])}
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Clear All
          </Button>
        </div>
      </div>

      <ProductGrid products={wishlistProducts} onAddToCart={addToCart} />
    </div>
  );
};

export default Wishlist;

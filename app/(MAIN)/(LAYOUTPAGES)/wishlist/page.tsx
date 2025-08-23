"use client";
import { mockProducts, mockUser } from "@/assets/dummy-data/mockData";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { useState } from "react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(mockUser.wishlist);

  const wishlistProducts = mockProducts.filter((product) =>
    wishlistItems.includes(product.id)
  );


  const removeFromWishlist = (productId: string) => {
    setWishlistItems((items) => items.filter((id) => id !== productId));
  };

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

      <ProductGrid
        products={wishlistProducts}
        onAddToWishlist={removeFromWishlist}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default Wishlist;

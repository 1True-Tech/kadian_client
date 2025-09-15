"use client";
import { mockProducts } from "@/assets/dummy-data/mockData";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { processProducts } from "@/lib/controllers/processShop/processProducts";
import queries from "@/lib/queries";
import { useQuery } from "@/lib/server/client-hook";
import { client } from "@/lib/utils/NSClient";
import { useUserStore } from "@/store/user";
import { ProductReady } from "@/types/product";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user, actions } = useUserStore();
  const [wishlistProducts, setWishlistProducts] = useState<ProductReady[]>([]);
  const clearWishlist = useQuery("clearWishlist");

  useEffect(() => {
    const ids = user?.wishList.map((w) => w.productId) || [];
    if (ids.length <= 0) return;
    async function fetchProducts() {
      const data = await client.fetch(queries.productsByIdsQuery, {
        ids,
      });
      console.log(data);
      setWishlistProducts(processProducts(data));
    }
    fetchProducts();
  }, [user]);

  const addToCart = (productId: string) => {
    console.log("Add to cart:", productId);
    // Handle add to cart
  };

  async function clearAll() {
    await clearWishlist.run();
    setWishlistProducts([]);
    if (user) {
      actions.setUser({
        ...user,
        wishList: [],
      });
    }
  }
  // if (wishlistProducts.length === 0) {
  //   return notFound();
  // }

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

        {wishlistProducts.length > 0 && (
          <div className="flex gap-4">
            <Button variant="outline">Share Wishlist</Button>
            <Button
              variant="outline"
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={clearAll}
              disabled={clearWishlist.status === "loading"}
            >
              {clearWishlist.status === "loading"
                ? "Clearing Wishlist ..."
                : "Clear All"}
            </Button>
          </div>
        )}
      </div>

      <ProductGrid products={wishlistProducts} onAddToCart={addToCart} />
    </div>
  );
};

export default Wishlist;

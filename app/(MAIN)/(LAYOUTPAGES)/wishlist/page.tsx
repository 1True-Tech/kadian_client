"use client";
import { toast } from "sonner";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { processProducts } from "@/lib/controllers/processShop/processProducts";
import queries from "@/lib/queries";
import { useQuery } from "@/lib/server/client-hook";
import { client } from "@/lib/utils/NSClient";
import { useUserStore } from "@/store/user";
import { ProductReady } from "@/types/product";
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


  async function clearAll() {
    const res = await clearWishlist.run();
    if (res?.success) {
      setWishlistProducts([]);
      if (user) {
        actions.setUser({
          ...user,
          wishList: [],
        });
      }
      toast.success("Wishlist cleared!");
    } else {
      toast.error("Failed to clear wishlist: " + (res?.message || "Unknown error"));
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

      <ProductGrid products={wishlistProducts} />
    </div>
  );
};

export default Wishlist;

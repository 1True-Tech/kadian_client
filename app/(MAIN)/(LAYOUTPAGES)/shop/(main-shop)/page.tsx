import ShopClient from "@/components/pages/shop/ShopClient";
import { processAvailableFilters } from "@/lib/controllers/processShop/processFilters";
import { filterProducts, processProducts, sortProducts } from "@/lib/controllers/processShop/processProducts";
import { productListQuery } from "@/lib/queries/products";
import { client } from "@/lib/utils/NSClient";
import { queryParamsToFilters } from "@/store/shopFilters/helper";
import { ShopFilters } from "@/store/shopFilters/types";
import { headers } from "next/headers";

// Server Component
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Latest Fashion Collection",
  description: "Browse our latest collection of premium fashion items. Find clothing, accessories, and more with easy filtering and sorting options.",
  openGraph: {
    title: "Shop | Latest Fashion Collection",
    description: "Browse our latest collection of premium fashion items. Find clothing, accessories, and more with easy filtering and sorting options.",
  },
};
async function Shop() {
  const headersList = await headers();
  const searchParams = headersList.get("x-searchParams") || "";
  
  // Fetch products on server side
  const rawProducts = await client.fetch(productListQuery);
  const processed = processProducts(rawProducts);
  const filters = await processAvailableFilters()
  
  // Apply initial filters from URL
  const loadedFilters = queryParamsToFilters(searchParams);
  const filtered = filterProducts(processed, loadedFilters);
  const sorted = sortProducts(filtered, loadedFilters.sorting);
  return (
    <ShopClient
      initialProducts={processed}
      initialFilteredProducts={filtered}
      initialFilters={loadedFilters as ShopFilters}
      availableFilters={filters}
    />
  );
}

export default Shop;


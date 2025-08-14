import { dummyProducts } from "@/assets/dummy-data/products";
import ProductGrid from "@/components/feautures/ProductCard/preview";
import { ShopSorting } from "@/store/shopFilters/types";
import { HasNoSlot } from "@/types";
import { ShopLayoutPropWithParams } from "./layout";
import { ShopSort } from "@/components/pages/shop/shopNav";

export default async function ShopPages({
  params,
}: HasNoSlot<ShopLayoutPropWithParams>) {
  const { shop_items } = await params;
  const shopItems = shop_items || [];
  const sortFilters: {
    label: string;
    sort: ShopSorting;
  }[] = [
    {
      label: "A-Z",
      sort: "a-z",
    },
    {
      label: "Z-A",
      sort: "z-a",
    },
    {
      label: "Expensive",
      sort: "expensive-first",
    },
    {
      label: "Cheap",
      sort: "expensive-last",
    },
  ];


  return (
    <main className="w-full">
      <div className="w-full bg-background px-container py-container sticky top-40 md:top-30 z-10 flex items-center justify-between">
        <span>showing 1-10 out of 20 results</span>

        <div className="w-fit flex items-center justify-between gap-3">
          Sort by:{" "}
          <ShopSort sortFilters={sortFilters} />
        </div>
        <div className="md:hidden flex items-center justify-center gap-peers">
            <span id="mobile-filter"></span>
          </div>
      </div>
      <div className="w-full py-peers relative z-0">
        <ProductGrid
          products={[
            ...dummyProducts.map((i) => ({
              image: i.mainImage,
              name: i.name,
              price: i.basePrice,
              slug: i.slug,
            })),
            ...dummyProducts.map((i) => ({
              image: i.mainImage,
              name: i.name,
              price: i.basePrice,
              slug: i.slug,
            })),
            ...dummyProducts.map((i) => ({
              image: i.mainImage,
              name: i.name,
              price: i.basePrice,
              slug: i.slug,
            })),
          ]}
          loading={false}
        />
      </div>
    </main>
  );
}

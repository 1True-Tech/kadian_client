import { dummyProducts } from "@/assets/dummy-data/products";
import ProductGrid from "@/components/feautures/ProductCard/preview";
import { ShopSort } from "@/components/pages/shop/shopNav";
import { ShopSorting } from "@/store/shopFilters/types";

export default async function ShopPages() {
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
      <div className="w-full bg-background px-container pt-container pb-xtrasmall sticky top-40 md:top-30 z-10 flex items-center justify-between">
        <span>showing 1-10 out of 20 results</span>

        <div className="w-fit flex items-center justify-between gap-3">
          Sort by: <ShopSort sortFilters={sortFilters} />
        </div>
        <div className="md:hidden flex items-center justify-center gap-peers">
          <span id="mobile-filter"></span>
        </div>
      </div>
      <div className="w-full px-container md:px-0 py-peers relative z-0">
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

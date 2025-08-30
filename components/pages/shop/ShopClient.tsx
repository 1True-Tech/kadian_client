"use client";

import ProductGrid from "@/components/product/ProductGrid";
import FiltersSidebar from "@/components/shop/FiltersSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/lib/hooks/isMobile";
import useShopFiltersStore from "@/store/shopFilters";
import { filtersToQueryParams } from "@/store/shopFilters/helper";
import { Filter, Grid3X3, List } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  filterProducts,
  sortProducts,
} from "@/lib/controllers/processShop/processProducts";
import { useCallback, useEffect, useState } from "react";
import { type ShopFilters } from "@/store/shopFilters/types";
import { ProductReady } from "@/types/product";
import { FiltersReady } from "@/types/structures/filters";

interface ShopClientProps {
  initialProducts: ProductReady[];
  initialFilteredProducts: ProductReady[];
  initialFilters: ShopFilters;
  availableFilters: FiltersReady;
}

const ShopClient = ({
  initialProducts,
  initialFilteredProducts,
  initialFilters,
  availableFilters
}: ShopClientProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState(initialFilters.sorting || "featured");
  const [allProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(
    initialFilteredProducts
  );
  const { push } = useRouter();
  const queryParams = useSearchParams();
  const isMobile = useIsMobile(768);
  const { filters, saveFilter, savedFilters, updateFilter, setFilters } =
    useShopFiltersStore();

  // Initialize filters from URL on mount
  useEffect(() => {
    setFilters(initialFilters);
  }, []);

  const handleRedirectFilter = useCallback(() => {
    const query = filtersToQueryParams(filters);
    push(`?${query}`);
    saveFilter();
  }, [filters, push, saveFilter]);

  // Update filtered products when URL params change
  useEffect(() => {
    if (!queryParams.toString()) return;

    const timer = setTimeout(() => {
      const filtered = filterProducts(allProducts, {
        ...filters,
        colors: filters.colors,
      });
      // const sorted = sortProducts(filtered, filters.sorting);
      setFilteredProducts(filtered);
    }, 250);

    return () => clearTimeout(timer);
  }, [queryParams, allProducts, filters]);

  const handleSortChange = (
    value: "featured" | "newest" | "price-low" | "price-high" | "rating"
  ) => {
    setSortBy(value);
    updateFilter({
      sorting: value as
        | "featured"
        | "newest"
        | "price-low"
        | "price-high"
        | "rating",
    });
  };

  return (
    <div className="mx-auto py-8 isolate">
      {/* Header */}
      <div className="flex flex-col px-container py-xtrasmall sticky top-6 sm:top-8 md:top-16 bg-background z-20 md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="heading-section">Shop All</h1>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 bg-background h-fit">
          <div className="w-fit flex items-center gap-small">
            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent
                hasDefaultClose={false}
                side="left"
                className="w-80 px-small h-full overflow-y-auto"
              >
                <FiltersSidebar availableFilters={availableFilters} saveFilter={handleRedirectFilter} />
                {!savedFilters && (
                  <SheetFooter>
                    <Button onClick={handleRedirectFilter}>Save filters</Button>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>

            {!savedFilters && (
              <Button className="hidden md:flex" onClick={handleRedirectFilter}>
                Save filters
              </Button>
            )}
            {/* Desktop Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="hidden md:flex"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>

            {/* View Mode */}
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48 border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Best Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 px-container">
        <p className="text-muted-foreground">
          Showing {filteredProducts.length} of {allProducts.length} products
        </p>
      </div>

      {/* Main Content */}
      <div className="flex gap-8 px-container">
        {/* Desktop Filters Sidebar */}
        {showFilters && (
          <div className="hidden md:block w-80 sticky top-28 flex-shrink-0 h-fit bg-card rounded-lg border !py-small">
            <div className="max-h-[calc(100dvh-10rem)] overflow-y-auto">
              <FiltersSidebar availableFilters={availableFilters} saveFilter={handleRedirectFilter}/>
            </div>
          </div>
        )}

        {/* Products */}
        <div className="flex-1">
          <ProductGrid
            products={filteredProducts}
            onAddToCart={(id) => console.log("Add to cart:", id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopClient;

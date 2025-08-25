"use client";
import { mockProducts } from "@/assets/dummy-data/mockData";
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
import {
  filtersToQueryParams,
  queryParamsToFilters,
} from "@/store/shopFilters/helper";
import { Filter, Grid3X3, List, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const { push } = useRouter();
  const queryParams = useSearchParams();
  const isMobile = useIsMobile(768);
  const { filters, saveFilter, savedFilters, updateFilter } =
    useShopFiltersStore();

  const handleRedirectFilter = useCallback(() => {
    const query = filtersToQueryParams(filters);

    push(`?${query}`);
    saveFilter();
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadedFilters = queryParamsToFilters(queryParams.toString());

      const filteredProduct = mockProducts.filter((product) => {
        const price = Math.max(
          product.basePrice,
          ...product.variants.map((variant) => variant.price)
        );

        const matchesPrice =
          price >= (loadedFilters.price?.from || 0) &&
          price <= (loadedFilters.price?.to || Infinity);

        const matchesCategory =
          !loadedFilters.categories?.length ||
          loadedFilters.categories.includes(product.category.name);

        const search = loadedFilters.search?.toLowerCase() || "";
        const matchesSearch =
          product.name.toLowerCase().includes(search) ||
          product.brand.name.toLowerCase().includes(search) ||
          product.slug.toLowerCase().includes(search);

        return matchesPrice && matchesCategory && matchesSearch;
      });

      setFilteredProducts(filteredProduct);
    }, 250); // throttle delay

    return () => clearTimeout(timer);
  }, [queryParams]);

  const handleSortChange = (value: string) => {
    setSortBy(value);

    const sorted = [...filteredProducts];

    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.basePrice - b.basePrice);
        break;

      case "price-high":
        sorted.sort((a, b) => b.basePrice - a.basePrice);
        break;

      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;

      default:
        // 'featured' or fallback — could reset to original list if stored
        break;
    }

    setFilteredProducts(sorted);
  };

  return (
    <div className="mx-auto py-8 isolate">
      {/* Header */}
      <div className="flex flex-col px-container py-xtrasmall sticky top-6 sm:top-8 md:top-16 bg-background z-20 md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="heading-section">Shop All</h1>
          {/* <p className="text-muted-foreground mt-2">
              Discover our complete collection of premium fashion
            </p> */}
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
              <SheetContent hasDefaultClose={false} side="left" className="w-80 px-small h-full overflow-y-auto">
                <FiltersSidebar />
                {!savedFilters && (
                  <SheetFooter>
                    <Button onClick={handleRedirectFilter}>Save filters</Button>
                  </SheetFooter>
                )}
              </SheetContent>
              {!isMobile && !savedFilters && (
                <>
                  <SheetFooter>
                    <Button onClick={handleRedirectFilter}>Save filters</Button>
                  </SheetFooter>
                </>
              )}
            </Sheet>

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
          Showing {filteredProducts.length} of {mockProducts.length} products
        </p>
      </div>

      {/* Main Content */}
      <div className="flex gap-8 px-container">
        {/* Desktop Filters Sidebar */}
        {showFilters && (
          <div className="hidden md:block w-80 sticky top-28 flex-shrink-0 h-fit bg-card rounded-lg border !py-small">
            <div className="max-h-[calc(100dvh-10rem)] overflow-y-auto">
              <FiltersSidebar />
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

export default Shop;

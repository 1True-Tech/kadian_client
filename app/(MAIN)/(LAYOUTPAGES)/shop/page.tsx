"use client"
import { mockProducts } from "@/assets/dummy-data/mockData";
import ProductGrid from "@/components/product/ProductGrid";
import FiltersSidebar from "@/components/shop/FiltersSidebar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, Grid3X3, List } from "lucide-react";
import { useState } from "react";

const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);



  const handleFiltersChange = (filters: any) => {
    // Apply filters logic here
    console.log('Filters changed:', filters);
    // For now, just show all products
    setFilteredProducts(mockProducts);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    
    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
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
              <SheetContent side="left" className="w-80 h-full overflow-y-auto">
                <FiltersSidebar onFiltersChange={handleFiltersChange} />
              </SheetContent>
            </Sheet>

            {/* Desktop Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="hidden md:flex"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>

            {/* View Mode */}
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
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
                <FiltersSidebar onFiltersChange={handleFiltersChange} />
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1">
            <ProductGrid 
              products={filteredProducts}
              onAddToWishlist={(id) => console.log('Add to wishlist:', id)}
              onAddToCart={(id) => console.log('Add to cart:', id)}
            />
          </div>
        </div>
      </div>
  );
};

export default Shop;

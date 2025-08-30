export type ShopSorting = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';

export interface PriceRange {
  from: number;
  to: number;
}

export interface ShopFilters {
  categories: string[];  // Based on product.category.slug
  brands: string[];     // Based on product.brand.slug
  colors: string[];     // Based on product.variants[].color
  sizes: string[];      // Based on product.variants[].size.label
  materials: string[];  // Based on product.materials[].name
  price: PriceRange;    // Based on product.basePrice and variants[].price
  sorting: ShopSorting;
  search: string;       // Search across name, description, brand name
}
export interface ShopFilterData{
    filters:Partial<ShopFilters>
    savedFilters:boolean
}
export interface ShopFiltersActions {
    updateFilter: (val:Partial<ShopFilters>, action?:"ADD"|"REMOVE")=> void;
    clearFilters: ()=> void;
    saveFilter(): void;
    setFilters(ShopFilterData: Partial<ShopFilters>): void
}
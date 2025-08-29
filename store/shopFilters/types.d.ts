export type ShopSorting = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
export interface ShopFilters {
  collections: string[];
  categories: string[];
  colors: string[];
  price: {
    from:number;
    to:number;
  };
  sorting: ShopSorting;
  search:string
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
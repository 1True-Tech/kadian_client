export type ShopSorting = "a-z" | "z-a" | "expensive-first" | "expensive-last";
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
    saveFilter(): void
}
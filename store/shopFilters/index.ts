import { produce } from "immer";
import { create } from "zustand";
import { ShopFilterData, ShopFilters, ShopFiltersActions } from "./types";

const useShopFiltersStore = create<ShopFilterData & ShopFiltersActions>(
  (set) => ({
    filters: {},
    savedFilters: true,
    clearFilters() {
      set(
        produce<ShopFilterData>((fill) => {
          fill.filters = {};
        })
      );
    },
    updateFilter(val, action = "ADD") {
      set(
        produce<ShopFilterData>((fill) => {
          const currentFilters = fill.filters;

          const updateArray = (current: any[], incoming: any[]) => {
            if (action === "REMOVE") {
              return current.filter((item) => !incoming.includes(item));
            }
            return Array.from(
              new Set([...(current || []), ...(incoming || [])])
            );
          };

          fill.filters = {
            categories: updateArray(
              currentFilters.categories || [],
              val.categories || []
            ),
            brands: updateArray(
              currentFilters.brands || [],
              val.brands || []
            ),
            colors: updateArray(
              currentFilters.colors || [], 
              val.colors || []
            ),
            sizes: updateArray(
              currentFilters.sizes || [],
              val.sizes || []
            ),
            materials: updateArray(
              currentFilters.materials || [],
              val.materials || []
            ),
            price: {
              from: val.price?.from ?? currentFilters.price?.from ?? 0,
              to: val.price?.to ?? currentFilters.price?.to ?? 10000,
            },
            sorting: val.sorting ?? currentFilters.sorting,
            search: val.search ?? currentFilters.search,
          };
          fill.savedFilters = false
        })
      );
    },
    saveFilter() {
      set(
        produce<ShopFilterData>((fill) => {
          fill.savedFilters = true;
        })
      );
    },
     setFilters(ShopFilterData:Partial<ShopFilters>) {
      set(
        produce<ShopFilterData>((fill) => {
          fill.filters = ShopFilterData;
        })
      );
    },
  })
);

export default useShopFiltersStore;

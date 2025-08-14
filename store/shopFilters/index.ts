import { produce } from "immer";
import { create } from "zustand";
import { ShopFilterData, ShopFiltersActions } from "./types";

const useShopFiltersStore = create<ShopFilterData & ShopFiltersActions>(
  (set, get) => ({
    filters: {},
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
            collections: updateArray(
              currentFilters.collections || [],
              val.collections || []
            ),
            colors: updateArray(currentFilters.colors || [], val.colors || []),
            price: {
              from: val.price?.from ?? currentFilters.price?.from ?? 0,
              to: val.price?.to ?? currentFilters.price?.to ?? 0,
            },
            sorting: val.sorting ?? currentFilters.sorting,
            search: val.search ?? currentFilters.search
          };
        })
      );
    },
  })
);

export default useShopFiltersStore;

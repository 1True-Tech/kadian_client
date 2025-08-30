import { ShopFilters } from "./types";

export function filtersToQueryParams(filters: Partial<ShopFilters>): string {
  const params = new URLSearchParams();

  const appendArrayAsCSV = (key: string, arr?: string[]) => {
    if (Array.isArray(arr) && arr.length > 0) {
      params.set(key, arr.join(','));
    }
  };

  appendArrayAsCSV('categories', filters.categories);
  appendArrayAsCSV('colors', filters.colors);

  if (filters.price?.from !== undefined) {
    params.set('price_from', filters.price.from.toString());
  }

  if (filters.price?.to !== undefined) {
    params.set('price_to', filters.price.to.toString());
  }

  if (filters.sorting) {
    params.set('sorting', filters.sorting);
  }

  if (filters.search) {
    params.set('search', filters.search);
  }
  return params.toString();
}

export function queryParamsToFilters(searchString: string): Partial<ShopFilters> {
  const query = new URLSearchParams(searchString);

  const parseArray = (key: string): string[] => {
    const value = query.get(key);
    return value ? value.split(',').filter(Boolean) : [];
  };

  const parseNumber = (value: string | null): number | undefined => {
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  };

  return {
    categories: parseArray('categories'),
    colors: parseArray('colors'),
    price: {
      from: parseNumber(query.get('price_from'))||0,
      to: parseNumber(query.get('price_to'))||1000,
    },
    sorting: query.get('sorting') as ShopFilters['sorting'] | undefined,
    search: query.get('search')|| ""
  };
}

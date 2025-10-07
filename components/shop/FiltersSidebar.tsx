"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { getContrastingTextColor } from "@/lib/utils/colorsProcessors/colorProcessing";
import useShopFiltersStore from "@/store/shopFilters";
import { queryParamsToFilters } from "@/store/shopFilters/helper";
import { FiltersReady } from "@/types/structures/filters";
import { ChevronDown, SearchIcon, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ShopColorPick from "../pages/shop/colorPick";
import { Input } from "../ui/input";

interface FiltersProps {
  className?: string;
  availableFilters: FiltersReady;
  saveFilter?: () => void;
}

const FiltersSidebar = ({
  className = "",
  availableFilters,
  saveFilter,
}: FiltersProps) => {
  const { brands, categories, colors, materials, maxPrice } =
    availableFilters;
  const { filters, updateFilter, clearFilters } = useShopFiltersStore();
  const queryParams = useSearchParams();


  useEffect(() => {
    const loadedFilters = queryParamsToFilters(queryParams.toString());

    updateFilter(loadedFilters);
  }, []);

  return (
    <Card
      className={`w-full ${className} !border-0 !bg-transparent !shadow-none`}
    >
      <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background md:bg-card z-10">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 !px-small md:!px-peers">
        <article className="left-nav-item">
          <div className="input-box-external [--border-width:_1px] w-full flex items-center gap-xtrasmall border-1 border-foreground/40">
            <Input
              id="search-content"
              name="search-content"
              type="search"
              defaultValue={filters.search}
              className="w-full !shadow-none !rounded-none !outline-none !ring-0 !border-0 !px-0 !pl-2"
            />
            <Button
              variant={"outline"}
              className="bg-transparent !border-transparent !rounded-none text-sm w-fit px-small"
              onClick={(e) => {
                const inputElement =
                  e.currentTarget.parentElement?.querySelector(
                    "#search-content"
                  ) as HTMLInputElement;
                updateFilter({
                  search: inputElement.value,
                });
                if (saveFilter) saveFilter();
              }}
            >
              <SearchIcon />
              Search
            </Button>
          </div>
        </article>
        {/* Price Range */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
            <h3 className="font-medium">Price Range</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="space-y-4">
              <Slider
                defaultValue={[0, maxPrice]}
                value={[
                  filters.price?.from || 0,
                  filters.price?.to || maxPrice,
                ]}
                onValueChange={(val) => {
                  const [from, to] = val;
                  updateFilter({
                    price: {
                      from,
                      to,
                    },
                  });
                }}
                step={10}
                max={maxPrice}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${filters.price?.from}</span>
                <span>${filters.price?.to}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
              <h3 className="font-medium">Categories</h3>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <ul className="w-full flex gap-small flex-col">
                {categories.map((p, idx) => {
                  return (
                    <div
                      key={idx}
                      className="w-full flex items-center gap-xtrasmall md:gap-peers"
                    >
                      <Checkbox
                        onCheckedChange={() => {
                          updateFilter(
                            { categories: [p.slug] },
                            filters.categories?.includes(p.slug)
                              ? "REMOVE"
                              : "ADD"
                          );
                        }}
                        id={p.slug}
                      />
                      <label className="link" htmlFor={p.slug}>
                        {p.name}
                      </label>
                    </div>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* brands */}
        {brands && brands.length > 0 && (
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
              <h3 className="font-medium">Brand</h3>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <ul className="w-full flex gap-small flex-col">
                {brands.map((p, idx) => {
                  return (
                    <div
                      key={idx}
                      className="w-full flex items-center gap-xtrasmall md:gap-peers"
                    >
                      <Checkbox
                        id={p.slug}
                        onCheckedChange={() => {
                          updateFilter(
                            { brands: [p.slug] },
                            filters.brands?.includes(p.slug) ? "REMOVE" : "ADD"
                          );
                        }}
                      />
                      <label className="link" htmlFor={p.slug}>
                        {p.name}
                      </label>
                    </div>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* materials */}
        {materials && materials.length > 0 && (
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
              <h3 className="font-medium">Material</h3>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <ul className="w-full flex gap-small flex-col">
                {materials.map((p, idx) => {
                  return (
                    <div
                      key={idx}
                      className="w-full flex items-center gap-xtrasmall md:gap-peers"
                    >
                      <Checkbox
                        id={p}
                        onCheckedChange={() => {
                          updateFilter(
                            { materials: [p] },
                            filters.materials?.includes(p) ? "REMOVE" : "ADD"
                          );
                        }}
                      />
                      <label className="link" htmlFor={p}>
                        {p}
                      </label>
                    </div>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Sizes
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
            <h3 className="font-medium">Size</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <Label
                  key={size}
                  className={`border rounded-md p-2 text-center cursor-pointer transition-colors ${
                    (filters.sizes || []).includes(size)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={(filters.sizes || []).includes(size)}
                    onChange={(e) => {
                      e.preventDefault();
                      updateFilter(
                        { sizes: [size] },
                        filters.categories?.includes(size) ? "REMOVE" : "ADD"
                      );
                    }}
                  />
                  {size}
                  {filters.categories?.includes(size) ? "true" : "false"}
                </Label>
              ))}
              {filters.sizes}
            </div>
          </CollapsibleContent>
        </Collapsible> */}

        {/* Colors */}
        {colors.length > 0 && (
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
              <h3 className="font-medium">Color</h3>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-4 gap-2">
                {colors.map((c, idx) => {
                  const color = c.hex || c.rgba || "#fff";
                  const text = getContrastingTextColor(color);
                  return (
                    <li
                      key={idx}
                      title={c.name}
                      className="size-7 relative isolate overflow-hidden cursor-pointer rounded-full border"
                      style={{
                        background: color,
                        color: text,
                        borderColor: text,
                      }}
                    >
                      <ShopColorPick
                        onSelect={(selected) => {
                          updateFilter(
                            { colors: [color] },
                            selected ? "ADD" : "REMOVE"
                          );
                        }}
                        select={filters.colors?.includes(color)}
                      />
                    </li>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default FiltersSidebar;

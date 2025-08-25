"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import processColors, { color } from "@/lib/controllers/processColors";
import { getContrastingTextColor } from "@/lib/utils/colorsProcessors/colorProcessing";
import { useNavItems } from "@/store/navItems";
import useShopFiltersStore from "@/store/shopFilters";
import { queryParamsToFilters } from "@/store/shopFilters/helper";
import { ChevronDown, PlusCircleIcon, SearchIcon, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ShopColorPick from "../pages/shop/colorPick";
import { Input } from "../ui/input";

interface FiltersProps {
  className?: string;
}

const FiltersSidebar = ({ className = "" }: FiltersProps) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<color[]>([]);
  const { filters, updateFilter, clearFilters } = useShopFiltersStore();
  const { items } = useNavItems();
  const shopNavOnly = items.find((i) => i.label === "Shop");
  const queryParams = useSearchParams();

  useEffect(() => {
    const loadedFilters = queryParamsToFilters(queryParams.toString());
    async function loadColors() {
      const loadColors = await processColors();
      setColors(loadColors);
    }
    loadColors();
    updateFilter(loadedFilters);
  }, []);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

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

      <CardContent className="space-y-6 px-small">
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
                defaultValue={[0, 5000]}
                value={[filters.price?.from || 0, filters.price?.to || 500]}
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
                max={500}
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
        {shopNavOnly && (shopNavOnly.children || []).length > 0 && (
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
              <h3 className="font-medium">Categories</h3>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <ul className="w-full flex gap-small flex-col">
                {(shopNavOnly.children || []).map((p, idx) => {
                  const hasCollections = p.items.length;
                  if (hasCollections) {
                    return (
                      <li key={idx}>
                        <Collapsible>
                          <div className="w-full flex items-center justify-between">
                            <div className="w-full flex items-center gap-xtrasmall md:gap-peers">
                              <Checkbox
                                id={`/shop/${p.url || ""}`}
                                checked={filters.categories?.includes(
                                  p.url || ""
                                )}
                                onCheckedChange={(state) => {
                                  updateFilter(
                                    {
                                      categories: [p.url || ""],
                                      collections: p.items.map((i) => i.url),
                                    },
                                    state ? "ADD" : "REMOVE"
                                  );
                                }}
                              />
                              <label
                                className="link"
                                htmlFor={`/shop/${p.url || ""}`}
                              >
                                {p.label || "item"}
                              </label>
                            </div>
                            <CollapsibleTrigger className="[--rotation:0] data-[state=open]:[--rotation:45deg]">
                              <PlusCircleIcon className="cursor-pointer rotate-[var(--rotation)]  duration-300" />
                            </CollapsibleTrigger>
                          </div>
                          <CollapsibleContent>
                            <div className="w-full flex flex-col gap-small pl-2">
                              {p.items.map((i, dx) => (
                                <div
                                  key={dx}
                                  className="w-full flex items-center gap-xtrasmall md:gap-peers"
                                >
                                  <Checkbox
                                    id={i.url}
                                    checked={
                                      filters.categories?.includes(
                                        p.url || ""
                                      ) || filters.collections?.includes(i.url)
                                    }
                                    onCheckedChange={(state) => {
                                      updateFilter(
                                        { collections: [i.url || ""] },
                                        state ? "ADD" : "REMOVE"
                                      );
                                    }}
                                  />
                                  <label className="link" htmlFor={i.url}>
                                    {i.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </li>
                    );
                  }
                  return (
                    <div
                      key={idx}
                      className="w-full flex items-center gap-xtrasmall md:gap-peers"
                    >
                      <Checkbox id={p.label} />
                      <label className="link" htmlFor={p.label}>
                        {p.label}
                      </label>
                    </div>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Sizes */}
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
                    selectedSizes.includes(size)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedSizes.includes(size)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...selectedSizes, size]
                        : selectedSizes.filter((s) => s !== size);
                      setSelectedSizes(updated);
                    }}
                  />
                  {size}
                </Label>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

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

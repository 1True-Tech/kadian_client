"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { color } from "@/lib/controllers/processColors";
import { useIsMobile } from "@/lib/hooks/isMobile";
import { useTheme } from "@/lib/hooks/theme";
import { cn } from "@/lib/utils";
import { getContrastingTextColor } from "@/lib/utils/colorsProcessors/colorProcessing";
import useShopFiltersStore from "@/store/shopFilters";
import {
  filtersToQueryParams,
  queryParamsToFilters,
} from "@/store/shopFilters/helper";
import { ShopSorting } from "@/store/shopFilters/types";
import { NavItem } from "@/types/structures";
import { MenuIcon, PlusCircleIcon, SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import ShopColorPick from "./colorPick";

type Props = {
  availableColors: color[];
  shopNavOnly?: NavItem;
};

export default function ShopNav({ availableColors, shopNavOnly }: Props) {
  const { filters, updateFilter } = useShopFiltersStore();
  const { push } = useRouter();
  const queryParams = useSearchParams();
  const { setTheme, theme } = useTheme();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const loadedFilters = queryParamsToFilters(queryParams.toString());
    updateFilter(loadedFilters);
  }, []);

  const handleRedirectFilter = useCallback(() => {
    const query = filtersToQueryParams(filters);
    push(`?${query}`);
  }, [filters]);

  useEffect(() => {
    if (!isMobile) handleRedirectFilter();
  }, [filters]);
  const mainNav = (
    <section
      className={cn(
        "shrink-0 flex-col gap-small md:gap-peers left-nav sticky top-40 h-fit",
        {
          "hidden md:flex w-60": !isMobile,
          "flex w-full": isMobile,
        }
      )}
    >
      <article className="left-nav-item md:!hidden">
        <h3>Sort by:</h3>
        {/* <ShopSort sortFilters={sortFilters} /> */}
      </article>
      <article className="left-nav-item">
        <h3>Search</h3>
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
            className="bg-transparent !border-transparent !rounded-none"
            onClick={(e) => {
              const inputElement = e.currentTarget.parentElement?.querySelector(
                "#search-content"
              ) as HTMLInputElement;
              updateFilter({
                search: inputElement.value,
              });
            }}
          >
            <SearchIcon />
          </Button>
        </div>
        <div className="w-full">
          <Checkbox
            id="dark-theme"
            onCheckedChange={(state) => setTheme(state ? "dark" : "light")}
          />
          <label className="link" htmlFor="dark-theme">
            Use dark theme ({theme})
          </label>
        </div>
      </article>
      {shopNavOnly && (shopNavOnly.children || []).length > 0 && (
        <article className="left-nav-item">
          <h3>Category</h3>

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
                            checked={filters.categories?.includes(p.url || "")}
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
                                  filters.categories?.includes(p.url || "") ||
                                  filters.collections?.includes(i.url)
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
        </article>
      )}
      {availableColors.length > 0 && (
        <article className="left-nav-item">
          <h3>Color{availableColors.length > 1 && "s"}</h3>

          <ul className="w-full flex gap-small">
            {availableColors.map((c, idx) => {
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
          </ul>
        </article>
      )}
    </section>
  );
  if (isMobile)
    return createPortal(
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"ghost"}
            className="!bg-transparent md:hidden !size-10 !p-0"
          >
            <MenuIcon
              strokeWidth={0.5}
              className="size-full scale-110 text-foreground"
            />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-w-screen">
          <SheetHeader
            id="mobile-nav-header-sheet"
            className="w-full flex !flex-row items-center justify-between"
          >
            <SheetTitle className="font-cinzel text-lg min-[498px]:text-2xl">
              Filters
            </SheetTitle>
            <SheetClose>
              <XIcon className="size-8 text-foreground/70 cursor-pointer" />
            </SheetClose>
          </SheetHeader>
          <ScrollArea className="w-full h-[70dvh] shrink">{mainNav}</ScrollArea>
          <SheetFooter>
            <Button onClick={handleRedirectFilter}>Save filters</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
      document.querySelector("#mobile-filter")!
    );
  return mainNav;
}

export function ShopSort({
  sortFilters,
}: {
  sortFilters: { label: string; sort: ShopSorting }[];
}) {
  const maxWidthForSortFilters = sortFilters.reduce((prev, current) => {
    if (current.label.length > prev) return current.label.length;
    else return prev;
  }, 0);
  const { filters, updateFilter } = useShopFiltersStore();

  return (
    <Select
      onValueChange={(val) => {
        updateFilter({ sorting: val as ShopSorting });
      }}
      value={filters.sorting}
    >
      <SelectTrigger
        style={{
          width: `${maxWidthForSortFilters * 2}ch`,
        }}
        className="!rounded-none border-2 !border-foreground/50 !shadow-none !ring-0"
      >
        <SelectValue placeholder="Sort filter" />
      </SelectTrigger>
      <SelectContent>
        {sortFilters.map((i, idx) => (
          <SelectItem key={idx} value={i.sort}>
            {i.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

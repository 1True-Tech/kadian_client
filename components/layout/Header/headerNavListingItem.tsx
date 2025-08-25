"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/lib/hooks/isMobile";
import { NavItem } from "@/types/structures";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
export default function HeaderNavListItem({ label, children, url }: NavItem) {
  const isMobile = useIsMobile(768);
  const LabelComp = url ? (
    <Link href={url} className="header-nav-list-item-link">
      {label}
    </Link>
  ) : (
    label
  );
  if (isMobile) return null;
  return (
    <span className="header-nav-list-item capitalize">
      {!children ? (
        LabelComp
      ) : (
        <Popover>
          <PopoverTrigger className="cursor-pointer flex items-center gap-2">
            {LabelComp}
            {!url && <PlusIcon className="size-3" />}
          </PopoverTrigger>
          <PopoverContent
            sideOffset={10}
            // position="center"
            className="!w-fit !max-w-[98dvw] max-h-[80vh] overflow-y-auto !grid grid-cols-[repeat(auto-fit,_minmax(15rem,1fr))] gap-4"
          >
            {children.map((child, idx) => {
              const LabelComp2 = child.url ? (
                <Link href={`${child.url}`} className="header-nav-list-item-link w-full text-foreground/70 font-bold border-b border-b-foreground/70 pb-[1px] capitalize">
                  {child.label}
                </Link>
              ) : (
                <h4 className="w-full text-foreground/70 font-bold border-b border-b-foreground/70 pb-[1px] capitalize">
                  {child.label}
                </h4>
              );
              return (
                <div
                  key={idx}
                  className="w-full header-nav-list-item-nested flex flex-col gap-4"
                >
                  {child.hasLabel && LabelComp2}
                  <ul className="w-full flex flex-col gap-2">
                    {child.items.map((item, idx_item) => (
                      <li key={idx_item} className="w-full">
                        <Link
                          href={item.url}
                          className="header-nav-list-item-nested-link"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </PopoverContent>
        </Popover>
      )}
    </span>
  );
}

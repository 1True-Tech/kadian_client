import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavItem } from "@/types";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
export default function HeaderNavListItem({ label, children, url }: NavItem) {
  const LabelComp = url ? (
    <Link href={url} className="header-nav-list-item-link">
      {label}
    </Link>
  ) : (
    label
  );
  return (
    <li className="w-full header-nav-list-item capitalize">
      {!children ? (
        LabelComp
      ) : (
        <Collapsible>
          <CollapsibleTrigger className="cursor-pointer data-[state=closed]:[--rotate:0deg] data-[state=open]:[--rotate:45deg] flex items-center justify-between gap-2 w-full">
            {LabelComp}
            {!url && (
              <PlusIcon className="size-4 rotate-[var(--rotate)] duration-300" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="!w-full">
            <Accordion
              type="single"
              className="w-full header-nav-list-item-nested flex flex-col !gap-0"
            >
              {children.map((child, idx) => {
                const itemsMap = (
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
                );
                return !child.hasLabel ? (
                  itemsMap
                ) : (
                  <AccordionItem
                    key={idx}
                    value={child.label}
                    className="w-full"
                  >
                    <AccordionTrigger
                      icon={null}
                      className="flex cursor-pointer items-center justify-between w-full data-[state=closed]:[--rotate:0deg] data-[state=open]:[--rotate:45deg]"
                    >
                      {child.url ? (
                        <Link
                          href={`${child.url}`}
                          className="header-nav-list-item-link w-full text-foreground/70 font-bold border-b border-b-foreground/70 pb-[1px] capitalize"
                        >
                          {child.label}
                        </Link>
                      ) : (
                        <h4 className="w-full text-foreground/70 font-bold border-b border-b-foreground/70 pb-[1px] capitalize">
                          {child.label}
                        </h4>
                      )}
                      <PlusIcon className="size-4 !rotate-[var(--rotate)] duration-300" />
                    </AccordionTrigger>
                    <AccordionContent>{itemsMap}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CollapsibleContent>
        </Collapsible>
      )}
    </li>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <li className="header-nav-list-item capitalize">
      {!children ? (
        LabelComp
      ) : (
        <Accordion type="multiple">
          <AccordionItem value={label}>
            <AccordionTrigger
              icon={null}
              className="cursor-pointer flex items-center gap-2"
            >
              {LabelComp}
              {!url && <PlusIcon className="size-3" />}
            </AccordionTrigger>
            <AccordionContent className="!w-fit">
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
                  <Accordion
                    type="single"
                    key={idx}
                    className="w-full header-nav-list-item-nested flex flex-col gap-4"
                  >
                    <AccordionItem value={child.label} className="w-full">
                      <AccordionTrigger
                        icon={null}
                        className="flex items-center justify-between w-full"
                      >
                        <h4 className="w-full text-foreground/70 font-bold border-b border-b-foreground/70 pb-[1px] capitalize">
                          {child.label}
                        </h4>
                        <PlusIcon className="size-3" />
                      </AccordionTrigger>
                      <AccordionContent>
                        {itemsMap}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </li>
  );
}

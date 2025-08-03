import { NavItem } from "@/types";
import queries from "../queries";
import { client } from "../utils/NSClient";

export const processShopListNavigations = async (): Promise<NavItem[]> => {
  const categoryItems = await client.fetch(queries.categoryForShopList);
  return [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Shop",
      children: [
        ...categoryItems.map(
          (category: {
            label: string;
            items: { name: string; url: string }[];
            url: string;
          }) => ({
            hasLabel: category.label ? true : false,
            label: category.label ? category.label : undefined,
            items: category.items.map(
              (item: { name: string; url: string }) => ({
                name: item.name,
                url: `/shop/${category.url}/${item.url}`,
              })
            ),
          })
        ),
      ],
    },
    {
      label: "Sale",
      url: "/sale",
    },
    {
      label: "About",
      url: "/about",
    },
    {
      label: "Consultation",
      url: "/consultation",
    },
    {
      label: "Blog",
      url: "/blog",
    },
    {
      label: "Contact",
      url: "/contact",
    },
  ];
};

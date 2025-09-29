import { NavItem } from "@/types/structures";
import queries from "../queries";
import { client } from "../utils/NSClient";

export const processShopListNavigations = async (): Promise<NavItem[]> => {
  try {
    const categoryItems = await client.fetch(queries.categoryForShopList);
    return [
      {
        label: "Home",
        url: "/",
      },
      {
        label: "Categories",
        children: [
          ...categoryItems.map(
            (category: {
              label: string;
              items: { name: string; url: string }[];
              url: string;
            }) => ({
              hasLabel: category.label ? true : false,
              label: category.label ? category.label : undefined,
              url: `/category/${category.url}`,
              items: category.items.map(
                (item: { name: string; url: string }) => ({
                  name: item.name,
                  url: `/collection/${item.url}`,
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
        label: "Contact us",
        url: "/contact",
      },
    ];
  } catch {
    return [
      {
        label: "Home",
        url: "/",
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
        label: "Contact us",
        url: "/contact",
      },
    ];
  }
};

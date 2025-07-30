import { NavItem } from "@/types";

const navItems: NavItem[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Shop",
    children: [
      {
        hasLabel: true,
        label: "Women’s Wear",
        items: [
          { name: "New Arrivals", url: "/shop/women/new" },
          { name: "Dresses", url: "/shop/women/dresses" },
          { name: "Tops & Blouses", url: "/shop/women/tops" },
          { name: "Bottoms", url: "/shop/women/bottoms" },
          { name: "Outerwear", url: "/shop/women/outerwear" },
          { name: "Loungewear", url: "/shop/women/lounge" },
        ],
      },
      {
        hasLabel: true,
        label: "Accessories",
        items: [
          { name: "Bags & Purses", url: "/shop/accessories/bags" },
          { name: "Jewelry", url: "/shop/accessories/jewelry" },
          { name: "Scarves & Hats", url: "/shop/accessories/scarves-hats" },
          { name: "Belts", url: "/shop/accessories/belts" },
        ],
      },
      {
        hasLabel: true,
        label: "Shoes",
        items: [
          { name: "Heels", url: "/shop/shoes/heels" },
          { name: "Flats", url: "/shop/shoes/flats" },
          { name: "Boots", url: "/shop/shoes/boots" },
          { name: "Sneakers", url: "/shop/shoes/sneakers" },
        ],
      },
      {
        hasLabel: true,
        label: "Beauty",
        items: [
          { name: "Skincare", url: "/shop/beauty/skincare" },
          { name: "Makeup", url: "/shop/beauty/makeup" },
          { name: "Fragrance", url: "/shop/beauty/fragrance" },
        ],
      },
      {
        hasLabel: true,
        label: "Men’s Highlights",
        items: [
          { name: "Shirts", url: "/shop/men/shirts" },
          { name: "Trousers", url: "/shop/men/trousers" },
        ],
      },
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

export default navItems;

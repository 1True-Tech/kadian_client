import { NavItem } from "@/types";
import HeaderNavListItem from "./headerNavListingItem";

type Props = {
  navItems: NavItem[];
};

export default function HeaderNavListing({ navItems }: Props) {
  return (
    <ul className="mt-peers w-fit hidden md:flex items-center gap-medium justify-between">
      {navItems.map((i, idx) => (
        <HeaderNavListItem key={idx} {...i} />
      ))}
    </ul>
  );
}

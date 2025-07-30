import { NavItem } from "@/types";

type Props = {
  navItems: NavItem[];
};

export default function HeaderNavListing({ navItems }: Props) {
  return (
    <ul className="mt-peers w-fit hidden md:flex items-center gap-3 justify-between">
      {navItems.map((i, idx) => (
        <li key={idx} className="capitalize active:underline hover:underline">
          {i.label}
        </li>
      ))}
    </ul>
  );
}

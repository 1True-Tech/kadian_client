"use client";

import {
  Heart,
  Home,
  Search,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  // { label: "Shop", icon: ShoppingBag, href: "/shop" },
  { label: "Explore", icon: Search, href: "/shop" },
  { label: "Wishlist", icon: Heart, href: "/wishlist" },
  { label: "Profile", icon: User, href: "/account" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full md:hidden pointer-events-auto bg-background px-container py-small flex items-center justify-between">
      {navItems.map(({ label, icon, href }) => (
        <NavItem
          key={label}
          icon={icon}
          label={label}
          href={href}
          active={pathname === href}
        />
      ))}
    </nav>
  );
}

function NavItem({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: any;
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center gap-0.5 text-xs">
      <Icon
        className={`w-5 h-5 ${
          active ? "text-foreground" : "text-foreground/70"
        }`}
      />
      <span className={active ? "text-foreground font-semibold" : "text-foreground/70"}>
        {label}
      </span>
    </Link>
  );
}

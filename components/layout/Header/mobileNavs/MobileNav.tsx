"use client";

import {
  Globe2Icon,
  Heart,
  Home,
  Menu,
  ShoppingBag,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Shop", icon: ShoppingBag, href: "/shop" },
  {
    label: "Browse",
    icon: Menu,
    href: "#",
    subMenu: [
      { label: "Categories", href: "/category" },
      { label: "Collections", href: "/collection" },
      { label: "Lookbook", href: "/lookbook" },
      { label: "Style Guide", href: "/style-guide" },
      { label: "Size Guide", href: "/size-guide" },
    ]
  },
  { label: "Wishlist", icon: Heart, href: "/wishlist" },
  { label: "Account", icon: User, href: "/account" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full md:hidden pointer-events-auto bg-background px-container py-small flex items-center justify-between">
      {navItems.map(({ label, icon, href, subMenu }) => (
        <NavItem
          key={label}
          icon={icon}
          label={label}
          href={href}
          subMenu={subMenu}
          active={pathname === href || (subMenu?.some(item => pathname === item.href))||false}
        />
      ))}
    </nav>
  );
}

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function NavItem({
  icon: Icon,
  label,
  href,
  active,
  subMenu,
}: {
  icon: any;
  label: string;
  href: string;
  active: boolean;
  subMenu?: Array<{ label: string; href: string }>;
}) {
  if (subMenu) {
    return (
      <Sheet>
        <SheetTrigger className="flex flex-col items-center justify-center gap-0.5 text-xs">
          <Icon className="w-5 h-5 text-foreground/70" />
          <span className="text-foreground/70">{label}</span>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[40vh]">
          <SheetHeader>
            <SheetTitle>Browse</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {subMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

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

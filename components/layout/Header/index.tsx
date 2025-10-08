"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavItems } from "@/store/navItems";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HeaderMobileNavListItem from "./headerMobileNavItem";
import HeaderNavListItem from "./headerNavListingItem";
import { HeaderUserSection } from "./headerUserSection";
import MobileHeaderNav from "./mobileNavs/headerNav";
import { useUserStore } from "@/store/user";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useNavItems();
  const { user } = useUserStore();
  const cartItems = user?.cart.length;
  const wishListItems = user?.wishList.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-container flex flex-col">
        {/* Top Row: Logo + Actions */}
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 sm:w-80">
                <nav aria-label="Mobile navigation">
                  <div className="flex flex-col mt-8 space-y-6 w-full">
                    <Link
                      href="/"
                      aria-label="Kadian Fashion homepage"
                      className="text-2xl font-light font-cinzel tracking-wider"
                    >
                      Kadian Fashion
                    </Link>
                    <ul className="flex flex-col gap-2 w-full">
                      {items.map((item) => (
                        <HeaderMobileNavListItem key={item.label} {...item} />
                      ))}
                    </ul>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop Logo */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/"
                aria-label="Kadian Fashion homepage"
                className="flex items-center gap-2"
              >
                <Image
                  width={32}
                  height={32}
                  src="/icon.jpg"
                  alt="Kadian Fashion logo"
                  className="rounded-full"
                  priority
                />
                <span className="text-xl sm:text-2xl font-light tracking-wider font-cinzel">
                  Kadian
                </span>
                <span className="text-xl sm:text-2xl font-thin text-accent font-cinzel hidden md:inline">
                  Fashion
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Link href="/shop">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                aria-label="Search products"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>

            {/* Wishlist */}
            {user && (
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex relative"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  {wishListItems && wishListItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 bg-rose-gold text-rose-gold-foreground text-xs flex items-center justify-center">
                      {wishListItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* Cart + User */}
            <MobileHeaderNav mobileSize={640}>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  {cartItems && cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 bg-rose-gold text-rose-gold-foreground text-xs flex items-center justify-center">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </Link>
              <HeaderUserSection />
            </MobileHeaderNav>
          </div>
        </div>

        {/* Bottom Row: Desktop Navigation */}
        <nav
          className="hidden md:flex items-center justify-center border-t border-border h-12"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-6 overflow-x-auto scrollbar-none px-4">
            {items.map((i, idx) => (
              <li key={idx} className="flex-shrink-0">
                <HeaderNavListItem {...i} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

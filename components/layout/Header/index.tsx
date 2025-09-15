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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="mx-auto px-container">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col space-y-4 mt-8 w-full">
                <Link
                  href="/"
                  className="text-2xl font-light font-cinzel tracking-wider"
                >
                  Kadian Fashion
                </Link>
                <ul className="flex flex-col gap-small w-full">
                  {items.map((item) => (
                    <HeaderMobileNavListItem key={item.label} {...item} />
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="w-fit hidden min-[250px]:flex items-center justify-center gap-small">
            <Image
              width={360}
              height={280}
              src={"/icon.jpg"}
              alt="kadian logo"
              className="size-5 -mt-[2px]"
            />

            <Link href="/" className="flex items-center space-x-2 font-cinzel">
              <span className="text-2xl font-light tracking-wider md:hidden lg:inline">
                Kadian
              </span>
              <span className="text-2xl font-thin text-accent hidden min-[360px]:inline md:hidden lg:inline">
                Fashion
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="w-fit flex items-center gap-medium justify-between">
              {items.map((i, idx) => (
                <HeaderNavListItem key={idx} {...i} />
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/shop">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            {user && (
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                  <Heart className="h-5 w-5" />
                  {wishListItems && wishListItems > 0 ?(
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 bg-rose-gold text-rose-gold-foreground text-xs flex items-center justify-center">
                      {wishListItems}
                    </Badge>
                  ):null}
                  
                </Button>
              </Link>
            )}

            <MobileHeaderNav mobileSize={640}>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItems && cartItems > 0 ? (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 bg-rose-gold text-rose-gold-foreground text-xs flex items-center justify-center">
                      {cartItems}
                    </Badge>
                  ):null}
                </Button>
              </Link>
              <HeaderUserSection />
            </MobileHeaderNav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavItems } from "@/store/navItems";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import HeaderMobileNavListItem from "./headerMobileNavItem";
import HeaderNavListItem from "./headerNavListingItem";
import MobileHeaderNav from "./mobileNavs/headerNav";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = 3; // This would come from cart context
  const { items } = useNavItems();

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
                <Link href="/" className="text-2xl font-light font-cinzel tracking-wider">
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
          <Link href="/" className="flex items-center space-x-2 font-cinzel">
            <span className="text-2xl font-light tracking-wider">Kadian</span>
            <span className="text-2xl font-thin text-accent">Fashion</span>
          </Link>

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
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <MobileHeaderNav mobileSize={640}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 bg-rose-gold text-rose-gold-foreground text-xs flex items-center justify-center">
                    {cartItems}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
              </Button>
            </MobileHeaderNav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

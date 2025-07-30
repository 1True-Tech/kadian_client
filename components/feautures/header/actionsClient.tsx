"use client";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/lib/hooks/isMobile";
import { HeartIcon, Menu, ShoppingBagIcon } from "lucide-react";
import MobileHeaderNav from "../mobileNavs/headerNav";

export default function ActionsClient() {
  const isMobile = useIsMobile(768);
  if (isMobile) return <MobileHeaderNav/>;
  return (
    <div className="w-fit flex items-center gap-3">
      <Button variant={"link"}>
        <HeartIcon /> Wishlist (0)
      </Button>
      <Button variant={"link"}>
        <ShoppingBagIcon /> My Bag (0)
      </Button>
    </div>
  );
}

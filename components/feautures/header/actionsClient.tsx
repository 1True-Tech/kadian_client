"use client";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/lib/hooks/isMobile";
import { HeartIcon, SearchIcon, ShoppingBagIcon } from "lucide-react";

export default function ActionsClient() {
  const isMobile = useIsMobile(640);
  if (isMobile) return null;
  return (
    <div className="w-fit flex items-center gap-3">
      <Button variant={"link"}>
        <SearchIcon /> Search
      </Button>
      <Button variant={"link"}>
        <HeartIcon /> Wishlist (0)
      </Button>
      <Button variant={"link"}>
        <ShoppingBagIcon /> My Bag (0)
      </Button>
    </div>
  );
}

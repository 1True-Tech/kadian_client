"use client";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/lib/hooks/isMobile";
import { HeartIcon, ShoppingBagIcon } from "lucide-react";
import MobileHeaderNav from "../mobileNavs/headerNav";
import { NavItem } from "@/types";

export default function ActionsClient({navigationList}:{navigationList:NavItem[]}) {
  const isMobile = useIsMobile(768);
  const isNotMobile = !isMobile || false
  if (isMobile) return <MobileHeaderNav navigationList={navigationList}/>;
  return (
    <>
      {!isNotMobile?null:<MobileHeaderNav navigationList={navigationList}/>}
      <div className="w-fit hidden md:flex items-center gap-3">
        <Button variant={"link"}>
          <HeartIcon /> Wishlist (0)
        </Button>
        <Button variant={"link"}>
          <ShoppingBagIcon /> My Bag (0)
        </Button>
      </div>
    </>
  );
}

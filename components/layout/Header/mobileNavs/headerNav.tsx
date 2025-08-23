import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/lib/hooks/isMobile";
import { HasSlot, NavItem } from "@/types";
import {
  BellIcon,
  ShoppingBagIcon
} from "lucide-react";
import { createPortal } from "react-dom";
import MobileNav from "./MobileNav";

type Props = {
  hasBottomNav?:boolean
  mobileSize?:number
};

export default function MobileHeaderNav({ mobileSize = 768,hasBottomNav=true, children }: Props&HasSlot) {
  const isMobile = useIsMobile(mobileSize);
  if (!isMobile) return children;

  const location = document.getElementById("mobile-nav");

  if (!location) return null;

  return (
    <>
      {children}
      {hasBottomNav&&createPortal(<MobileNav />, location)}
    </>
  );
}

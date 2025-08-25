import { useIsMobile } from "@/lib/hooks/isMobile";
import { HasSlot } from "@/types/structures";
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

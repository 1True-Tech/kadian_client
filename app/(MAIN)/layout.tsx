"use client";
import { Loader } from "@/components/ui/loaders";
import { LoadUser } from "@/lib/controllers/_loadUser";
import { useNavItems } from "@/store/navItems";
import { HasSlot } from "@/types/structures";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: HasSlot) {
  const path = usePathname()
  const { load } = useNavItems();
  useEffect(() => {
    load();
  }, [path, load]);

  

  return <>
  {children}
  <Loader loader="flip-text-loader" text="KADIAN" loaderSize="fullscreen">
    <LoadUser/>
  </Loader>
  <aside id="mobile-nav" className="w-full sticky bottom-0 sm:pointer-events-none"></aside>
  </>;
}

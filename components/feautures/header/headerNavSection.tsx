import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import ActionsClient from "./actionsClient";
import HeaderNavListing from "./headerNavListing";

import { NavItem } from "@/types";
export default function HeaderNavSection({navItems}:{navItems:NavItem[]}) {
  return (
    <nav className="header-nav-section w-full py-4 relative flex flex-col gap-small items-center justify-between">
      {/* center */}

      <div className="w-fit flex gap-2 flex-col items-center font-cinzel text-2xl md:text-3xl font-bold md:absolute md:top-5 md:left-1/2 md:-translate-x-1/2">
        <Image
          src={"/icon.jpg"}
          alt="logo"
          width={300}
          height={300}
          className="block size-7 md:hidden"
        />
        <b>KADIAN</b>
      </div>
      {/* left */}
      <div className="w-full flex flex-row-reverse md:flex-row gap-peers items-center justify-between">
        <div className="header-nav-section-search w-full md:w-70 flex items-center gap-xtrasmall border-y-1 border-y-foreground/40">
          <Input
            id="search-content"
            name="search-content"
            type="search"
            className="w-full !shadow-none !rounded-none !outline-none !ring-0 !border-0 !px-0 !pl-2"
          />
          <Button
            variant={"outline"}
            className="bg-transparent !border-transparent !rounded-none"
          >
            <SearchIcon /> Search
          </Button>
        </div>
        <ActionsClient navigationList={navItems} />
      </div>
      {/* bottom */}
      <HeaderNavListing navItems={navItems} />
    </nav>
  );
}

"use client";
import { useIsMobile } from "@/lib/hooks/isMobile";
import Image from "next/image";
import React from "react";

const categories = ["women", "men", "kids"];

export default function HeaderNavSection() {
  const isMobile = useIsMobile(640);
  return (
    <nav className="w-full py-4 relative">
      {/* left */}
      <ul className="w-fit flex items-center gap-3 justify-between">
        {categories.map((i, idx) => (
          <li key={idx} className="capitalize active:underline hover:underline">
            {i}
          </li>
        ))}
      </ul>
      {/* center */}

      {!isMobile && (
        <div className="w-fit flex gap-2 flex-col font-cinzel text-3xl font-bold absolute top-1/2 left-1/2 -translate-1/2">
          {/* <Image src="/icon.jpg" alt="icon" width={500} height={500} className="size-10" /> */}
          <b>KADIAN</b>
        </div>
      )}
      {/* right */}
      <div className="w-fit"></div>
    </nav>
  );
}

import React from "react";
import { HomeStyleGuideItem } from "./types";
import FcItem from "./fcItem";

export default function StyleGuideContent({items}:{items:HomeStyleGuideItem[]}) {
  // placeholder items array for demo
  const count = items.length;

  // determine grid layout classes based on number of items
  const rightGridClasses = (() => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-2";
    return "grid-cols-2 grid-rows-2";
  })();

  return (
    <div className="w-full max-w-screen-lg mx-auto px-container grid grid-cols-1 items-center sm:grid-cols-2 gap-5">
      {/* LEFT / TOP on mobile */}
      <div className="space-y-4">
        <h2 className="text-center sm:text-left w-fit mx-auto sm:mx-0 text-2xl sm:text-3xl font-bold underline decoration-accent underline-offset-4">
          Style Guide
        </h2>
        <p className="text-center sm:text-left text-base leading-relaxed max-w-prose">
          A curated style guide to help you build look.
        </p>
      </div>

      {/* RIGHT */}
      <div className={`w-full grid ${rightGridClasses} h-100 gap-4`}>
        {items.slice(0, 4).map((item, idx) => {
          // for 3 items, make the 3rd span both columns
          const spanClass = count === 3 && idx === 2 ? "col-span-2" : "";

          return (
            <article
              key={idx}
              className={`${spanClass} flex items-center w-fit justify-center`}
            >
              <FcItem item={item}/>
            </article>
          );
        })}
      </div>
    </div>
  );
}

import React, { Fragment } from "react";
import { HomeStyleGuideItem } from "./types";
import FcItem from "./fcItem";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";

export default function StyleGuideContent({
  items,
}: {
  items: HomeStyleGuideItem[];
}) {
  const bgImages = items.map((item) => item.image.src);
  return (
    <div className="w-full h-fit my-container">
      <div
        className="w-full sticky top-0 h-[100dvh] brightness-50"
        style={{
          backgroundImage: `url(${
            bgImages[Math.floor(Math.random() * bgImages.length)]
          })`,
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="w-full relative mt-[-90dvh] pb-20 h-fit isolate max-w-screen-lg mx-auto p-container flex flex-col items-center justify-center gap-5">
        {/* LEFT / TOP on mobile */}
        <div className="space-y-4 text-white">
          <h2 className="text-center w-fit mx-auto text-2xl sm:text-3xl font-bold underline decoration-accent underline-offset-4">
            Style Guide
          </h2>
          <p className="text-center text-base leading-relaxed max-w-prose">
            From clean lines to bold statements, this guide helps you build a look that&apos;s elevated, effortless, and all you.
          </p>
        </div>

        {/* RIGHT */}
        <div className={`w-full h-fit flex flex-wrap gap-4 justify-center`}>
          {items.slice(0, 4).map((item, idx) => {
            // for 3 items, make the 3rd span both columns
            return (
              <Fragment key={idx}>
              <article
                className={`grow max-w-sm basis-md flex items-center w-full justify-center`}
              >
                <FcItem item={item} />
              </article>
              </Fragment>
            );
          })}
        </div>
        <Button
          variant={"default"}
          className={cn(
            "fluid_btn !bg-transparent !overflow-hidden border-2 relative isolate !border-accent !text-white !h-fit !py-2 !px-4 rounded-full",
            "before:w-0 before:h-full before:absolute before:left-0 before:inset-0",
            "before:duration-300 before:bg-accent/70 before:backdrop-blur-3xl before:-z-1"
          )}
        >
          See All Guides{" "}
          <ArrowRightCircle className="hidden_icon size-5 [--w:1.25rem]" />
        </Button>
      </div>
    </div>
  );
}

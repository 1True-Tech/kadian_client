import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  position: `${"top" | "bottom"}-${"right" | "left"}`;
  image: string
};

export default function BgMask({ position = "bottom-left", image }: Props) {
  return (
    <div
      className="w-full h-[100dvh] left-0 absolute -z-1 md:sticky top-0"
      style={{
        // No mask by default (mobile)
        // These will get overridden in a media query below via Tailwind's "md:" classes
        WebkitMaskImage: "none",
        maskImage: "none",
      }}
    >
      {/* Use Tailwind to apply mask from md: and up */}
      <div
        style={
          {
            "--image-url": `url('/images/bg-image-${position}.png')`,
            "--mask-position": position.includes("right")?`right`:"left",
          } as React.CSSProperties
        }
        className={cn(
          "size-full",
          "md:[mask-image:var(--image-url)]",
          "md:[mask-repeat:no-repeat]",
          "md:[mask-size:cover]",
          "md:[mask-position:var(--mask-position)]",
          "md:[-webkit-mask-image:var(--image-url)]",
          "md:[-webkit-mask-repeat:no-repeat]",
          "md:[-webkit-mask-size:cover]",
          "md:[-webkit-mask-position:var(--mask-position)]"
        )}
      >
        <Image
          src={image}
          alt="image"
          width={1024}
          height={720}
          className="size-full object-cover object-center brightness-30 md:brightness-100"
        />
      </div>
    </div>
  );
}

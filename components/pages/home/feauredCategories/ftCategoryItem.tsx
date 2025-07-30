import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  text: string;
};

export default function FtCategoryItem({ image, text }: Props) {
  return (
    <li className="ft-category-item  relative isolate border-2 border-accent rounded-md basis-sm grow w-full max-w-md aspect-square max-h-[85vh] flex items-end gap-2">
      <span className="absolute rounded-sm overflow-hidden pointer-events-none inset-0 -z-5 size-full flex items-center justify-center">
        <Image
          src={image}
          alt="category"
          className="size-full item_bg duration-300 object-cover object-center"
          width={1024}
          height={1024}
        />
      </span>
      <span className="size-full pointer-events-none opacity-0 item_btn_container flex items-center justify-center absolute inset-0 -z-1">
        <Button
          variant={"default"}
          className={cn(
            "item_btn !bg-transparent !overflow-hidden border-2 relative isolate !border-accent !text-white !h-fit !py-2 !px-4 rounded-full",
            "before:w-0 before:h-full before:absolute before:left-0 before:inset-0",
            "before:duration-300 before:bg-accent/70 before:backdrop-blur-3xl before:-z-1"
          )}
        >
          Shop Now
        </Button>
      </span>
      {/* content */}
      <div className="w-full bg-gradient-to-t from-black/30 to-transparent py-5 px-4">
        <h4 className="text-lg font-semibold !text-white bg-light px-2">
          {text}
        </h4>
      </div>
    </li>
  );
}

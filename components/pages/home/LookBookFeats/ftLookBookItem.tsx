import { lBPtComponents } from "@/components/feautures/PortableText";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LookBookItem } from "@/types/home";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  data: LookBookItem;
};


export default function FtLookBookItem({ data }: Props) {
  return (
    <li className="ft-lookBook-item overflow-hidden relative isolate border-2 border-accent rounded-md basis-[12rem] sm:basis-[18rem] grow w-full max-w-md h-72 sm:aspect-square max-h-[85vh] flex items-end gap-2">
      <span className="absolute rounded-sm overflow-hidden pointer-events-none inset-0 -z-5 size-full flex items-center justify-center">
        <Image
          src={data.previewImage.src}
          alt={data.previewImage.alt}
          className="size-full item_bg duration-300 object-cover object-center"
          width={1024}
          height={1024}
        />
      </span>
      <span className="size-full pointer-events-none opacity-0 item_btn_container flex items-center justify-center absolute inset-0 -z-1">
        <Link href={"/lookbook/" + data.slug} className="w-fit">
        <Button
          variant={"default"}
          className={cn(
            "fluid_btn !bg-transparent !overflow-hidden border-2 relative isolate !border-accent !text-white !h-fit !py-2 !px-4 rounded-full",
            "before:w-0 before:h-full before:absolute before:left-0 before:inset-0",
            "before:duration-300 before:bg-accent/70 before:backdrop-blur-3xl before:-z-1"
          )}
        >
          See LookBook
        </Button>
        </Link>
      </span>
      {/* content */}
      <div className="ft-lookBook-item-content px-small sm:px-peers duration-500 w-full max-h-15 bg-gradient-to-t from-black/30 rounded-b-sm to-transparent py-5 flex flex-col gap-2">
        <h4 className="ft-lookBook-item-title text-lg font-semibold !text-white bg-light">
          {data.title}
        </h4>
        {/* sub text/description */}

        <div className="prose prose-invert max-w-none">
          <PortableText
            value={data.contentLines.slice(0,1)}
            components={lBPtComponents("ft-lookBook-item-content-sub-text")}
          />
        </div>
      </div>
    </li>
  );
}

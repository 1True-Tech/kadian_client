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
const lBPtComponents: PortableTextComponents = {
  block: {
    // “normal” is the default style; you can add other styles (h1, h2…) here too
    normal: ({ children }) => (
      <p className="ft-lookBook-item-content-sub-text translate-y-2 opacity-0 line-clamp-2 sm:line-clamp-3 duration-300">
        {children}
      </p>
    ),
  },
  marks: {
    // if you have inline marks (e.g. links, strong), style them here:
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="text-indigo-300 hover:underline"
        target={value.blank ? "_blank" : undefined}
        rel={value.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

export default function FtLookBookItem({ data }: Props) {
  return (
    <li className="ft-lookBook-item relative isolate border-2 border-accent rounded-md basis-[12rem] sm:basis-[18rem] grow w-full max-w-md aspect-square max-h-[85vh] flex items-end gap-2">
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
            "item_btn !bg-transparent !overflow-hidden border-2 relative isolate !border-accent !text-white !h-fit !py-2 !px-4 rounded-full",
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
            components={lBPtComponents}
          />
        </div>
      </div>
    </li>
  );
}

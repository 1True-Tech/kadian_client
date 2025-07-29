import React from "react";
import BgBlob from "../../../ui/bgBlob";
import { FeaturedContentItem } from "./types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";

type Props = {
  item: FeaturedContentItem;
};

export default function FcItem({ item }: Props) {
  return (
    <article className="w-full min-h-[60vh] relative isolate">
      <BgBlob />

      <div className="w-full flex flex-col gap-3 items-center mt-10">
        <h1 className="text-center w-fit text-2xl sm:text-3xl font-bold border-b-4 pb-1 border-accent">
          {item.title}
        </h1>
        <div className="w-full flex gap-5 flex-col-reverse sm:flex-row items-center max-w-5xl m-auto px-4 sm:px-10 mt-5">
          <div className="w-full flex flex-col justify-center sm:px-10 gap-4 min-h-full">
            <h1 className="font-bold text-3xl">Elegant Starlight</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
              sint minus laboriosam deserunt excepturi, ullam mollitia
              recusandae repellendus impedit tenetur.
            </p>
            <div className="w-full flex flex-wrap *basis-44 gap-2">
              <Button
                variant={"outline"}
                className="w-fit !bg-accent !text-white !px-5 !py-3 !h-fit !flex !items-center !justify-center !gap-2"
              >
                <ShoppingBagIcon/>
                Add to Bag
              </Button>
              <Button
                asChild
                variant={"outline"}
                className="w-fit !bg-primary-foreground !text-primary !px-5 !py-3 !h-fit !flex !items-center !justify-center !gap-2"
              >
                <Link
                  href="`/shop/${featuredProduct.id}`"
                  className="w-fit !px-4 !py-2 !flex !items-center !justify-center !gap-2"
                >
                  View Product
                </Link>
              </Button>
            </div>
          </div>
          <span className="w-full sm:w-fit shrink-0 bg-highlight">
            <img
              className="w-full sm:w-fit max-h-96 lgmax-h-[70vh] object-cover drop-shadow-xl drop-shadow-accent/20"
              src="/images/hero-image-2.jpg"
              alt="featuredProduct.image"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

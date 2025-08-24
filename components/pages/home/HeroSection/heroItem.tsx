"use client"
import { Button } from "@/components/ui/button";
import {
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { HomePageHero } from "@/types/home";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: HomePageHero;
  id:number;
};

export default function HeroItem({ data,id }: Props) {
const {currentIndex} = useCarousel()
const isCurrent = currentIndex === id
  const image =
        data.image.main ||
        data.image.mobile ||
        createColorSwatchDataUrl("#c49e45", 500, 0, data.title, "#111111");

  return (
    <CarouselItem
      className="max-w-full lg:w-md md:max-w-[calc(50%)] !px-0 h-full relative overflow-visible isolate !text-white"
    >
      <div className="size-full relative overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={data.image.alt || "image-1" + image}
          width={1920}
          height={1080}
          className="size-full object-cover object-center absolute inset-0 -z-10"
        />

        {/* content */}

        <div
          className={cn(
            "w-full flex flex-col justify-end gap-4 z-10 py-5 px-4 sm:px-8 md:px-4 lg:px-12",
            "absolute inset-0 bg-gradient-to-t from-black/60 via-90% via-transparent to-transparent"
          )}
        >
          <h4 className="font-poppins font-bold text-2xl sm:text-3xl max-w-sm">
            {data.title}
          </h4>
          <p className="max-w-md text-sm">
            {data.subtitle}
          </p>
          <Link href={data.cta.link}>
          <Button className="w-fit !bg-primary-foreground !text-primary dark:!bg-foreground dark:!text-background h-fit rounded-full !pr-1 !py-1">
            {data.cta.text}{" "}
            <span className="size-10 border-3 p-2 flex items-center justify-center border-primary dark:border-background bg-transparent rounded-full">
              <ShoppingBagIcon className="size-full" />
            </span>
          </Button>
          </Link>

          {isCurrent&&<div className="w-full flex items-center justify-start gap-4 relative">
            <CarouselPrevious className="!relative data-[usable=false]:hidden !bg-primary-foreground !text-primary dark:!bg-foreground dark:!text-background !top-0 !left-0 !translate-0" />
            <CarouselNext className="!relative data-[usable=false]:hidden !bg-primary-foreground !text-primary dark:!bg-foreground dark:!text-background !top-0 !left-0 !translate-0" />
          </div>}
        </div>
      </div>
    </CarouselItem>
  );
}

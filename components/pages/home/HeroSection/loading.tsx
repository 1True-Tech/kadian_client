"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

export default function HeroSectionLoading() {
  return (
    <section className="w-full overflow-x-hidden relative isolate flex items-center justify-center h-screen max-h-[500px]">
      <Carousel className="w-full h-full">
        <CarouselContent className="size-full">
          <CarouselItem className="max-w-full h-full relative overflow-visible isolate">
            <div className="size-full relative overflow-hidden">
              <Skeleton className="size-full absolute inset-0" />
              <div className="w-full flex flex-col justify-end gap-4 z-10 py-5 px-4 sm:px-8 md:px-4 lg:px-12 absolute inset-0">
                <Skeleton className="h-10 w-3/4 max-w-sm" />
                <Skeleton className="h-6 w-1/2 max-w-xs" />
                <Skeleton className="h-10 w-32 mt-2" />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
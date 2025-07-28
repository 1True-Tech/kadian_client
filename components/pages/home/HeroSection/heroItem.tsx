"use client";
import { Button } from "@/components/ui/button";
import {
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { getImageColors } from "@/lib/utils/colorsProcessors/colorsFromImage";
import { ImageColors } from "@/lib/utils/colorsProcessors/types";
import { ShoppingBagIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";

type Props = {
  image: string;
};

export default function HeroItem({ image }: Props) {
  const { theme } = useTheme();
  const [imageColors, setImageColors] = useState<ImageColors>({
    bgColor: "#000000",
    primaryColor: "#000000",
    secondaryColor: "#000000",
  });

  useEffect(() => {
    async function fetchImageColors() {
      const colors = await getImageColors(image);
      setImageColors(colors);
    }
    fetchImageColors();
  }, [image]);

  // console.log(i)
  return (
    <CarouselItem
      className="max-w-[95%] !pl-5 h-full relative overflow-visible isolate"
      style={{
        color: generateAccessibleColorPair({
          primary: imageColors.bgColor,
        }).text,
      }}
    >
      <div className="size-full relative overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={"image-1" + image}
          width={1920}
          height={1080}
          className="size-full object-cover object-center absolute inset-0 -z-10"
        />

        {/* content */}

        <div
          className={cn(
            "w-full flex flex-col gap-4 absolute bottom-0 z-10 py-5 px-4 sm:px-8 md:px-12",
            "bg-gradient-to-t from-black/70 via-90% via-black/30 to-transparent"
          )}
        >
          <h4 className="font-poppins font-bold text-2xl sm:text-3xl max-w-sm">
            Lorem ipsum dolor-sit amet consectetur.
          </h4>
          <p className="max-w-md text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, sequi
            nihil? Cumque in maxime aut iure iste. Odio, fugiat amet.
          </p>
          <Button className="w-fit !bg-primary-foreground !text-primary dark:!bg-foreground dark:!text-background h-fit rounded-full !pr-1 !py-1">
            Shop Now{" "}
            <span className="size-10 border-3 p-2 flex items-center justify-center border-primary dark:border-background bg-transparent rounded-full">
              <ShoppingBagIcon className="size-full" />
            </span>
          </Button>

          <div className="w-full flex items-center justify-start gap-4 relative">
           <CarouselPrevious className="!relative !bg-primary-foreground !text-primary dark:!bg-foreground dark:!text-background !top-0 !left-0 !translate-0"/>
            <CarouselNext className="!relative !bg-primary-foreground !text-primary dark:!bg-foreground dark:!text-background !top-0 !left-0 !translate-0"/>
            
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}

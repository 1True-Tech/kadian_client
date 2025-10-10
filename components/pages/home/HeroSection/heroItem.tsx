"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { SpecialOfferReady } from "@/types/specialoffer";
import { CalendarIcon, ShoppingBagIcon, TagIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: SpecialOfferReady;
  id: number;
};

function formatDaysLeft(endDate?: string) {
  if (!endDate) return "Ongoing";
  const now = new Date();
  const end = new Date(endDate);
  const diff = Math.ceil(
    (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff <= 0) return "Ended";
  return `${diff} day${diff > 1 ? "s" : ""} left`;
}

export default function HeroItem({ data, id }: Props) {
  const { currentIndex } = useCarousel();
  const isCurrent = currentIndex === id;

  // choose first product image or fallback swatch
  const firstProduct = data.products[0]?.product;
  const heroImage =
    firstProduct?.mainImage?.src ||
    firstProduct?.gallery[0]?.src ||
    createColorSwatchDataUrl("#c49e45", 500, 0, data.title, "#111111");

  const altText =
    firstProduct?.mainImage?.alt || firstProduct?.gallery[0]?.alt || data.title;

  // link to sale page for the offer
  const saleLink = `/sale/${data.slug}`;

  return (
    <CarouselItem className="max-w-full lg:w-md md:max-w-[calc(50%)] only:!max-w-full !px-0 h-full relative overflow-visible isolate !text-white">
      <div className="size-full relative overflow-hidden">
        <Image
          src={heroImage}
          loading="lazy"
          alt={altText}
          width={1920}
          height={1080}
          className="size-full object-cover object-center absolute inset-0 -z-10"
        />

        {/* category icon top-right */}
        {data.category && (
          <div className="absolute top-4 right-4 z-20">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-xs bg-black/70 text-white border-none"
            >
              {data.category === "flash_sale" && (
                <ZapIcon className="size-3.5" />
              )}
              {data.category === "discount" && <TagIcon className="size-3.5" />}
              {data.category}
            </Badge>
          </div>
        )}

        {/* content overlay */}
        <div
          className={cn(
            "w-full flex flex-col justify-end gap-4 z-10 py-5 px-4 sm:px-8 md:px-4 lg:px-12",
            "absolute inset-0 bg-gradient-to-t from-black/60 via-90% via-transparent to-transparent"
          )}
        >
          <h4 className="font-poppins font-bold text-2xl sm:text-3xl max-w-sm">
            {data.title}
          </h4>
          {data.description && (
            <p className="max-w-md text-sm">{data.description}</p>
          )}

          {/* extra info with badges */}
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            {data.end_date && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-black/60 text-white border-none"
              >
                <CalendarIcon className="size-3.5" />
                {formatDaysLeft(data.end_date)}
              </Badge>
            )}
            {data.minPurchase ? (
              <Badge
                variant="outline"
                className="bg-black/60 text-white border-none"
              >
                Min purchase: ${data.minPurchase}
              </Badge>
            ) : null}
            {data.maxDiscount ? (
              <Badge
                variant="outline"
                className="bg-primary text-primary-foreground"
              >
                Max discount: ${data.maxDiscount}
              </Badge>
            ) : null}
          </div>

          <Link href={saleLink}>
            <Button className="w-fit !bg-primary-foreground !text-primary dark:!bg-foreground dark:!text-background h-fit rounded-full !pr-1 !py-1">
              Shop Sale{" "}
              <span className="size-10 border-3 p-2 flex items-center justify-center border-primary dark:border-background bg-transparent rounded-full">
                <ShoppingBagIcon className="size-full" />
              </span>
            </Button>
          </Link>

          <div
            className={cn(
              "w-full flex items-center justify-start gap-4 relative",
              {
                "opacity-0 pointer-events-none": !isCurrent,
                "opacity-100 pointer-events-auto": isCurrent,
              }
            )}
          >
            <CarouselPrevious className="!relative data-[usable=false]:hidden !bg-primary-foreground !text-primary dark:!bg-foreground dark:!text-background !top-0 !left-0 !translate-0" />
            <CarouselNext className="!relative data-[usable=false]:hidden !bg-primary-foreground !text-primary dark:!bg-foreground dark:!text-background !top-0 !left-0 !translate-0" />
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}

// app/special-offers/page.tsx
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

import { lBPtComponents } from "@/components/feautures/PortableText";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { getShade } from "@/lib/utils/colorsProcessors/colorProcessing";
import { SpecialOfferReady } from "@/types/specialoffer";
import { ArrowRightCircle } from "lucide-react";
import { CSSProperties } from "react";
import { processSpecialOffers } from "@/lib/controllers/processHomepage/processHeroContent";
import SpecialOfferProductCard from "@/components/product/specialOfferProductCard";

export const metadata: Metadata = {
  title: "Special Offers | Kadian Fashion",
  description:
    "Explore limited-time special offers and discounts on selected products. Shop exclusive deals with premium savings.",
};

export default async function SpecialOffersPage() {
  const specialOffers = (await processSpecialOffers({
    type: "all",
  })) as SpecialOfferReady[] | null;

  if (!specialOffers?.length) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-3xl font-bold">No Special Offers</h1>
        <p className="text-muted-foreground mt-2">
          Check back later for upcoming deals.
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-20 py-16 sm:px-container">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-cinzel font-semibold tracking-wide uppercase">
          Special Offers
        </h1>
        <p className="text-muted-foreground font-light text-sm sm:text-base">
          Limited-time promotions, premium discounts, and exclusive deals
          tailored for you.
        </p>
      </header>

      <div className="flex flex-col gap-16">
        {specialOffers.map((offer) => {
          const { primary, text } = generateAccessibleColorPair({
            primary: offer.highlightColor?.hex,
          });
          const colorShade95 = getShade(primary, 95);
          const colorShade25 = getShade(primary, 25);
          const sectionBgImage = offer.displayImages?.[0]?.src;

          return (
            <section
              key={offer._id}
              className="relative isolate w-full flex flex-col gap-10 items-center p-container py-16 sm:rounded-3xl border-t border-b sm:border-r sm:border-l border-[var(--highlight-bg-color)] bg-card shadow-sm"
              style={
                {
                  "--highlight-bg-color": primary,
                  "--highlight-bg-color-95": colorShade95,
                  "--highlight-bg-color-25": colorShade25,
                  "--highlight-fore-color": text,
                } as CSSProperties
              }
            >
              {sectionBgImage && (
                <Image
                  src={sectionBgImage}
                  alt={offer.title}
                  width={1200}
                  height={800}
                  loading="lazy"
                  quality={70}
                  className="absolute inset-0 w-full -z-10 h-full object-cover object-center opacity-5 pointer-events-none rounded-3xl"
                />
              )}

              <div className="relative flex flex-col gap-4 text-center max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl text-[var(--highlight-bg-color-25)] font-cinzel font-semibold tracking-wide uppercase">
                  {offer.title}
                </h2>
                {offer.description && (
                  <p className="text-sm text-muted-foreground font-poppins font-light">
                    {offer.description}
                  </p>
                )}
                {offer.terms?.length > 0 && (
                  <div className="text-sm text-muted-foreground font-poppins font-light">
                    <PortableText
                      value={offer.terms.slice(0, 1)}
                      components={lBPtComponents(
                        "text-center max-w-xl mx-auto"
                      )}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {offer.products.map((p) => {
                  const firstVariant = p.product.variants[0];
                  const firstImage = p.product.mainImage;
                  if (!firstImage?.src || !firstVariant) return null;

                  return (
                    <SpecialOfferProductCard
                      key={firstVariant.sku}
                      name={p.product.name}
                      price={firstVariant.price}
                      discount={
                        offer.maxDiscount
                          ? { type: "Max", value: offer.maxDiscount }
                          : undefined
                      }
                      image={firstImage}
                      slug={p.product.slug}
                      productData={p.product}
                      variantData={firstVariant}
                    />
                  );
                })}
              </div>

              <Button
                asChild
                variant="default"
                className={cn(
                  "fluid_btn !mx-auto mt-5 !bg-transparent !text-[var(--highlight-fore-color)] border-2 relative isolate !border-[var(--highlight-bg-color)] !h-fit !py-2 !px-4 !rounded-xl !overflow-hidden",
                  "before:w-0 before:h-full before:absolute before:left-0 before:inset-0",
                  "before:duration-300 before:bg-[var(--highlight-bg-color-95)] before:backdrop-blur-3xl before:-z-1"
                )}
              >
                <Link href={`/sale/${offer.slug}`}>
                  See Offer
                  <ArrowRightCircle className="hidden_icon size-5 [--w:1.25rem]" />
                </Link>
              </Button>
            </section>
          );
        })}
      </div>
    </main>
  );
}

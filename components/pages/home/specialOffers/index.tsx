import { lBPtComponents } from "@/components/feautures/PortableText";
import ProductGrid from "@/components/feautures/ProductCard/preview";
import { Button } from "@/components/ui/button";
import { processSpecialOffersHome } from "@/lib/controllers/processHomepage/ProcessSpecialOffer";
import { cn } from "@/lib/utils";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { getShade } from "@/lib/utils/colorsProcessors/colorProcessing";
import { ReadyImage } from "@/types/home";
import { ArrowRightCircle } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { CSSProperties } from "react";

export default async function SpecialOffersSection() {
  const specialOffers = await processSpecialOffersHome();

  return (
    <div className="flex flex-col gap-10 py-sections sm:px-container">
      {specialOffers.map((offer) => {
        const hasProducts = offer.products.length > 0;
        const {primary,text} = generateAccessibleColorPair({primary:offer.highlightColor?.hex})
        const colorShade95 = getShade(primary, 95)
        const colorShade25 = getShade(primary, 25)
        return (
          <section
            key={offer.slug}
            className="relative isolate w-full flex flex-col gap-10 items-center p-container py-16 sm:rounded-3xl border-t border-b sm:border-r sm:border-l border-[var(--highlight-bg-color)] bg-card shadow-sm"
            style={{
              '--highlight-bg-color': primary,
              '--highlight-bg-color-95': colorShade95,
              '--highlight-bg-color-25': colorShade25,
              '--highlight-fore-color': text,
            } as CSSProperties}
          >
            {/* Background Display Image (Optional) */}
            {(offer.displayImages as ReadyImage)?.src && (
              <Image
                src={(offer.displayImages as ReadyImage).src}
                alt={(offer.displayImages as ReadyImage).alt || ""}
                width={300}
                height={500}
                quality={75}
                className="absolute inset-0 w-full -z-10 h-full object-cover object-center opacity-5 pointer-events-none rounded-3xl"
              />
            )}

            {/* Header Block */}
            <div className="relative flex flex-col gap-4 text-center max-w-3xl mx-auto">
              <h3
                className="text-3xl sm:text-4xl text-[var(--highlight-bg-color-25)] font-cinzel font-semibold tracking-wide uppercase"
              >
                {offer.title}
              </h3>

              <div className="text-sm text-muted-foreground font-poppins font-light">
                <PortableText
                  value={(offer.terms || [])?.slice(0, 1)}
                  components={lBPtComponents("text-center max-w-xl mx-auto")}
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="w-full relative">
              <ProductGrid
                loading={!hasProducts}
                products={offer.products.map((p) => ({
                  image: p.product.image as ReadyImage,
                  price: p.product.price,
                  name: p.product.name,
                  slug: p.product.slug,
                  discount: {
                    type: p.discountType,
                    value: p.discountValue
                  }
                }))}
              />
            </div>
            <Button
              variant={"default"}
              className={cn(
                "fluid_btn !mx-auto mt-5 !bg-transparent !text-[var(--highlight-fore-color)] border-2 relative isolate !border-[var(--highlight-bg-color)] !h-fit !py-2 !px-4 !rounded-xl !overflow-hidden",
                "before:w-0 before:h-full before:absolute before:left-0 before:inset-0",
                "before:duration-300 before:bg-[var(--highlight-bg-color-95)] before:backdrop-blur-3xl before:-z-1"
              )}
            >
              See Offer
              <ArrowRightCircle className="hidden_icon size-5 [--w:1.25rem]" />
            </Button>
          </section>
        );
      })}
    </div>
  );
}

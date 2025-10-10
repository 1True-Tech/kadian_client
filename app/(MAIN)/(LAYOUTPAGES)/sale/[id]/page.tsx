// app/special-offers/[id]/page.tsx
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

import { lBPtComponents } from "@/components/feautures/PortableText";
import SpecialOfferProductCard from "@/components/product/specialOfferProductCard";
import { Button } from "@/components/ui/button";
import { processSpecialOffers } from "@/lib/controllers/processHomepage/processHeroContent";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { getShade } from "@/lib/utils/colorsProcessors/colorProcessing";
import { ReadyImage } from "@/types/home";
import { ArrowLeft, ArrowRightCircle } from "lucide-react";
import { CSSProperties } from "react";
import { SpecialOfferReady } from "@/types/specialoffer";
import { ParamsProps } from "@/types/structures";
import PagesLayout from "@/components/layout/PagesLayout";

type SpecialOfferPageProps = ParamsProps<{ id: string }>;

export async function generateMetadata({
  params,
}: SpecialOfferPageProps): Promise<Metadata> {
  const { id } = await params;

  const offer = (await processSpecialOffers({
    id,
    type: "single",
  })) as SpecialOfferReady;
  console.log(offer);

  if (!offer) return { title: "Special Offer | Kadian Fashion" };

  return {
    title: `${offer.title} | Special Offer`,
    description:
      offer.description || "Exclusive special offer on selected products.",
  };
}

export default async function SpecialOfferItemPage({
  params,
}: SpecialOfferPageProps) {
  const { id } = await params;
  const offer = (await processSpecialOffers({
    id,
    type: "single",
  })) as SpecialOfferReady;

  if (!offer) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-3xl font-bold">Special Offer Not Found</h1>
        <p className="text-muted-foreground mt-2">
          This offer may have expired or does not exist.
        </p>
        <Link href="/special-offers">
          <Button className="mt-4">Back to Offers</Button>
        </Link>
      </div>
    );
  }

  const { primary, text } = generateAccessibleColorPair({
    primary: offer.highlightColor?.hex,
  });
  const colorShade95 = getShade(primary, 95);
  const colorShade25 = getShade(primary, 25);
  const sectionBgImage = (offer.displayImages?.[0] as ReadyImage)?.src;

  return (
    <PagesLayout
      showBreadcrumbs
      breadcrumbItems={[
        {
          label: "Sales",
          href: "/sale",
        },
        {
          label: offer.title,
        },
      ]}
    >
      <main className="flex flex-col gap-16 py-16 sm:px-container">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/special-offers"
            className="flex items-center gap-2 text-primary font-medium"
          >
            <ArrowLeft className="size-5" /> Back to all Offers
          </Link>
        </div>

        {/* Offer Header */}
        <header
          className="relative flex flex-col gap-4 text-center max-w-4xl mx-auto p-6 sm:rounded-3xl border border-[var(--highlight-bg-color)] bg-card shadow"
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
              quality={80}
              loading="lazy"
              className="absolute inset-0 w-full -z-10 h-full object-cover object-center opacity-10 pointer-events-none rounded-3xl"
            />
          )}
          <h1 className="text-3xl sm:text-4xl font-cinzel font-semibold tracking-wide uppercase">
            {offer.title}
          </h1>
          {offer.description && (
            <p className="text-muted-foreground font-poppins font-light">
              {offer.description}
            </p>
          )}
          {offer?.terms?.length > 0 && (
            <div className="text-sm text-muted-foreground font-poppins font-light">
              <PortableText
                value={offer.terms.slice(0, 1)}
                components={lBPtComponents("text-center max-w-2xl mx-auto")}
              />
            </div>
          )}
        </header>

        {/* Products Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {offer.products.map((p) => {
            const firstVariant = p.product.variants[0];
            const firstImage = p.product.mainImage;
            if (!firstImage) return null;
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
        </section>

        {/* See Other Offers Button */}
        <div className="text-center mt-8">
          <Link href="/sale">
            <Button asChild variant="default">
              <span className="flex items-center gap-2">
                Back to all Offers
                <ArrowRightCircle className="size-5" />
              </span>
            </Button>
          </Link>
        </div>
      </main>
    </PagesLayout>
  );
}

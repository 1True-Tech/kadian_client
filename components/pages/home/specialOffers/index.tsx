import { lBPtComponents } from "@/components/feautures/PortableText";
import ProductGrid from "@/components/feautures/ProductCard/preview";
import { processSpecialOffersHome } from "@/lib/controllers/processHomepage/ProcessSpecialOffer";
import { ReadyImage } from "@/types/home";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default async function SpecialOffersSection() {
  const specialOffers = await processSpecialOffersHome();

  return (
    <div className="flex flex-col gap-5 py-sections px-container">
      {specialOffers.map((offer) => {
        const hasProducts = offer.products.length > 0;

        return (
          <section
            key={offer.slug}
            className="relative w-full p-container py-16 rounded-3xl border border-border bg-card shadow-sm"
            style={{
              borderColor: offer.highlightColor?.hex ?? undefined,
            }}
          >
            {/* Background Display Image (Optional) */}
            {(offer.displayImages as ReadyImage)?.src && (
              <Image
                src={(offer.displayImages as ReadyImage).src}
                alt={(offer.displayImages as ReadyImage).alt || ""}
                width={300}
                height={500}
                quality={75}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-5 pointer-events-none rounded-3xl"
              />
            )}

            {/* Header Block */}
            <div className="relative z-10 flex flex-col gap-4 text-center max-w-3xl mx-auto">
              <h3
                className="text-3xl sm:text-4xl font-cinzel font-semibold tracking-wide uppercase"
                style={{
                  color: offer.highlightColor?.hex ?? "var(--accent)",
                }}
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
            <div className="relative z-10 mt-10">
              <ProductGrid
                loading={!hasProducts}
                products={offer.products.map((p) => ({
                  image: p.product.image as ReadyImage,
                  price: p.product.price,
                  name: p.product.name,
                  slug: p.product.slug,
                }))}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

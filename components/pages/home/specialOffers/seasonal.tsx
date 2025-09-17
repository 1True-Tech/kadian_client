import AddToCartButton from "@/components/product/AddToCartButton";
import WishlistButton from "@/components/product/WishlistButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { processSpecialOffersHome } from "@/lib/controllers/processHomepage/ProcessSpecialOffer";
import { PortableText } from "next-sanity";
import Image from "next/image";

export const SeasonalProducts = async () => {
  const data = await processSpecialOffersHome();

  return data
    .filter((d) => d.category !== "featured")
    .map((offer, idx) => (
      <section
        key={idx}
        className="py-16 even:bg-secondary/30 odd:bg-primary/10"
      >
        <div className=" px-container">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="heading-section  text-4xl font-cinzel mb-4 bg-clip-text bg-conic-30 bg-foreground via-accent via-50% from-foreground to-foreground text-transparent">
              {offer.title}
            </h2>
            {offer.terms && (
              <p className="text-elegant max-w-2xl mx-auto">
                <PortableText value={offer.terms} />
              </p>
            )}
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {offer.products.map((product, index) => {
              const discountedPrice =
                product.discountType === "fixed"
                  ? product.product.basePrice - (product.discountValue || 0)
                  : product.discountType === "percentage"
                    ? product.product.basePrice -
                      product.product.basePrice *
                        ((product.discountValue || 0) / 100)
                    : null;
              const originalPrice = discountedPrice
                ? product.product.basePrice
                : null;
              return (
                <Card
                  key={index}
                  className="card-product overflow-hidden group animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <span className="w-full h-45 sm:h-65 md:h-80 block">
                        {product.product.mainImage?.src ? (
                          <Image
                            width={720}
                            height={480}
                            src={product.product.mainImage?.src}
                            alt={product.product.name}
                            className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted animate-pulse" />
                        )}
                      </span>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {offer.category === "seasonal_sale" ? (
                          <Badge variant="destructive">Sale</Badge>
                        ) : offer.category === "bundle" ? (
                          <Badge variant="outline">Bundle</Badge>
                        ) : offer.category === "new_customer" ? (
                          <Badge variant="secondary">New</Badge>
                        ) : offer.category === "clearance" ? (
                          <Badge variant="default" className="bg-orange-300">
                            Clearance
                          </Badge>
                        ) : offer.category === "flash_sale" ? (
                          <Badge variant="default" className="bg-blue-700">
                            flash sale
                          </Badge>
                        ) : null}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute size-full top-0 left-0 items-end pt-3 pr-3 justify-start pointer-events-none flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <WishlistButton productId={`${product.product._id}`} />
                        <AddToCartButton
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
                          quantityChangerPositionClassName="w-11/12 absolute pointer-events-auto bottom-2 left-1/2 -translate-x-1/2"
                          product={product.product}
                          productVariant={product.product.variants[0]}
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        {product.product.category.name}
                      </p>
                      <h3 className="font-medium mb-2">
                        {product.product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-rose-gold">
                          {originalPrice}
                        </span>
                        {discountedPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button className="btn-hero">View All Products</Button>
          </div>
        </div>
      </section>
    ));
};

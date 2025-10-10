import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { processSpecialOffersHome } from "@/lib/controllers/processHomepage/ProcessSpecialOffer";
import { PortableText } from "next-sanity";
import Image from "next/image";
import AddToCartButton from "../product/AddToCartButton";
import WishlistButton from "../product/WishlistButton";
import FeaturedProductsFallback from "./FeaturedProductsFallback";

const FeaturedProducts = async () => {
  try {
    const data = await processSpecialOffersHome();
    const offer = data?.find((offer) => offer.category === "featured");
    if (!offer) return null;
    const dataProducts = offer.products;
    if (!dataProducts || dataProducts.length <= 0) return null;

    return (
      <section className="py-16 bg-secondary/30">
        <div className=" px-container">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="heading-section  text-4xl font-cinzel mb-4 bg-clip-text bg-conic-30 bg-foreground via-accent via-50% from-foreground to-foreground text-transparent">
              Featured Collection
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
                            loading="lazy"
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
                        {product.featured && (
                          <Badge className="!bg-white !text-black">
                            Featured
                          </Badge>
                        )}
                        {/* {product.isSale && (
                      <Badge variant="destructive">Sale</Badge>
                    )} */}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <WishlistButton productId={`${product.product._id}`} />
                        <AddToCartButton
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
    );
  } catch (error) {
    console.error("Error loading featured products:", error);
    return <FeaturedProductsFallback />;
  }
};

export default FeaturedProducts;

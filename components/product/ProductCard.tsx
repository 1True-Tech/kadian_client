"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ProductReady, ProductVariant } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: ProductReady;
  className?: string;
  style?: React.CSSProperties;
  display?: "grid" | "list";
}

const ProductCard = ({
  product,
  className = "",
  style,
  display = "grid",
}: ProductCardProps) => {
  const primaryImage = product.mainImage?.src ?? product.gallery?.[0]?.src;
  const primaryAlt =
    product.mainImage?.alt ?? product.gallery?.[0]?.alt ?? product.name;

  if (display === "list") {
    return (
      <Card
        className={`overflow-hidden group rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-row items-center gap-0 ${className}`}
        style={style}
      >
        <CardContent className="p-0 w-full grid grid-cols-[8rem_1fr] items-stretch">
          <div className="relative w-full h-32 min-h-full overflow-hidden rounded-l-lg flex flex-col">
            <Link href={`/shop/${product.slug}`} className="size-full">
              {primaryImage ? (
                <Image
                  src={primaryImage}
                  alt={primaryAlt}
                  width={128}
                  loading="lazy"
                  height={128}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground/50">No Image</span>
                </div>
              )}
            </Link>
            <div className="absolute top-2 right-2 flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <WishlistButton
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm"
                productId={product._id}
              />
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-1 min-w-0">
            <Link href={`/shop/${product.slug}`}>
              <h3 className="font-medium text-foreground text-base sm:text-lg truncate group-hover:text-accent transition-colors duration-200">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground truncate">
              {product.category?.name}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold text-foreground text-base sm:text-lg">
                ${product.variants[0]?.price.toFixed(2)}
              </span>
              {product.variants[0]?.price < product.basePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.basePrice.toFixed(2)}
                </span>
              )}
            </div>
            <AddToCartButton
              product={product}
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm"
              quantityChangerPositionClassName="w-fit"
              productVariant={product.firstVariant as ProductVariant}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default grid style
  return (
    <Card
      className={`overflow-hidden group rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      style={style}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/shop/${product.slug}`}>
            {primaryImage ? (
              <Image
                src={primaryImage}
                alt={primaryAlt}
                width={720}
                height={720}
                className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-72 sm:h-80 flex items-center justify-center bg-muted">
                <span className="text-muted-foreground/50">No Image</span>
              </div>
            )}
          </Link>

          {/* Top-right quick actions (always icon buttons) */}
          <div className="absolute size-full top-0 left-0  flex flex-col items-end p-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <WishlistButton
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm"
              productId={product._id}
            />
            {/* Only show add icon if product is not in cart */}
            <AddToCartButton
              product={product}
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm"
              quantityChangerPositionClassName="absolute bottom-2 left-1/2 -translate-x-1/2"
              productVariant={product.firstVariant as ProductVariant}
            />
          </div>
        </div>

        <div className="p-4 flex flex-col gap-1">
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-medium text-foreground text-base sm:text-lg truncate group-hover:text-accent transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground">
            {product.category?.name}
          </p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-foreground text-base sm:text-lg">
                ${product.variants[0]?.price.toFixed(2)}
              </span>
              {product.variants[0]?.price < product.basePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.basePrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

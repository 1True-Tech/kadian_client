"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductReady } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "./WishlistButton";

interface ProductCardProps {
  product: ProductReady;
  onAddToCart?: (productId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const ProductCard = ({
  product,
  onAddToCart,
  className = "",
  style,
}: ProductCardProps) => {
  const primaryImage =
    product.mainImage?.src ?? product.gallery?.[0]?.src ?? "/images/placeholder.jpg";
  const primaryAlt =
    product.mainImage?.alt ?? product.gallery?.[0]?.alt ?? product.name;

  return (
    <Card className={`card-product overflow-hidden group ${className}`} style={style}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/product/${product.slug}`}>
            <Image
              width={720}
              height={480}
              src={primaryImage}
              alt={primaryAlt}
              className="w-full h-40 min-[498px]:h-50 sm:h-55 md:h-60 ld:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          {/* <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product?.isNew && (
              <Badge variant="default" className="!bg-accent !text-accent-foreground">
                New
              </Badge>
            )}
            {product?.isOnSale && <Badge variant="destructive">Sale</Badge>}
          </div> */}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <WishlistButton
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
              productId={product._id}
            />
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product._id);
              }}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-medium text-foreground group-hover:text-accent transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground mt-1">
            {product.category?.name}
          </p>

          <div className="flex flex-wrap items-center justify-between mt-3">
            <div className="flex items-center gap-2 basis-35 grow">
              <span className="font-semibold text-foreground">
                ${product.basePrice.toFixed(2)}
              </span>
              {product.variants[0]?.price &&
                product.variants[0]?.price < product.basePrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.basePrice.toFixed(2)}
                  </span>
              )}
            </div>

            {/* <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">★</span>
              <span className="text-sm text-muted-foreground">
                {product.rating ?? "4.5"} ({product.reviewCount ?? "120"})
              </span>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

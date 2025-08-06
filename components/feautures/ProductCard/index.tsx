import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import calculatePercentage from "@/lib/utils/percentage";
import { ProductCardData } from "@/types/product";
import Image from "next/image";

export interface ProductCardProps {
  product: ProductCardData;
  isInCart?: boolean;
  quantity?: number;
  onAdd?: () => void;
  onRemove?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export default function ProductCard({
  product,
  isInCart = false,
  quantity = 1,
  onAdd,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  const calculatedDiscount = (
    product.discount
      ? product.discount.type !== "percentage"
        ? product.discount.value
        : product.price-calculatePercentage({
          fromOriginal:product.price,
          value:product.discount.value,
          valueAs:"percentage"
        })
      : product.price
  ).toFixed(2);
  return (
    <div className="product-card relative flex flex-col gap-3 p-2 border border-muted/40 rounded-2xl bg-background shadow-sm transition">
      {/* Image */}
      <div className="aspect-square w-full isolate relative overflow-hidden rounded-lg bg-muted flex items-center justify-center">
        {product.discount && (
          <Badge className="absolute z-10 block bg-background text-foreground uppercase top-2 right-2 text-xs py-1 px-2 rounded-full">
            {product.discount.type === "percentage"
              ? `${product.discount.value}% off`
              : product.discount.type}
          </Badge>
        )}
        {product.image?.src ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={300}
            height={500}
            quality={75}
            className="object-cover product-card-image object-center w-full h-full transition duration-300 scale-100"
          />
        ) : (
          <div className="text-accent text-3xl italic opacity-40">No Image</div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <a
          href={`/shop/${product.slug}`}
          className="font-medium text-base sm:text-lg product-card-link transition line-clamp-1"
        >
          {product.name}
        </a>
        <span className="text-sm text-muted-foreground">
          ${calculatedDiscount}
          {product.discount?.type === "percentage" && (
            <sub>
              <s className="ml-1">{product.price}</s>
            </sub>
          )}
        </span>
      </div>

      {/* Cart Interaction */}
      <div className="mt-auto">
        {isInCart ? (
          <div className="flex items-center justify-between gap-3 border border-accent rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDecrement}
              className="px-3"
            >
              –
            </Button>
            <span className="text-sm font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onIncrement}
              className="px-3"
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            className="w-full bg-accent text-white !rounded-lg"
            onClick={onAdd}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}

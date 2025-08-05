import { Button } from "@/components/ui/button";
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
  return (
    <div className="group relative flex flex-col gap-3 p-3 border border-muted/40 rounded-2xl bg-background shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted flex items-center justify-center">
        {product.image?.src ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={300}
            height={500}
            quality={75}
            className="object-cover object-center w-full h-full transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-accent text-3xl italic opacity-40">No Image</div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <a
          href={`/shop/${product.slug}`}
          className="font-medium text-base sm:text-lg hover:text-primary transition line-clamp-1"
        >
          {product.name}
        </a>
        <span className="text-sm text-muted-foreground">₦{product.price}</span>
      </div>

      {/* Cart Interaction */}
      <div className="mt-auto">
        {isInCart ? (
          <div className="flex items-center justify-between gap-3 border border-accent rounded-lg p-1">
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
          <Button className="w-full bg-accent text-white" onClick={onAdd}>
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}

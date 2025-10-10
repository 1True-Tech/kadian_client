"use client";
import Image from "next/image";
import Link from "next/link";
import { ReadyImage } from "@/types/home";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/hooks/useCart";
import { useUserStore } from "@/store/user";
import { ProductReady, ProductVariant } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
  ShoppingBagIcon,
  Loader2Icon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SpecialOfferProductCardProps = {
  name: string;
  price: number;
  discount?: { type: string; value: number };
  image: ReadyImage;
  slug: string;
  productData: ProductReady;
  variantData: ProductVariant;
};

export default function SpecialOfferProductCard({
  name,
  price,
  discount,
  image,
  slug,
  productData,
  variantData,
}: SpecialOfferProductCardProps) {
  const { user } = useUserStore();
  const { addToCart, removeFromCart, updateQuantity, updateStatus, addStatus } =
    useCart();

  const cartItem = user?.cart.find(
    (c) => c.productId === productData._id && c.variantSku === variantData.sku
  );

  async function handleAdd() {
    if (!user) return;
    await addToCart({
      productId: productData._id,
      variantSku: variantData.sku,
      price: variantData.price,
      quantity: 1,
    });
  }

  async function handleRemove() {
    if (!cartItem?._id) return;
    await removeFromCart(cartItem._id);
  }

  async function changeQuantity(action: "ADD" | "REMOVE") {
    if (!cartItem?._id) return;
    if (action === "REMOVE" && cartItem.quantity <= 1) {
      await handleRemove();
      return;
    }
    await updateQuantity(cartItem._id, action === "ADD" ? 1 : -1);
  }

  const AddIcon = addStatus === "loading" ? Loader2Icon : ShoppingBagIcon;

  return (
    <div className="group relative flex flex-col rounded-lg border border-border p-4 bg-card hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <Link
        href={`/shop/${slug}`}
        className="relative w-full h-48 mb-4 overflow-hidden rounded-md"
      >
        <Image
          src={image.src}
          loading="lazy"
          alt={image.alt || name}
          fill
          className="object-cover object-center transition-transform group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-1 mb-2">
        <h4 className="font-semibold text-sm truncate">{name}</h4>
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">${price.toFixed(2)}</span>
          {discount && (
            <Badge variant="secondary" className="text-xs">
              {discount.type} {discount.value}
            </Badge>
          )}
        </div>
      </div>

      {/* Add to Cart / Quantity Changer */}
      <div className="mt-auto">
        {!cartItem ? (
          <Button
            size="icon"
            variant="secondary"
            className="w-full rounded-full bg-black text-white hover:bg-gray-900 transition-colors"
            onClick={handleAdd}
            disabled={addStatus === "loading"}
          >
            <AddIcon
              className={cn(
                "h-4 w-4",
                addStatus === "loading" && "animate-spin"
              )}
            />
            Add to cart
          </Button>
        ) : (
          <div className="w-full flex items-center justify-between bg-primary/20 rounded-full shadow px-2 py-1">
            <Button
              size="icon"
              variant="ghost"
              className="p-0 text-gray-600 hover:bg-gray-100"
              onClick={() => changeQuantity("REMOVE")}
              disabled={updateStatus === "loading"}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>

            {updateStatus === "loading" ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              <span className="text-sm font-medium">{cartItem.quantity}</span>
            )}

            <Button
              size="icon"
              variant="ghost"
              className="p-0 text-gray-600 hover:bg-gray-100"
              onClick={() => changeQuantity("ADD")}
              disabled={updateStatus === "loading"}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

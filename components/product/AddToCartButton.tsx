"use client";

import { useCart } from "@/lib/hooks/useCart";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import { ProductReady, ProductVariant } from "@/types/product";
import {
  Loader2Icon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon
} from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
// import { toast } from "sonner";

interface AddToCartButtonProps extends ButtonProps {
  product: ProductReady;
  productVariant: ProductVariant;
  quantityChangerPositionClassName?: string;
}

export default function AddToCartButton({
  product,
  productVariant,
  quantityChangerPositionClassName,
  ...props
}: AddToCartButtonProps) {
  const { user } = useUserStore();
  const { addToCart, removeFromCart, updateQuantity, updateStatus, addStatus } = useCart();

  if (!user) return null;

  const cartItem = user.cart.find(
    (c) => c.productId === product._id && c.variantSku === productVariant.sku
  );

  async function handleAddToCart() {
    addToCart({
      price: productVariant.price,
      productId: product._id,
      quantity: 1,
      variantSku: productVariant.sku,
    });
  }

  async function handleRemoveFromCart() {
    if (!cartItem || !cartItem._id) return;
    removeFromCart(cartItem._id);
  }

  async function changeQuantity(action: "ADD" | "REMOVE") {
    console.log(cartItem)
    if (!cartItem || !cartItem?._id) return;

    if (action === "REMOVE" && cartItem.quantity <= 1) {
      await handleRemoveFromCart();
      return;
    }

    updateQuantity(cartItem._id, action === "ADD" ? 1 : -1);
  }
  const AddToCartIcon = addStatus === "loading" ? Loader2Icon : ShoppingBagIcon;

  // Render Add button if not in cart
  if (!cartItem) {
    return (
      <Button
        size="icon"
        variant="secondary"
        className="h-8 w-8 rounded-full bg-black text-white hover:bg-gray-900 transition-colors"
        onClick={handleAddToCart}
        disabled={status === "loading"}
        {...props}
      >
        <AddToCartIcon
          className={cn("h-4 w-4", status === "loading" && "animate-spin")}
        />
      </Button>
    );
  }

  // Render quantity changer if in cart
  return (
    <div
      className={cn(
        "flex items-center justify-between bg-white rounded-full shadow px-2 py-1 w-full sm:w-28",
        quantityChangerPositionClassName
      )}
    >
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
        <Loader2Icon className="size-4 animate-spin" />
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
  );
}

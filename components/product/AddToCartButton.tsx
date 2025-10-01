"use client";

import { useQuery } from "@/lib/server/client-hook";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import { ProductReady, ProductVariant } from "@/types/product";
import { MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { useEffect } from "react";
// import { toast } from "sonner";

interface AddToCartButtonProps extends ButtonProps {
  product: ProductReady;
  productVariant: ProductVariant;
  quantityChangerPositionClassName?: string;
  cartActionStatus?: {
    onAddStatusChange?: (status: "idle"|"loading"|"success"|"error", context?: any) => void;
    onRemoveStatusChange?: (status: "idle"|"loading"|"success"|"error", context?: any) => void;
    onUpdateStatusChange?: (status: "idle"|"loading"|"success"|"error", context?: any) => void;
  }
}

export default function AddToCartButton({
  product,
  productVariant,
  quantityChangerPositionClassName,
  cartActionStatus,
  ...props
}: AddToCartButtonProps) {
  const { user, actions } = useUserStore();
  const { run, status } = useQuery("updateCart");
  const removeFromCart = useQuery("deleteCartItem");
  const modQuantity = useQuery("updateCartItem");

  useEffect(() => {
    if (cartActionStatus?.onRemoveStatusChange) {
      cartActionStatus.onRemoveStatusChange(removeFromCart.status, { error: removeFromCart.error });
    }
    if (cartActionStatus?.onUpdateStatusChange) {
      cartActionStatus.onUpdateStatusChange(modQuantity.status, { error: modQuantity.error });
    }
    if (cartActionStatus?.onAddStatusChange) {
      cartActionStatus.onAddStatusChange(status, { error: undefined });
    }
  }, [removeFromCart.status, modQuantity.status, status, removeFromCart.error, modQuantity.error, cartActionStatus]);
  
  if (!user) return null;

  const cartItem = user.cart.find(
    (c) => c.productId === product._id && c.variantSku === productVariant.sku
  );

  async function handleAddToCart() {
    if (cartActionStatus?.onAddStatusChange) cartActionStatus.onAddStatusChange("loading");
    const added = await run({
      body: {
        updateData: [
          {
            price: productVariant.price,
            productId: product._id,
            quantity: 1,
            variantSku: productVariant.sku,
          },
        ],
      },
    });
    if (added?.data?.items && user) {
      actions.setUser({
        ...user,
        cart: [...user.cart, ...added.data.items],
      });
      if (cartActionStatus?.onAddStatusChange) cartActionStatus.onAddStatusChange("success");
    } else {
      if (cartActionStatus?.onAddStatusChange) cartActionStatus.onAddStatusChange("error");
    }
  }

  async function handleRemoveFromCart() {
    if (cartActionStatus?.onRemoveStatusChange) cartActionStatus.onRemoveStatusChange("loading");
    const cartItem = user?.cart.find(
      (i) => i.productId === product._id && i.variantSku === productVariant.sku
    );
    if (!cartItem) return;
    removeFromCart.run({
      params: {
        id: `${cartItem._id}`,
      },
    });
    if (user) {
      actions.setUser({
        ...user,
        cart: user.cart.filter((i) => i._id !== cartItem._id),
      });
      if (cartActionStatus?.onRemoveStatusChange) cartActionStatus.onRemoveStatusChange("success");
    } else {
      if (cartActionStatus?.onRemoveStatusChange) cartActionStatus.onRemoveStatusChange("error");
    }
  }

  async function changeQuantity(action: "ADD" | "REMOVE") {
    if (cartActionStatus?.onUpdateStatusChange) cartActionStatus.onUpdateStatusChange("loading");
    if (!cartItem) return;

    if (action === "REMOVE" && cartItem.quantity <= 1) {
      await handleRemoveFromCart();
      return;
    }

    const updated = await modQuantity.run({
      params: { id: cartItem._id || "" },
      body: { data: { increment: action === "ADD" ? 1 : -1 } },
    });

    if (updated?.data && user) {
      actions.setUser({
        ...user,
        cart: [
          ...user.cart.filter((i) => i._id !== cartItem._id),
          updated.data,
        ],
      });
      if (cartActionStatus?.onUpdateStatusChange) cartActionStatus.onUpdateStatusChange("success");
    } else {
      if (cartActionStatus?.onUpdateStatusChange) cartActionStatus.onUpdateStatusChange("error");
    }
  }

  // Render Add button if not in cart
  if (!cartItem) {
    return (
      <Button
        size="icon"
        variant="secondary"
        className="h-8 w-8 rounded-full bg-black text-white hover:bg-gray-900 transition-colors"
        onClick={handleAddToCart}
        {...props}
      >
        <ShoppingBagIcon className="h-4 w-4" />
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
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">{cartItem.quantity}</span>
      <Button
        size="icon"
        variant="ghost"
        className="p-0 text-gray-600 hover:bg-gray-100"
        onClick={() => changeQuantity("ADD")}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

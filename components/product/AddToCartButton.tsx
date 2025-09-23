"use client";
import { useQuery } from "@/lib/server/client-hook";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import { ProductReady, ProductVariant } from "@/types/product";
import { MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

export default function AddToCartButton({
  product,
  productVariant,
  quantityChangerPositionClassName,
  ...props
}: ButtonProps & { product: ProductReady;productVariant:ProductVariant; quantityChangerPositionClassName?:string }) {
  const { user, actions } = useUserStore();
  const { run } = useQuery("updateCart");
  const removeFromCart = useQuery("deleteCartItem");
  const modQuantity = useQuery("updateCartItem");

  if (!user) return null;
  async function handleAddToCart() {
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
    if (user) {
      actions.setUser({
        ...user,
        cart: [
          ...user.cart,
          ...(added?.data?.items || [])
        ],
      });
    }
  }
  async function handleRemoveFromCart() {
    const cartItem = user?.cart.find((i) => (i.productId === product._id&&i.variantSku === productVariant.sku))
    
    if(!cartItem) return
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
    }
  }
  async function changeStock(action: "ADD" | "REMOVE") {
    const item = user?.cart.find((i) => i.productId === product._id);
    if (item && item.quantity > 1) {
      const data = await modQuantity.run({
        params: {
          id: product._id,
        },
        body: {
          data: {
            increment: action === "ADD" ? 1 : -1,
          },
        },
      });

      if (data?.data) {
        if (user) {
          const item = data.data;
          actions.setUser({
            ...user,
            cart: [
              ...user.cart.filter((i) => i.productId !== item.productId),
              {
                ...item,
                quantity: item.quantity,
              },
            ],
          });
        }
      }
    }
    if (item && item.quantity <= 1) {
      handleRemoveFromCart()
    }
  }

  const item = user.cart.find((c) => c.productId === product._id);
  if (!item) {
    return (
      <Button
        size="icon"
        variant="secondary"
        className="h-8 w-8 !bg-black !text-white"
        {...props}
        onClick={handleAddToCart}
      >
        {props.children||<ShoppingBagIcon className="h-4 w-4" />}
      </Button>
    );
  }

  return (
    <div className={cn("w-full bg-white p-small rounded-full flex items-center justify-between", quantityChangerPositionClassName)}>
      <Button onClick={() => changeStock("REMOVE")}>
        <MinusIcon />
      </Button>
      <span>{item.quantity}</span>
      <Button onClick={() => changeStock("ADD")}>
        <PlusIcon />
      </Button>
    </div>
  );
}

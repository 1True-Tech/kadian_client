"use client";

import { useQuery } from "@/lib/server/client-hook";
import { useUserStore } from "@/store/user";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

export interface CartItem {
  _id?: string;
  productId: string;
  variantSku: string;
  price: number;
  quantity: number;
  addedAt?: Date;
  updatedAt?: Date;
}

export function useCart() {
  const { user, actions } = useUserStore();
  const {
    run: fetchCart,
    status: CartGetterStatus,
    error: CartGetterError,
    data: cartData,
  } = useQuery("getCart");
  const {
    run: updateCart,
    status: addStatus,
    error: addError,
  } = useQuery("updateCart");
  const {
    run: deleteCartItem,
    status: removeStatus,
    error: removeError,
  } = useQuery("deleteCartItem");
  const {
    run: updateCartItem,
    status: updateStatus,
    error: updateError,
  } = useQuery("updateCartItem");

  // Toast notifications watcher
  useEffect(() => {
    // Get Cart
    if (CartGetterStatus === "loading") {
      toast.loading("Fetching cart...", { id: "cart-get" });
    }
    if (CartGetterStatus === "success") {
      toast.success("Cart fetched successfully", { id: "cart-get" });
    }
    if (CartGetterStatus === "error") {
      toast.error(CartGetterError || "Failed to fetch cart", {
        id: "cart-get",
      });
    }

    // Add
    if (addStatus === "loading") {
      toast.loading("Adding item to cart...", { id: "cart-add" });
    }
    if (addStatus === "success") {
      toast.success("Item added to cart", { id: "cart-add" });
    }
    if (addStatus === "error") {
      toast.error(addError || "Failed to add to cart", { id: "cart-add" });
    }

    // Remove
    if (removeStatus === "loading") {
      toast.loading("Removing item...", { id: "cart-remove" });
    }
    if (removeStatus === "success") {
      toast.success("Item removed from cart", { id: "cart-remove" });
    }
    if (removeStatus === "error") {
      toast.error(removeError || "Failed to remove item", {
        id: "cart-remove",
      });
    }

    // Update
    if (updateStatus === "loading") {
      toast.loading("Updating item...", { id: "cart-update" });
    }
    if (updateStatus === "success") {
      toast.success("Item updated", { id: "cart-update" });
    }
    if (updateStatus === "error") {
      toast.error(updateError || "Failed to update item", {
        id: "cart-update",
      });
    }
  }, [
    CartGetterStatus,
    CartGetterError,
    addStatus,
    addError,
    removeStatus,
    removeError,
    updateStatus,
    updateError,
  ]);
  const addToCart = useCallback(
    async (item: Omit<CartItem, "addedAt" | "updatedAt">) => {
      const response = await updateCart({
        body: {
          updateData: [
            {
              price: item.price,
              productId: item.productId,
              quantity: 1,
              variantSku: item.variantSku,
            },
          ],
        },
      });
      if (response?.data && user) {
        actions.setUser({
          ...user,
          cart: [...user.cart, ...(response.data?.items || [])],
        });
      }
      return { response, status: addStatus, error: addError };
    },
    [updateCart, user, actions, addStatus, addError]
  );

  const getCart = useCallback(async () => {
    const response = await fetchCart();

    if (user && response?.data) {
      actions.setUser({
        ...user,
        cart: response.data.items.map((i) => ({
          price: i.price,
          productId: i.productId,
          quantity: i.quantity,
          variantSku: i.variantSku,
          _id: i.id,
          addedAt: i.addedAt,
          updatedAt: i.updatedAt,
        })),
      });
    }
  }, [actions, fetchCart, user]);
  const removeFromCart = useCallback(
    async (itemId: string) => {
      const response = await deleteCartItem({
        params: {
          id: itemId,
        },
      });
      if (user) {
        const filtered = user.cart.filter((item) => item._id !== itemId);
        actions.setUser({
          ...user,
          cart: [...filtered],
        });
      }
      return { response, status: removeStatus, error: removeError };
    },
    [deleteCartItem, user, actions, removeStatus, removeError]
  );
  const updateQuantity = useCallback(
    async (itemId: string, increment: number) => {
      const cartItem = user?.cart.find((item) => item._id === itemId);
      if (!cartItem) return null;
      // If decrementing to zero or below, remove the item
      if (cartItem.quantity + increment <= 0) {
        return removeFromCart(itemId);
      }
      const response = await updateCartItem({
        params: {
          id: itemId,
        },
        body: {
          data: {
            increment,
          },
        },
      });
      if (response?.data && user) {
        const updatedItem = response.data;
        actions.setUser({
          ...user,
          cart: [...updatedItem],
        });
      }
      return { response, status: updateStatus, error: updateError };
    },
    [updateCartItem, user, actions, removeFromCart, updateStatus, updateError]
  );

  const clearCart = useCallback(
    async ({
      itemsOnOrder,
    }: {
      itemsOnOrder: { pid: string; vsku: string }[];
    }) => {
      if (!user) return;

      const cartItems = user.cart.filter((item) =>
        itemsOnOrder.some(
          (orderItem) =>
            item.productId === orderItem.pid &&
            item.variantSku === orderItem.vsku
        )
      );
      // Remove all items one by one
      const promises = cartItems.map((item) =>
        deleteCartItem({
          params: {
            id: item._id as string,
          },
        })
      );

      await Promise.all(promises);

      actions.setUser({
        ...user,
        cart: [],
      });
    },
    [user, actions, deleteCartItem]
  );

  return {
    getCart,
    cartData,
    CartGetterStatus,
    CartGetterError,
    cart: user?.cart || [],
    totalItems: user?.cart.reduce((acc, item) => acc + item.quantity, 0) || 0,
    subtotal:
      user?.cart.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
      0,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addStatus,
    addError,
    removeStatus,
    removeError,
    updateStatus,
    updateError,
    isInCart: (productId: string, variantSku?: string) => {
      return (
        user?.cart.some(
          (item) =>
            item.productId === productId &&
            (!variantSku || item.variantSku === variantSku)
        ) || false
      );
    },
    getCartItem: (productId: string, variantSku?: string) => {
      return user?.cart.find(
        (item) =>
          item.productId === productId &&
          (!variantSku || item.variantSku === variantSku)
      );
    },
  };
}

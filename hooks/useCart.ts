"use client";

import { useQuery } from "@/lib/server/client-hook";
import { useUserStore } from "@/store/user";
import { useCallback } from "react";

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
  const { run: fetchCart } = useQuery("getCart");
  const { run: updateCart } = useQuery("updateCart");
  const { run: deleteCartItem } = useQuery("deleteCartItem");
  const { run: updateCartItem } = useQuery("updateCartItem");

  const addToCart = useCallback(async (item: Omit<CartItem, "addedAt" | "updatedAt">) => {
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

    if (response.data && user) {
      actions.setUser({
        ...user,
        cart: [
          ...user.cart,
          ...(response.data?.items || [])
        ],
      });
    }

    return response;
  }, [updateCart, user, actions]);

  const removeFromCart = useCallback(async (itemId: string) => {
    const response = await deleteCartItem({
      params: {
        id: itemId,
      },
    });

    if (user) {
      actions.setUser({
        ...user,
        cart: user.cart.filter(item => item._id !== itemId),
      });
    }

    return response;
  }, [deleteCartItem, user, actions]);

  const updateQuantity = useCallback(async (itemId: string, increment: number) => {
    const cartItem = user?.cart.find(item => item._id === itemId);
    
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

    if (response.data && user) {
      const updatedItem = response.data;
      actions.setUser({
        ...user,
        cart: [
          ...user.cart.filter(item => item._id !== updatedItem.productId),
          updatedItem,
        ],
      });
    }

    return response;
  }, [updateCartItem, user, actions, removeFromCart]);

  const clearCart = useCallback(async () => {
    if (!user) return;
    
    // Remove all items one by one
    const promises = user.cart.map(item => 
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
  }, [user, actions, deleteCartItem]);

  return {
    cart: user?.cart || [],
    totalItems: user?.cart.reduce((acc, item) => acc + item.quantity, 0) || 0,
    subtotal: user?.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart: (productId: string, variantSku?: string) => {
      return user?.cart.some(item => 
        item.productId === productId && (!variantSku || item.variantSku === variantSku)
      ) || false;
    },
    getCartItem: (productId: string, variantSku?: string) => {
      return user?.cart.find(item => 
        item.productId === productId && (!variantSku || item.variantSku === variantSku)
      );
    },
  };
}
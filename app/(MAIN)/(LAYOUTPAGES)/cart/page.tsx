"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loaders";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/hooks/useCart";
import { useQuery } from "@/lib/server/client-hook";
import { useUserStore } from "@/store/user";
import { ImageIcon, Loader2Icon, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const empty = (
  <div className="container mx-auto px-4 py-16">
    <div className="text-center max-w-md mx-auto">
      <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
      <h1 className="text-2xl font-light mb-4">Your cart is empty</h1>
      <p className="text-muted-foreground mb-8">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
      <Button asChild size="lg" className="btn-hero">
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </div>
  </div>
);
const Cart = () => {
  const { user } = useUserStore();
  const { removeFromCart, updateQuantity, removeStatus, removeError, updateStatus, updateError } = useCart();
  const { run, data, status } = useQuery("getCart");
  const [currentUpdatedItem, setCurrentUpdatedItem] = useState<string[]>([]);

  useEffect(() => {
    run();
  }, [run]);


  if (status === "loading")
    return (
      <Loader
        loader="flip-text-loader"
        type="content-loader"
        text="CART"
        loaderSize="fullscreen"
      />
    );

  if (!user) return empty;

  if (!data || data.data?.totalItems === 0) {
    return empty;
  }
  const { data: cart } = data;

  if (!cart) {
    return empty;
  }

  async function handleRemoveFromCart(product: { sku: string; pid: string }) {
    const cartItem = user?.cart.find(
      (i) => i.productId === product.pid && i.variantSku === product.sku
    );
    if (!cartItem || !cartItem._id) return;
    setCurrentUpdatedItem((prev) => [...prev, String(cartItem._id)]);
    const res = await removeFromCart(cartItem._id);
    if (res?.response?.success) {
      toast.success("Item removed from cart.");
      await run(); // Re-fetch cart after removal
    } else {
      toast.error("Failed to remove item: " + (res?.response?.message || "Unknown error"));
    }
    setCurrentUpdatedItem((prev) => prev.filter((id) => id !== String(cartItem._id)));
  }
  const cartItem = (product: { sku: string; pid: string }) =>
    user.cart.find(
      (c) => c._id === product.pid && c.variantSku === product.sku
    );
  async function handleUpdateQuantity(
    action: "ADD" | "REMOVE",
    product: { sku: string; pid: string }
  ) {
    const item = cartItem(product);
    if (!item || !item._id) return;
    setCurrentUpdatedItem((prev) => [...prev, String(item._id)]);
    if (action === "REMOVE" && item.quantity <= 1) {
      await handleRemoveFromCart(product);
      setCurrentUpdatedItem((prev) => prev.filter((id) => id !== String(item._id)));
      return;
    }
    const res = await updateQuantity(item._id, action === "ADD" ? 1 : -1);
    if (res?.response?.success) {
      toast.success("Cart updated.");
      await run(); // Re-fetch cart after update
    } else {
      toast.error("Failed to update cart: " + (res?.response?.message || "Unknown error"));
    }
    setCurrentUpdatedItem((prev) => prev.filter((id) => id !== String(item._id)));
  }

  const subtotal = cart?.totalAmount || 0;
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-section mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart?.items?.map((item: any) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden isolate flex-shrink-0">
                    {item.image?.src ? (
                      <Image
                        width={720}
                        height={480}
                        src={item.image?.src || ""}
                        alt={item.image.alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.size?.label} • Color: {item.color.name}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleRemoveFromCart({
                            pid: item.id,
                            sku: item.variantSku,
                          })
                        }
                        className="text-muted-foreground hover:text-destructive"
                        disabled={currentUpdatedItem.includes(String(item.id)) || removeStatus === "loading"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {removeError && currentUpdatedItem.includes(String(item.id)) && (
                        <span className="text-destructive text-xs ml-2">Error removing item</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            toast.loading("Updating cart...");
                            await handleUpdateQuantity("REMOVE", {
                              pid: item.id,
                              sku: item.variantSku,
                            });
                          }}
                          disabled={currentUpdatedItem.includes(String(item.id))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 border rounded min-w-12 text-center">
                          {currentUpdatedItem.includes(String(item.id)) ? (
                            <Loader2Icon className="size-3 animate-spin" />
                          ) : (
                            item.quantity
                          )}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            await handleUpdateQuantity("ADD", {
                              pid: item.id,
                              sku: item.variantSku,
                            });
                          }}
                          disabled={currentUpdatedItem.includes(String(item.id))}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {updateError && currentUpdatedItem.includes(String(item.id)) && (
                        <span className="text-destructive text-xs ml-2">Error updating quantity</span>
                      )}

                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-muted-foreground">
                  Add ${(75 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}

              <div className="space-y-3 pt-4">
                <Button size="lg" className="w-full btn-hero" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;

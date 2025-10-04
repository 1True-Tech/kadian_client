"use client";
import { CheckoutSteps } from "@/components/pages/checkout/CheckoutSteps";
import { OrderSummary } from "@/components/pages/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loaders";
import queries from "@/lib/queries";
import { useQuery } from "@/lib/server/client-hook";
import { client } from "@/lib/utils/NSClient";
import { useCheckoutStore } from "@/store/checkout";
import { useUserStore } from "@/store/user";
import { CartItemReady } from "@/types/user";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function CheckoutLyout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    currentFlow,
    loaders,
    emptyOrder,
    actions: {
      loadUserCartItemsForOrder,
      setOrderId,
      setItemsForOrder,
      setLoaders,
      setUserInfo,
      setCurrentFlow,
    },
  } = useCheckoutStore();
  const { run: getOrder } = useQuery("getOrder");
  const router = useRouter();

  const { id } = useParams() as { id?: string };
  const { user, status } = useUserStore();
  useEffect(() => {
    if (user) {
      const addr = user.addresses?.[0] || {};
      setUserInfo({
        email: user.email || "",
        phone: user.phone || "",
        firstName: user.name.first || "",
        lastName: user.name.last || "",
        city: addr.city || "",
        state: addr.state || "",
        zipCode: addr.postal || "",
        country: addr.country || "United States",
        saveAddress: false,
        addressLine1: addr.line1 || "",
        addressLine2: addr.line2 || "",
      });
    }
  }, [setUserInfo, user]);

  useEffect(() => {
    if (status === "done" && user) {
      loadUserCartItemsForOrder(user);
    }
  }, [loadUserCartItemsForOrder, status, user]);
  useEffect(() => {
    if (id) {
      async function loadData(id: string) {
        setLoaders("user-orders");
        const orderData = await getOrder({ params: { id } });
        if (!orderData?.data || orderData.data.status === "cancelled") {
          setCurrentFlow("Cancelled");
          router.replace(`/checkout/${id}/cancel`);
          return;
        }

        if (orderData.data.status !== "pending") {
          setCurrentFlow("Complete");
          router.replace(`/checkout/${id}/success`);
          return;
        }

        // Initialize items for order once from existing order
        if (orderData?.data?.items?.length) {
          const loadOrderProduct: CartItemReady[] = await client.fetch(
            queries.productCartItem,
            {
              ids: orderData.data.items.map((c) => c.productId),
              vSku: orderData.data.items.map((c) => c.variantSku),
            }
          );

          const newItems = loadOrderProduct.map((item) => ({
            ...item,
            quantity:
              (orderData?.data?.items || []).find(
                (c) => c.variantSku === item.variantSku
              )?.quantity || 1,
            variantSku: item.variantSku,
          }));

          setItemsForOrder(newItems);
        }

        // Initialize form data once from existing order
        if (orderData?.data) {
          const newForm = {
            email: orderData.data.customerInfo.email || "",
            phone: orderData.data.customerInfo.phone || "",
            firstName: orderData.data.customerInfo.name.first || "",
            lastName: orderData.data.customerInfo.name.last || "",
            city: orderData.data.shippingAddress?.city || "",
            state: orderData.data.shippingAddress?.state || "",
            zipCode: orderData.data.shippingAddress?.postal || "",
            country: orderData.data.shippingAddress?.country || "United States",
            saveAddress: false,
            addressLine1: "",
            addressLine2: "",
          };

          setUserInfo(newForm);
          setLoaders(null);
        }
        if (orderData?.data) setOrderId(orderData.data.id);
      }
      loadData(id);
    }
  }, [
    getOrder,
    id,
    router,
    setCurrentFlow,
    setItemsForOrder,
    setLoaders,
    setOrderId,
    setUserInfo,
  ]);
  if (loaders === "initializing") {
    return (
      <Loader
        loader="flip-text-loader"
        loaderSize="fullscreen"
        type="content-loader"
        unLoad={!loaders}
        text="Loading cart..."
      />
    );
  }
  if (!loaders && emptyOrder) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBagIcon className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
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
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps currentStep={currentFlow} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">{children}</div>

        <div className="hidden lg:block">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCheckoutStore } from "@/store/checkout";
import { handleCreateOrder } from "@/store/checkout/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const OrderReview = () => {
  const { orderProcessData, totalItems, actions, loaders } = useCheckoutStore();
  const { handleNextStep, handlePreviousStep } = actions;
  const { itemsForOrder, userInfo } = orderProcessData;
  const loading = loaders === "create-order";
  const router = useRouter();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Review Your Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Items</h3>
            {itemsForOrder.map((item) => (
              <div key={item.variantSku} className="flex gap-4 border-b pb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    width={720}
                    height={480}
                    src={item.image?.src || "/placeholder.svg"}
                    loading="lazy"
                    alt={item.name || ""}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.color?.name ?? ""}, {item.size?.label}
                  </p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="font-medium">
                    ${item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <p>
              {userInfo.firstName} {userInfo.lastName}
              <br />
              {userInfo.city}, {userInfo.state} {userInfo.zipCode}
              <br />
              {userInfo.country}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Contact Information</h3>
            <p>
              Email: {userInfo.email}
              <br />
              Phone: {userInfo.phone}
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalItems.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${totalItems.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>Total</span>
              <span>${totalItems.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => handlePreviousStep()}
          disabled={loading}
        >
          Back to Information
        </Button>
        <Button
          size="lg"
          className="btn-hero w-full sm:w-auto"
          onClick={() =>
            handleNextStep(async () => {
              if (!orderProcessData.orderId) {
                const res = await handleCreateOrder({
                  next(orderId) {
                    router.replace(`/checkout/${orderId}`);
                  },
                  state: {
                    actions,
                    orderProcessData,
                  },
                });

                if (res) return true;
                return false;
              }
              return true;
            })
          }
          disabled={loading}
        >
          {loading ? "Preparing Order..." : "Continue to Payment"}
        </Button>
      </div>
    </>
  );
};

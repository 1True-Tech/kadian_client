"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCheckoutStore } from "@/store/checkout";
import { useEffect } from "react";

export const OrderSummary = () => {
  const {
    orderProcessData: { itemsForOrder },
    totalItems,
    actions:{calculateTotals}
  } = useCheckoutStore();
  useEffect(() => {
    calculateTotals()
  }, [calculateTotals, itemsForOrder])
  
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {itemsForOrder.map((item) => (
          <div key={item.variantSku} className="flex justify-between">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${totalItems.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${totalItems.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${totalItems.total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

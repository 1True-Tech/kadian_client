"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  itemsForOrder: any[];
  formData: any;
  totals: any;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

export const OrderReview = ({ itemsForOrder, formData, totals, handlePreviousStep, handleNextStep }: Props) => {
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
                    width={720} height={480}
                    src={item.image?.src || "/placeholder.svg"}
                    alt={item.name || ""}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.color?.name ?? ""}, {item.size?.label}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="font-medium">${item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <p>{formData.firstName} {formData.lastName}<br />{formData.city}, {formData.state} {formData.zipCode}<br />{formData.country}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Contact Information</h3>
            <p>Email: {formData.email}<br />Phone: {formData.phone}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="text-success">Free</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${totals.tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold text-lg pt-2"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep}>Back to Information</Button>
        <Button size="lg" className="btn-hero" onClick={handleNextStep}>Continue to Payment</Button>
      </div>
    </>
  );
};


interface PropsOS {
  itemsForOrder: any[];
  totals: any;
}

export const OrderSummary = ({ itemsForOrder, totals }: PropsOS) => {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {itemsForOrder.map((item) => (
          <div key={item.variantSku} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
        <div className="flex justify-between"><span>Tax</span><span>${totals.tax.toFixed(2)}</span></div>
        <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
      </CardContent>
    </Card>
  );
};

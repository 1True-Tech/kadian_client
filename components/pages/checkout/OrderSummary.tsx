import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CartItemReady } from "@/types/user";
import { calculateOrderTotals } from "@/lib/utils/orderUtils";
import Image from "next/image";

interface OrderSummaryProps {
  items: CartItemReady[];
  onRemoveItem: (sku: string) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const OrderSummary = ({ items, onRemoveItem, isSubmitting, onSubmit }: OrderSummaryProps) => {
  const totals = calculateOrderTotals(items);

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.variantSku} className="flex gap-4">
              <div className="w-20 h-20 relative">
                {item.image && (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="rounded object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Size: {item.size?.label}, Color: {item.color.name}
                </p>
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => onRemoveItem(item.variantSku)}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${totals.tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${totals.total.toFixed(2)}</span>
        </div>

        <Button
          size="lg"
          className="w-full btn-hero"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Complete Order"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By placing your order, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

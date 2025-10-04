"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@/lib/server/client-hook";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  const router = useRouter();
  const getOrder = useQuery("getOrder");
  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (id) getOrder.run({ params: { id } });
  }, [id]);

  useEffect(() => {
    if (getOrder.data && getOrder.data.data) {
      if (getOrder.data.data.status === "cancelled") {
        router.replace(`/checkout/${id}/cancel`);
      }
    }
  }, [getOrder.data, id, router]);

  if (getOrder.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-success animate-spin" />
          </div>
          <p className="text-xl">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (getOrder.error || !getOrder.data || !getOrder.data.data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
          <p className="text-xl font-bold mb-2">Order Not Found</p>
          <p className="text-muted-foreground mb-6">We couldn&#39;t find your order. Please check your order link or contact support.</p>
          <Button onClick={() => router.push("/shop")} size="lg">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const order = getOrder.data.data;

  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="border-success/20">
          <CardHeader className="text-center border-b border-border pb-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xl">Thank you for your purchase</p>
              <p className="text-muted-foreground">Order #{order.id}</p>
              <p className="text-muted-foreground max-w-md mx-auto">
                We&apos;ve sent a confirmation email with your order details and tracking information.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-2">
                <h3 className="font-semibold">Order Summary</h3>
                <div className="text-muted-foreground text-sm">{order.totalItems} items • {order.totalProducts} products</div>
                <div className="text-lg font-bold">Total: ${order.totalAmount.toFixed(2)}</div>
                <div className="text-sm">Status: <span className="font-medium capitalize">{order.status}</span></div>
                <div className="text-sm">Placed: {new Date(order.createdAt).toLocaleString()}</div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Shipping To</h3>
                <div className="text-sm">{order.customerInfo.name.first} {order.customerInfo.name.last}</div>
                <div className="text-sm">{order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}</div>
                <div className="text-sm">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postal}</div>
                <div className="text-sm">{order.shippingAddress.country}</div>
                <div className="text-sm mt-2">Email: {order.customerInfo.email}</div>
                <div className="text-sm">Phone: {order.customerInfo.phone}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={() => router.push("/account/order-history")}
                variant="outline"
                size="lg"
              >
                View Order History
              </Button>
              <Button onClick={() => router.push("/shop")} size="lg">
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

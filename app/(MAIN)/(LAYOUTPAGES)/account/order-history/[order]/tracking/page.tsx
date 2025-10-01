"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@/lib/server/client-hook";
import { AlertCircle, Truck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TrackingPage() {
  const router = useRouter();
  const { order: orderId } = useParams() as { order?: string };
  const getOrder = useQuery("getOrder");

  useEffect(() => {
    if (orderId) getOrder.run({ params: { id: orderId } });
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
        <div className="w-full max-w-2xl mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <p className="text-xl font-bold mb-2">No Order Selected</p>
          <p className="text-muted-foreground mb-6">Please select an order to track.</p>
          <Button onClick={() => router.push("/account/order-history")} size="lg">Go to Order History</Button>
        </div>
      </div>
    );
  }

  if (getOrder.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
        <div className="w-full max-w-2xl mx-auto text-center">
          <Truck className="h-16 w-16 text-primary animate-spin mb-4" />
          <p className="text-xl">Loading tracking info...</p>
        </div>
      </div>
    );
  }

  if (getOrder.error || !getOrder.data || !getOrder.data.data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
        <div className="w-full max-w-2xl mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <p className="text-xl font-bold mb-2">Order Not Found</p>
          <p className="text-muted-foreground mb-6">We couldn&rsquo;t find your order. Please check your order link or contact support.</p>
          <Button onClick={() => router.push("/account/order-history")} size="lg">Go to Order History</Button>
        </div>
      </div>
    );
  }

  const order = getOrder.data.data;
  // Placeholder: Replace with real tracking info if available
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
      <div className="w-full max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center border-b border-border pb-6">
            <Truck className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold">Order Tracking</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xl">Tracking for Order #{order.id}</p>
              <p className="text-muted-foreground max-w-md mx-auto">
                {/* Replace this with actual tracking status/steps if available */}
                Status: <span className="font-medium capitalize">{order.status}</span>
              </p>
              <p className="text-muted-foreground">Placed: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={() => router.push('/account/order-history')} variant="outline" size="lg">Back to Order History</Button>
              <Button onClick={() => router.push('/shop')} size="lg">Continue Shopping</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

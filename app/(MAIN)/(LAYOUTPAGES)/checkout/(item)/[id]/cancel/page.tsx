"use client"
import { useRouter, useParams } from 'next/navigation';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@/lib/server/client-hook';
import { useEffect } from 'react';

export default function CheckoutCancel() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const getOrder = useQuery("getOrder");

  useEffect(() => {
    if (id) getOrder.run({ params: { id } });
  }, [id]);

  if (getOrder.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-destructive animate-spin" />
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
          <p className="text-muted-foreground mb-6">We couldn&apos;t find your order. Please check your order link or contact support.</p>
          <Button onClick={() => router.push("/shop")} size="lg">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const order = getOrder.data.data;

  if (order.status === "cancelled") {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
        <div className="w-full max-w-2xl mx-auto">
          <Card className="border-destructive/20">
            <CardHeader className="text-center border-b border-border pb-6">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle className="text-3xl font-bold">Order Cancelled</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="text-center space-y-2">
                <p className="text-xl">Your order was cancelled.</p>
                <p className="text-muted-foreground max-w-md mx-auto">
                  If you believe this is a mistake or want to try again, please contact support or place a new order.
                </p>
                <p className="text-muted-foreground">Order #{order.id}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  onClick={() => router.push('/checkout')}
                  variant="outline"
                  size="lg"
                >
                  Return to Checkout
                </Button>
                <Button 
                  onClick={() => router.push('/cart')}
                  size="lg"
                >
                  Review Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // fallback for not-cancelled orders
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full px-4 py-12">
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-16 w-16 text-destructive" />
        </div>
        <p className="text-xl font-bold mb-2">Order Not Cancelled</p>
        <p className="text-muted-foreground mb-6">This order is not cancelled. If you need help, please contact support.</p>
        <Button onClick={() => router.push("/shop")} size="lg">Continue Shopping</Button>
      </div>
    </div>
  );
}

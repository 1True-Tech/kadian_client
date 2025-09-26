"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckoutCancel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="container max-w-4xl py-12">
      <Card className="border-destructive/20">
        <CardHeader className="text-center border-b border-border pb-6">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xl">
              Your payment was not completed
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your order has been saved. You can try again or choose a different payment method.
            </p>
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
  );
}
"use client"
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/lib/hooks/useCart';

export default function CheckoutSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  
  const orderId = searchParams.get('order_id');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear the cart on successful payment
    clearCart();
    
    // Fetch order details to display order number
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOrderNumber(data.data.orderNumber);
          }
        })
        .catch(err => console.error('Error fetching order details:', err));
    }
  }, [orderId, clearCart]);

  return (
    <div className="container max-w-4xl py-12">
      <Card className="border-success/20">
        <CardHeader className="text-center border-b border-border pb-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
          <CardTitle className="text-3xl font-bold">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xl">
              Thank you for your purchase
            </p>
            {orderNumber && (
              <p className="text-muted-foreground">
                Order #{orderNumber}
              </p>
            )}
            <p className="text-muted-foreground max-w-md mx-auto">
              We&apos;ve sent a confirmation email with your order details and tracking information.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              onClick={() => router.push('/account/order-history')}
              variant="outline"
              size="lg"
            >
              View Order History
            </Button>
            <Button 
              onClick={() => router.push('/shop')}
              size="lg"
            >
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
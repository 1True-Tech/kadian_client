"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loaders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { buildCreateOrderBody } from "@/lib/controllers/buildOrdersBody";
import { useQuery } from "@/lib/server/client-hook";
import fileToBase64 from "@/lib/utils/filetobase64";
import { useCart } from "@/hooks/useCart";
import { useUserStore } from "@/store/user";
import { CartItemReady } from "@/types/user";
import { CreditCard, Lock, Trash2, Wallet, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { client } from "@/lib/utils/NSClient";
import queries from "@/lib/queries";
import { PaymentMethod } from "@/types/order";

// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const Checkout = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { cart, clearCart, subtotal } = useCart();
  const createOrder = useQuery("createOrder");
  
  const [proofFile, setProofFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setProofFile(e.target.files[0]);
  };

  const [itemsForOrder, setItemsForOrder] = useState<CartItemReady[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  useEffect(() => {
    async function getCarts(){
      const loadCartProduct:CartItemReady[] = await client.fetch(queries.productCartItem, {ids: cart.map(c => c.productId), vSku:cart.map(c => c.variantSku)})
      setItemsForOrder(loadCartProduct);
    }
    if (cart?.length) {
      getCarts()
      
    }
  }, [cart]);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    saveAddress: false,
  });

  useEffect(() => {
    if (user) {
      const userPrimaryAddress = user?.addresses[0];
      setFormData({
        email: user?.email || "",
        phone: user?.phone || "",
        firstName: user?.name.first || "",
        lastName: user?.name.last || "",
        city: userPrimaryAddress?.city || "",
        state: userPrimaryAddress?.state || "",
        zipCode: userPrimaryAddress?.postalCode || "",
        country: userPrimaryAddress?.country || "United States",
        saveAddress: false,
      });
    }
  }, [user]);
  
  const handleSubmitOrder = async (orderBody: any) => {
    // For transfer and delivery payment methods
    const orderResponse = await createOrder.run({ body: orderBody });
    
    if (orderResponse?.orderId) {
      toast({
        title: "Order Placed Successfully",
        description: `Your order #${orderResponse.orderId} has been placed`,
      });
      
      // Clear cart
      clearCart();
      
      // Redirect to order confirmation
      router.push(`/account/order-history/${orderResponse.orderId}`);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveItem = (sku: string) => {
    setItemsForOrder((prev) => prev.filter((item) => item.variantSku !== sku));
  };

  const totals = useMemo(() => {
    const subtotal = itemsForOrder.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [itemsForOrder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderBody = buildCreateOrderBody(
      itemsForOrder,
      formData,
      paymentMethod
    );

    if (paymentMethod === "transfer" && proofFile) {
      const proofBase64 = await fileToBase64(proofFile);

      const orderWithProof = buildCreateOrderBody(
        itemsForOrder,
        formData,
        paymentMethod,
        proofBase64
      );
      await createOrder.run({ body: orderWithProof });
    } else if (paymentMethod === "stripe") {
      // Create order first
      const orderResponse = await createOrder.run({ body: orderBody });
      
      if (orderResponse?.orderId) {
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        
        // Call API to create a checkout session
        const checkoutSession = await fetch("/api/payments/stripe/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderResponse.orderId,
            items: itemsForOrder.map(item => ({
              name: item.name,
              description: `${item.color?.name || ''} ${item.size?.label || ''}`.trim(),
              quantity: item.quantity,
              price: item.price * 100, // Stripe uses cents
              image: item.image?.src
            })),
            customerEmail: formData.email,
          }),
        });
        
        const { sessionId } = await checkoutSession.json();
        
        // Redirect to Stripe Checkout
        await stripe?.redirectToCheckout({
          sessionId,
        });
      }
    } else if (paymentMethod === "paypal") {
        // Create order first
        const orderResponse = await createOrder.run({ body: orderBody });
        
        if (orderResponse?.orderId) {
          // Redirect to PayPal
          const paypalResponse = await fetch("/api/payments/paypal/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: orderResponse.orderId,
              items: itemsForOrder.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
              })),
              customerEmail: formData.email,
            }),
          });
          
          const { approvalUrl } = await paypalResponse.json();
          
          // Redirect to PayPal approval URL
          if (approvalUrl) {
            window.location.href = approvalUrl;
          }
        }
    }
  };

  if (status === "loading")
    return <Loader loader="hr-line-loader" loaderSize="parent" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-section mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-peers">
        {/* Checkout Form */}
        <div className="space-y-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="20333102"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => handleInputChange("state", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      handleInputChange("country", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">
                        United States
                      </SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveAddress"
                  checked={formData.saveAddress}
                  onCheckedChange={(checked) =>
                    handleInputChange("saveAddress", !!checked)
                  }
                />
                <Label htmlFor="saveAddress" className="text-sm">
                  Save this address for future orders
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={paymentMethod}
                onValueChange={(val) =>
                  setPaymentMethod(val as "stripe" | "paypal" | "transfer" | "delivery")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Credit/Debit Card (Stripe)</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="transfer">Bank Transfer</SelectItem>
                  <SelectItem value="delivery">Pay on Delivery</SelectItem>
                </SelectContent>
              </Select>

              {paymentMethod === "stripe" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="h-4 w-4" />
                    You&apos;ll be redirected to Stripe&apos;s secure payment page after clicking &quot;Complete Order&quot;
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Image src="/visa.svg" alt="Visa" width={40} height={25} />
                    <Image src="/mastercard.svg" alt="Mastercard" width={40} height={25} />
                    <Image src="/amex.svg" alt="American Express" width={40} height={25} />
                  </div>
                </div>
              )}
              
              {paymentMethod === "paypal" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="h-4 w-4" />
                    You&apos;ll be redirected to PayPal&apos;s secure payment page after clicking &quot;Complete Order&quot;
                  </div>
                  <div className="flex justify-center">
                    <Image src="/paypal.svg" alt="PayPal" width={100} height={30} />
                  </div>
                </div>
              )}

              {paymentMethod === "transfer" && (
                <div className="space-y-4 text-sm">
                  <p>Upload proof of payment below:</p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    {proofFile && (
                      <span className="text-green-600 text-sm">Uploaded ✓</span>
                    )}
                  </div>
                </div>
              )}
              {paymentMethod === "delivery" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  Pay the full amount in cash or card when your order arrives
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {itemsForOrder.map((item) => (
                  <div key={item.variantSku} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        width={720}
                        height={480}
                        src={item.image?.src || "/placeholder.svg"}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.variantSku)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
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
                  <span className="text-success">Free</span>
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
                onClick={handleSubmit}
              >
                Complete Order
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

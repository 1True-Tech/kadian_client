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
import { useCart } from "@/lib/hooks/useCart";
import { useUserStore } from "@/store/user";
import { CartItemReady } from "@/types/user";
import { Check, CreditCard, Lock, Trash2, Wallet, Truck, User, ShoppingBag, CreditCard as PaymentIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { client } from "@/lib/utils/NSClient";
import queries from "@/lib/queries";
import { PaymentMethod } from "@/types/order";
import { v4 as uuidv4 } from 'uuid';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Step type definition
type CheckoutStep = 'user-info' | 'review' | 'payment';

const Checkout = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { cart, clearCart, subtotal } = useCart();
  const createOrder = useQuery("createOrder");
  
  // Current step state
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('user-info');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [idempotencyKey, setIdempotencyKey] = useState<string>(uuidv4());

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setProofFile(e.target.files[0]);
  };

  const [itemsForOrder, setItemsForOrder] = useState<CartItemReady[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  useEffect(() => {
    async function getCarts() {
      const loadCartProduct: CartItemReady[] = await client.fetch(
        queries.productCartItem,
        {
          ids: cart.map((c) => c.productId),
          vSku: cart.map((c) => c.variantSku),
        }
      );

      setItemsForOrder([
        ...loadCartProduct.map((item) => ({
          ...item,
          quantity:
            cart.find((c) => c.variantSku === item.variantSku)?.quantity || 1,
        })),
      ]);
    }
    if (cart?.length) {
      getCarts();
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

  // Validate user information form
  const validateUserInfo = () => {
    const requiredFields = ['email', 'phone', 'firstName', 'lastName', 'city', 'state', 'zipCode', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  // Create order and get orderId
  const createOrderAndGetId = async () => {
    setIsLoading(true);
    
    try {
      const orderBody = buildCreateOrderBody(
        itemsForOrder,
        formData,
        paymentMethod
      );
      
      // Add idempotency key to headers
      const orderResponse = await createOrder.run({ 
        body: {
          ...orderBody,
          payment: {
            ...orderBody.payment,
            idempotencyKey
          }
        }
      });

      if (orderResponse?.orderId) {
        setOrderId(orderResponse.orderId);
        return orderResponse.orderId;
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle step navigation
  const handleNextStep = async () => {
    if (currentStep === 'user-info') {
      if (validateUserInfo()) {
        setCurrentStep('review');
      }
    } else if (currentStep === 'review') {
      // Create order before moving to payment step
      const newOrderId = await createOrderAndGetId();
      if (newOrderId) {
        setCurrentStep('payment');
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'review') {
      setCurrentStep('user-info');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };

  // Process payment based on selected method
  const handleProcessPayment = async () => {
    setIsLoading(true);
    
    try {
      if (!orderId) {
        throw new Error("Order ID is missing");
      }
      
      if (paymentMethod === "transfer" && proofFile) {
        const proofBase64 = await fileToBase64(proofFile);
        
        // Update order with payment proof
        await fetch(`/api/orders/${orderId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment: {
              proof: proofBase64
            }
          }),
        });
        
        // Redirect to success page
        router.push(`/checkout/success?order_id=${orderId}`);
      } else if (paymentMethod === "stripe") {
        const stripe = await stripePromise;

        // Call API to create a checkout session
        const checkoutSession = await fetch(
          "/api/payments/stripe/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId,
              items: itemsForOrder.map((item) => ({
                name: item.name,
                description:
                  `${item.color?.name || ""} ${item.size?.label || ""}`.trim(),
                quantity: item.quantity,
                price: item.price * 100, // Stripe uses cents
                image: item.image?.src,
              })),
              customerEmail: formData.email,
            }),
          }
        );

        const { sessionId } = await checkoutSession.json();

        // Redirect to Stripe Checkout
        await stripe?.redirectToCheckout({
          sessionId,
        });
      } else if (paymentMethod === "paypal") {
        // Redirect to PayPal
        const paypalResponse = await fetch(
          "/api/payments/paypal/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId,
              items: itemsForOrder.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
              customerEmail: formData.email,
            }),
          }
        );

        const { approvalUrl } = await paypalResponse.json();

        // Redirect to PayPal approval URL
        if (approvalUrl) {
          window.location.href = approvalUrl;
        }
      } else if (paymentMethod === "delivery") {
        // For pay on delivery, just redirect to success page
        clearCart();
        router.push(`/checkout/success?order_id=${orderId}`);
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader loader="hr-line-loader" loaderSize="parent" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-section mb-4">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className={`flex flex-col items-center ${currentStep === 'user-info' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === 'user-info' ? 'bg-primary text-white' : 'bg-muted'}`}>
              <User className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Information</span>
          </div>
          
          <div className="flex-1 h-1 mx-4 bg-muted">
            <div className={`h-full bg-primary ${currentStep === 'user-info' ? 'w-0' : currentStep === 'review' ? 'w-1/2' : 'w-full'}`}></div>
          </div>
          
          <div className={`flex flex-col items-center ${currentStep === 'review' ? 'text-primary' : currentStep === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === 'review' ? 'bg-primary text-white' : currentStep === 'payment' ? 'bg-primary text-white' : 'bg-muted'}`}>
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Review</span>
          </div>
          
          <div className="flex-1 h-1 mx-4 bg-muted">
            <div className={`h-full bg-primary ${currentStep === 'payment' ? 'w-full' : 'w-0'}`}></div>
          </div>
          
          <div className={`flex flex-col items-center ${currentStep === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === 'payment' ? 'bg-primary text-white' : 'bg-muted'}`}>
              <PaymentIcon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-peers">
        {/* Checkout Form */}
        <div className="space-y-8">
          {/* Step 1: User Information */}
          {currentStep === 'user-info' && (
            <>
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
              
              <div className="flex justify-end">
                <Button 
                  size="lg" 
                  className="btn-hero"
                  onClick={handleNextStep}
                >
                  Continue to Review
                </Button>
              </div>
            </>
          )}
          
          {/* Step 2: Order Review */}
          {currentStep === 'review' && (
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
                      {formData.firstName} {formData.lastName}<br />
                      {formData.city}, {formData.state} {formData.zipCode}<br />
                      {formData.country}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <p>
                      Email: {formData.email}<br />
                      Phone: {formData.phone}
                    </p>
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
                    <div className="flex justify-between font-semibold text-lg pt-2">
                      <span>Total</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                >
                  Back to Information
                </Button>
                <Button 
                  size="lg" 
                  className="btn-hero"
                  onClick={handleNextStep}
                >
                  Continue to Payment
                </Button>
              </div>
            </>
          )}
          
          {/* Step 3: Payment Method */}
          {currentStep === 'payment' && (
            <>
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
                      setPaymentMethod(
                        val as "stripe" | "paypal" | "transfer" | "delivery"
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">
                        Credit/Debit Card (Stripe)
                      </SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="transfer">Bank Transfer</SelectItem>
                      <SelectItem value="delivery">Pay on Delivery</SelectItem>
                    </SelectContent>
                  </Select>

                  {paymentMethod === "stripe" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4" />
                        You&apos;ll be redirected to Stripe&apos;s secure payment
                        page after clicking &quot;Complete Order&quot;
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Image src="/visa.svg" alt="Visa" width={40} height={25} />
                        <Image
                          src="/mastercard.svg"
                          alt="Mastercard"
                          width={40}
                          height={25}
                        />
                        <Image
                          src="/amex.svg"
                          alt="American Express"
                          width={40}
                          height={25}
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4" />
                        You&apos;ll be redirected to PayPal&apos;s secure payment
                        page after clicking &quot;Complete Order&quot;
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src="/paypal.svg"
                          alt="PayPal"
                          width={100}
                          height={30}
                        />
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
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                >
                  Back to Review
                </Button>
                <Button 
                  size="lg" 
                  className="btn-hero"
                  onClick={handleProcessPayment}
                  disabled={paymentMethod === "transfer" && !proofFile}
                >
                  Complete Order
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {itemsForOrder.map((item) => {
                  return (
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
                        {currentStep === 'user-info' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.variantSku)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
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

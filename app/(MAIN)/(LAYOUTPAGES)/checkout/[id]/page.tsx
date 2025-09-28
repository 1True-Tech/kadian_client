"use client";
import { CheckoutStep, CheckoutSteps } from "@/components/pages/checkout/CheckoutSteps";
import { UserInfoForm } from "@/components/pages/checkout/CustomerInfoForm";
import { OrderReview, OrderSummary } from "@/components/pages/checkout/OrderSummary";
import { PaymentMethodForm } from "@/components/pages/checkout/PaymentSection";
import { Loader } from "@/components/ui/loaders";
import ErrorBoundary from "@/components/ui/error-boundary";
import { toast } from "@/components/ui/use-toast";
import { buildCreateOrderBody } from "@/lib/controllers/buildOrdersBody";
import { useCart } from "@/lib/hooks/useCart";
import queries from "@/lib/queries";
import { useQuery } from "@/lib/server/client-hook";
import fileToBase64 from "@/lib/utils/filetobase64";
import { client } from "@/lib/utils/NSClient";
import { useUserStore } from "@/store/user";
import { PaymentMethod } from "@/types/order";
import { CartItemReady } from "@/types/user";
import { loadStripe } from "@stripe/stripe-js";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Initialize Stripe with publishable key
const stripe = await loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Step type definition

const CheckoutPage = () => {
  return (
    <ErrorBoundary>
      <CheckoutContent />
    </ErrorBoundary>
  );
};

const CheckoutContent = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { user } = useUserStore();
  const { cart, clearCart } = useCart();
  const createOrder = useQuery("createOrder");
  const getOrder = useQuery("getOrder");

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("user-info");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [loadingMessage, setLoadingMessage] = useState("Preparing checkout...");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [idempotencyKey] = useState<string>(uuidv4());
  const [itemsForOrder, setItemsForOrder] = useState<CartItemReady[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    "addressLine1": "",
      "addressLine2": "",
    zipCode: "",
    country: "United States",
    saveAddress: false,
  });

  useEffect(() => {
    async function loadData() {
      if (id === "create-order-checkout") {
        if (cart?.length) {
          const loadCartProduct: CartItemReady[] = await client.fetch(
            queries.productCartItem,
            {
              ids: cart.map((c) => c.productId),
              vSku: cart.map((c) => c.variantSku),
            }
          );
          setItemsForOrder(
            loadCartProduct.map((item) => ({
              ...item,
              quantity:
                cart.find((c) => c.variantSku === item.variantSku)?.quantity ||
                1,
              variantSku: item.variantSku,
            }))
          );
        }
        if (user) {
          const addr = user.addresses?.[0];
          setFormData({
            email: user.email || "",
            phone: user.phone || "",
            firstName: user.name.first || "",
            lastName: user.name.last || "",
            city: addr?.city || "",
            state: addr?.state || "",
            zipCode: addr?.postal || "",
            country: addr?.country || "United States",
            saveAddress: false,
            addressLine1:addr.line1 || "",
            addressLine2:addr.line2 || ""
          });
        }
      } else {
        const orderData = await getOrder.run({ params: { id } });
        if (orderData?.data?.status === "pending") {
          setCurrentStep("payment");
        }
        if (orderData?.data?.items?.length) {
          const loadOrderProduct: CartItemReady[] = await client.fetch(
            queries.productCartItem,
            {
              ids: orderData?.data?.items.map((c) => c.productId),
              vSku: orderData?.data?.items.map((c) => c.variantSku),
            }
          );
          setItemsForOrder(
            loadOrderProduct.map((item) => ({
              ...item,
              quantity:
                cart.find((c) => c.variantSku === item.variantSku)?.quantity ||
                1,
              variantSku: item.variantSku,
            }))
          );
        }
        if (orderData?.data) {
          setOrderId(orderData.data.id);
          setFormData({
            email: orderData.data.customerInfo.email || "",
            phone: orderData.data.customerInfo.phone || "",
            firstName: orderData.data.customerInfo.name.first || "",
            lastName: orderData.data.customerInfo.name.last || "",
            city: orderData.data.shippingAddress?.city || "",
            state: orderData.data.shippingAddress?.state || "",
            zipCode: orderData.data.shippingAddress?.postal || "",
            country: orderData.data.shippingAddress?.country || "United States",
            saveAddress: false,
            addressLine1:"",
            addressLine2:""
          });
        }
      }
      setIsLoading(false); // Turn off loading when data is loaded
    }
    loadData();
  }, [id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setProofFile(e.target.files[0]);
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

  const validateUserInfo = () => {
    // Basic required fields for all payment methods
    const basicRequired = [
      "email",
      "phone",
      "firstName",
      "lastName",
    ];
    
    // Only require shipping fields for transfer or delivery payment methods
    const requiredFields = paymentMethod === 'card' 
      ? basicRequired 
      : [
          ...basicRequired,
          "addressLine1",
          "city",
          "state",
          "zipCode",
          "country",
        ];
    
    const missing = requiredFields.filter(
      (f) => !formData[f as keyof typeof formData]
    );
    
    if (missing.length) {
      toast({
        title: "Missing Information",
        description: `Fill required fields: ${missing.join(", ")}`,
        variant: "destructive",
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const createOrderAndGetId = async () => {
    setIsLoading(true);
    try {
      const body = buildCreateOrderBody(itemsForOrder, formData, paymentMethod);
      const res = await createOrder.run({
        body: { ...body, payment: { ...body.payment, idempotencyKey } },
      });
      if (res?.data.orderId) {
        const newId = res.data.orderId;
        setOrderId(newId);
        router.push(`/checkout/${newId}`);
        return newId;
      }
      throw new Error("Failed to create order");
    } catch {
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    if (currentStep === "user-info") {
      if (validateUserInfo()) setCurrentStep("review");
    } else if (currentStep === "review") {
      const newOrderId = await createOrderAndGetId();
      if (newOrderId) setCurrentStep("payment");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "review") setCurrentStep("user-info");
    else if (currentStep === "payment") setCurrentStep("review");
  };

  const checkInventoryAvailability = async (items: CartItemReady[]) => {
    try {
      // Check inventory for each item
      const inventoryChecks = await Promise.all(
        items.map(async (item) => {
          const response = await fetch(`/api/inventory/${item.productId}/${item.variantSku}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          
          if (!response.ok) {
            return { available: false, item };
          }
          
          const data = await response.json();
          const available = data.data?.stock >= item.quantity;
          return { 
            available, 
            item,
            currentStock: data.data?.stock || 0
          };
        })
      );
      
      // Find any unavailable items
      const unavailableItems = inventoryChecks.filter(check => !check.available);
      
      if (unavailableItems.length > 0) {
        const itemNames = unavailableItems.map(
          check => `${check.item.name} (${check.currentStock} available, ${check.item.quantity} requested)`
        ).join(", ");
        
        toast({
          title: "Inventory Error",
          description: `Some items are no longer available in the requested quantity: ${itemNames}`,
          variant: "destructive",
        });
        
        return false;
      }
      
      return true;
    } catch (error) {
      toast({
        title: "Inventory Check Failed",
        description: "Unable to verify product availability. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleProcessPayment = async () => {
    setIsLoading(true);
    try {
      if (!orderId) throw new Error("Order ID missing");
      
      // Check inventory availability before processing payment
      const inventoryAvailable = await checkInventoryAvailability(itemsForOrder);
      if (!inventoryAvailable) {
        setIsLoading(false);
        return;
      }
      
      if (paymentMethod === "transfer" && proofFile) {
        const proof = await fileToBase64(proofFile);
        await fetch(`/api/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment: { proof } }),
        });
        router.push(`/checkout/${id}/success?order_id=${orderId}`);
      }
      if (paymentMethod === "stripe") {
        const res = await fetch(
          `/api/payments/stripe/create-checkout-session`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId,
              items: itemsForOrder.map((i) => ({
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                image: i.image?.src,
                variantSku: i.variantSku,
                productId: i.productId,
              })),
              shippingInfo: {
                line1: formData.addressLine1,
                line2: formData.addressLine2 || "",
                city: formData.city,
                state: formData.state,
                postal_code: formData.zipCode,
                country: formData.country,
              },
              customerEmail: formData.email,
              customerName: `${formData.firstName} ${formData.lastName}`,
            }),
          }
        );
        const data = await res.json();
        if (data.success) {
          await stripe?.redirectToCheckout({ sessionId: data.data.sessionId });
        } else {
          throw new Error(data.message || "Failed to create checkout session");
        }
      }
      if (paymentMethod === "delivery") {
        clearCart();
        router.push(`/checkout/success?order_id=${orderId}`);
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Payment failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (
    currentStep === "completed" ||
    currentStep === "paid" ||
    currentStep === "shipped"
  )
    redirect(`/checkout/${id}/success`);
  if (currentStep === "cancelled") redirect(`/checkout/${id}/cancel`);
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
        <Loader loader="flip-text-loader" loaderSize="parent" text={loadingMessage} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-section mb-4">Checkout</h1>

      <CheckoutSteps currentStep={currentStep} />

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="col-span-2 space-y-6">
    {currentStep === "user-info" && (
      <UserInfoForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleNextStep={handleNextStep}
      />
    )}
    {currentStep === "review" && (
      <OrderReview
        itemsForOrder={itemsForOrder}
        formData={formData}
        totals={totals}
        handlePreviousStep={handlePreviousStep}
        handleNextStep={handleNextStep}
      />
    )}
    {currentStep === "payment" && (
      <PaymentMethodForm
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        proofFile={proofFile}
        handleFileUpload={handleFileUpload}
        handleProcessPayment={handleProcessPayment}
        handlePreviousStep={handlePreviousStep}
      />
    )}
  </div>

  <div className="hidden lg:block">
    <OrderSummary itemsForOrder={itemsForOrder} totals={totals} />
  </div>
</div>

    </div>
  );
};

export default CheckoutPage;

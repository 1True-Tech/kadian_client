"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@/lib/server/client-hook";
import fileToBase64 from "@/lib/utils/filetobase64";
import { useCheckoutStore } from "@/store/checkout";
import { CartItemReady } from "@/types/user";
import { loadStripe } from "@stripe/stripe-js";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaCreditCard, FaMoneyCheckAlt, FaTruck } from "react-icons/fa";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export const PaymentMethodForm = () => {
  const {
    orderProcessData: {
      paymentMethod,
      userInfo,
      proofFile,
      orderId,
      itemsForOrder,
      idempotencyKey: ipk,
    },
    actions: { handlePreviousStep, setPaymentMethod, setProofFile, setLoaders },
  } = useCheckoutStore();
  const router = useRouter();
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setProofFile(e.target.files[0]);
  };
  const processPayment = useQuery("processPayment");
  const checkInventoryAvailability = async (items: CartItemReady[]) => {
    try {
      // Check inventory for each item
      const inventoryChecks = await Promise.all(
        items.map(async (item) => {
          const response = await fetch(
            `/api/inventory/${item.productId}/${item.variantSku}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) {
            return { available: false, item };
          }

          const data = await response.json();
          const available =
            data.data?.currentStock >= data.data?.stockThreshold;
          return {
            available,
            item,
            currentStock: data.data?.stock || 0,
          };
        })
      );
      console.log(inventoryChecks);

      // Find any unavailable items
      const unavailableItems = inventoryChecks.filter(
        (check) => !check.available
      );

      if (unavailableItems.length > 0) {
        const itemNames = unavailableItems
          .map(
            (check) =>
              `${check.item.name} (${check.currentStock} available, ${check.item.quantity} requested)`
          )
          .join(", ");
        toast.error(
          `Some items are no longer available in the requested quantity: ${itemNames}`
        );

        return false;
      }

      return true;
    } catch {
      toast.error("Unable to verify product availability. Please try again.");

      return false;
    }
  };
  const handleProcessPayment = async () => {
    setLoaders("process-payment");
    try {
      if (!orderId) throw new Error("Order ID missing");

      // Check inventory availability before processing payment
      const inventoryAvailable =
        await checkInventoryAvailability(itemsForOrder);
      if (!inventoryAvailable) {
        setLoaders(null);
        return;
      }

      const idempotencyKey = ipk || uuidv4();

      if (paymentMethod === "transfer" && proofFile) {
        const proof = await fileToBase64(proofFile);
        const res = await processPayment.run({
          params: {
            id: orderId,
          },
          body: {
            customerInfo: {
              email: userInfo.email,
              name: {
                first: userInfo.firstName,
                last: userInfo.lastName,
              },
            },
            idempotencyKey,
            payment: {
              method: "transfer",
              proof,
              idempotencyKey,
            },
          },
        });
        if (res?.success) {
          router.push(`/checkout/${orderId}/success?order_id=${orderId}`);
        } else {
          throw new Error(res?.message || "Failed to process payment");
        }
      }
      if (paymentMethod === "card") {
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
                line1: userInfo.addressLine1,
                line2: userInfo.addressLine2 || "",
                city: userInfo.city,
                state: userInfo.state,
                postal_code: userInfo.zipCode,
                country: userInfo.country,
              },
              customerEmail: userInfo.email,
              customerName: `${userInfo.firstName} ${userInfo.lastName}`,
            }),
          }
        );
        const data = await res.json();
        if (data.success) {
          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
          );
          await stripe?.redirectToCheckout({ sessionId: data.data.sessionId });
        } else {
          throw new Error(data.message || "Failed to create checkout session");
        }
      }
      if (paymentMethod === "delivery") {
        const res = await processPayment.run({
          params: {
            id: orderId,
          },
          body: {
            customerInfo: {
              email: userInfo.email,
              name: {
                first: userInfo.firstName,
                last: userInfo.lastName,
              },
            },
            idempotencyKey: idempotencyKey,
            payment: {
              method: "delivery",
              idempotencyKey: "",
            },
          },
        });
        if (res?.success) {
          router.push(`/checkout/${orderId}/success?order_id=${orderId}`);
        } else {
          throw new Error(res?.message || "Failed to process payment");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setLoaders(null);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <FaCreditCard
              className="inline-block mr-2 text-primary"
              size={20}
            />
            Credit/Debit Card (Stripe)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={paymentMethod === "transfer"}
              onChange={() => setPaymentMethod("transfer")}
            />
            <FaMoneyCheckAlt
              className="inline-block mr-2 text-primary"
              size={20}
            />
            Bank Transfer / Upload Proof
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={paymentMethod === "delivery"}
              onChange={() => setPaymentMethod("delivery")}
            />
            <FaTruck className="inline-block mr-2 text-primary" size={20} />
            Pay on Delivery
          </label>
        </div>

        {paymentMethod === "transfer" && (
          <div>
            <Label htmlFor="proof">Upload Proof of Payment</Label>
            <Input type="file" id="proof" onChange={handleFileUpload} />
          </div>
        )}

        <div className="flex justify-between mt-4">
          <Button
            disabled={processPayment.isLoading}
            variant="outline"
            onClick={() => handlePreviousStep()}
          >
            Back
          </Button>
          <Button
            disabled={processPayment.isLoading}
            size="lg"
            className="btn-hero"
            onClick={handleProcessPayment}
          >
            {processPayment.isLoading && <LoaderIcon />}
            {processPayment.isLoading ? "Processing payment ..." : "Pay Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

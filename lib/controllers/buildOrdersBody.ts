import { CartItemReady } from "@/types/user";
import { CreateOrderBody, PaymentMethod } from "@/types/order";

export function buildCreateOrderBody(
  items: CartItemReady[],
  formData: any,
  paymentMethod: PaymentMethod,
  proofMedia?: string
): CreateOrderBody{
  const base = {
    items: items.map((item) => ({
      productId: item.productId,
      variantSku: item.variantSku,
      quantity: item.quantity,
      price: item.price,
    })),
    shippingAddress: {
      line1: formData.line1 || formData.city, // default fallback
      line2: formData.line2 || "",
      city: formData.city,
      state: formData.state,
      postal: formData.zipCode,
      country: formData.country,
    },
    customerInfo: {
      name: { first: formData.firstName, last: formData.lastName },
      email: formData.email,
      phone: formData.phone || "",
    },
    payment: {
      method:paymentMethod
    }
  };

  if (paymentMethod === "transfer") {
    return {
      ...base,
      payment:{
        method:paymentMethod,
        proof:proofMedia
      }
    };
  }

  return base;
}

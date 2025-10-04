import { CartItemReady } from "@/types/user";
import { CreateOrderBody } from "@/types/order";

export function buildCreateOrderBody(
  items: CartItemReady[],
  formData: any,
): Omit<CreateOrderBody, 'idempotencyKey'>{
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
    }
  };


  return base;
}

import { CheckoutFormData, OrderPayload, PaymentMethod } from "@/types/checkout";
import { CartItemReady } from "@/types/user";

export const calculateOrderTotals = (items: CartItemReady[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping for now
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
};

export const buildCreateOrderBody = (
  items: CartItemReady[],
  formData: CheckoutFormData,
  paymentMethod: PaymentMethod
): OrderPayload => {
  const totals = calculateOrderTotals(items);

  return {
    customer: {
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
    },
    shippingAddress: {
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    },
    items: items.map(item => ({
      variantSku: item.variantSku,
      quantity: item.quantity,
      price: item.price,
    })),
    paymentMethod,
    totals,
  };
};

export const validateCheckoutForm = (formData: CheckoutFormData) => {
  const errors: Partial<Record<keyof CheckoutFormData, string>> = {};

  if (!formData.email || !formData.email.includes('@')) {
    errors.email = 'Valid email is required';
  }
  if (!formData.phone) {
    errors.phone = 'Phone number is required';
  }
  if (!formData.firstName) {
    errors.firstName = 'First name is required';
  }
  if (!formData.lastName) {
    errors.lastName = 'Last name is required';
  }
  if (!formData.city) {
    errors.city = 'City is required';
  }
  if (!formData.state) {
    errors.state = 'State is required';
  }
  if (!formData.zipCode) {
    errors.zipCode = 'ZIP code is required';
  }
  if (!formData.country) {
    errors.country = 'Country is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

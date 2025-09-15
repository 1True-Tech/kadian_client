export interface CheckoutFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  saveAddress: boolean;
}

export type PaymentMethod = "card" | "transfer" | "delivery";

export interface CardPaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface OrderPayload {
  customer: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
  shippingAddress: {
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    variantSku: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod: PaymentMethod;
  paymentDetails?: CardPaymentDetails;
  transferProof?: string;
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

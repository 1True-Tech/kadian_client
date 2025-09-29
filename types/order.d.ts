import { ProductReady } from "./product";

/**
 * Order status type definition
 */
export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "completed"
  | "cancelled";

/**
 * Payment method type definition
 */
export type PaymentMethod =
  | "card"
  | "transfer"
  | "delivery"
  | "stripe"
  | "paypal";

/**
 * Proof of payment type definition
 */
export interface PaymentProof {
  /** Cloudinary secure URL */
  secureUrl: string;
  /** Cloudinary public ID */
  publicId: string;
}

/**
 * Payment details type definition
 */
export interface Payment {
  /** Selected payment method */
  method: PaymentMethod;
  /** Payment provider */
  provider?: "stripe" | "paypal" | "transfer" | "delivery";
  /** Reference ID or transaction code */
  reference?: string;
  /** Paid amount */
  amount: number;
  /** Currency code */
  currency: string;
  /** Payment status */
  status: "initiated" | "pending" | "paid" | "failed" | "refunded";
  /** Proof of payment (for transfer) */
  proof?: {
    imageId?: string;
    filename?: string;
  };
  /** Provider-specific IDs */
  providerOrderId?: string;
  providerPaymentId?: string;
  providerCheckoutSessionId?: string;
  providerClientSecret?: string;
  /** Payment method details */
  paymentMethod?: {
    brand?: string;
    last4?: string;
    expMonth?: number;
    expYear?: number;
  };
  /** Payer information */
  payer?: {
    email?: string;
    id?: string;
  };
  /** Receipt URL */
  receiptUrl?: string;
  /** Date paid */
  paidAt?: Date;
  /** Idempotency key */
  idempotencyKey?: string;
  /** Webhook processed timestamp */
  webhookProcessedAt?: Date;
  /** Number of payment attempts */
  attempts?: number;
  /** Refund information */
  refunds?: Array<{
    id: string;
    amount: number;
    status: string;
    createdAt: Date;
  }>;
}

/**
 * Order item type definition
 */
export interface OrderItem {
  /** Sanity product ID */
  productId: string;
  /** Product variant SKU */
  variantSku: string;
  /** Quantity ordered (min: 1) */
  quantity: number;
  /** Price per unit in kobo or cents */
  price: number;
  product?:ProductReady
}

/**
 * Shipping address type definition
 */
export interface ShippingAddress {
  /** Address line 1 */
  line1: string;
  /** Address line 2 (optional) */
  line2?: string;
  /** City */
  city: string;
  /** State/Province/Region */
  state: string;
  /** Postal/ZIP code */
  postal: string;
  /** Country */
  country: string;
}

/**
 * Customer information type definition
 */
export interface CustomerInfo {
  /** Customer name (first and last) */
  name: {
    first: string;
    last: string;
  };
  /** Customer email */
  email: string;
  /** Customer phone number (optional) */
  phone?: string;
}

/**
 * Orders response data type definition
 */
export interface OrdersResponseData {
  /** MongoDB document ID */
  _id: string;
  /** User ID reference */
  userId?: string;
  /** Guest ID for non-registered users */
  guestId?: string;
  /** Order items */
  items: OrderItem[];
  /** Order status */
  status: OrderStatus;
  /** Payment information */
  payment: Payment;
  /** Payment history for audit trail */
  paymentHistory?: Array<{
    timestamp: Date;
    status: string;
    provider?: string;
    amount?: number;
    metadata?: any;
    webhookEvent?: string;
  }>;
  /** Shipping address */
  shippingAddress: ShippingAddress;
  /** Customer information */
  customer: CustomerInfo;
  /** Total order amount */
  totalAmount: number;
  /** Currency code */
  currency: string;
  /** Order creation date */
  createdAt: Date;
  /** Order last update date */
  updatedAt: Date;
  /** Order tracking information */
   tracking?: {
     carrier?: string;
     trackingNumber?: string;
     trackingUrl?: string;
     shippedAt?: Date;
     estimatedDelivery?: Date;
   };
   /** Legacy ID field */
   id?: string;
  userId: string;
  /** Total number of unique products */
  totalProducts: number;
  /** Total number of items */
  totalItems: number;
  /** Total order amount */
  totalAmount: number;
  /** Order status */
  status: OrderStatus;
  /** Order creation date */
  createdAt: Date;
  /** Order last update date */
  updatedAt: Date;
}

/**
 * Order list response type definition
 */
export interface OrderListResponse {
  /** List of orders */
  data?: OrdersResponseDetails[] | undefined;
}

/**
 * Orders response details type definition
 */
export interface OrdersResponseDetails {
  /** Order ID */
  id: string;

  /** User ID (null if guest order) */
  userId: string | null;

  /** Guest ID (present if guest order) */
  guestId: string | null;

  /** Total number of unique products */
  totalProducts: number;

  /** Total number of items */
  totalItems: number;

  /** Total order amount */
  totalAmount: number;

  /** Order status */
  status: OrderStatus;

  /** Order items */
  items?: OrderItem[];

  /** Payment details */
  payment: {
    method: string;
    reference: string | null;
    amount: number;
    status: string;
    proof?: {
      imageId: string;
      filename: string;
    };
    paidAt: string | null;
  };

  /** Shipping address */
  shippingAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal: string;
    country: string;
    _id: string;
  };

  /** Customer information */
  customerInfo: {
    name: {
      first: string;
      last: string;
    };
    email: string;
    phone: string;
  };

  /** Order creation date */
  createdAt: string;

  /** Order last update date */
  updatedAt: string;
}

/**
 * Order detail response type definition
 */
export interface OrderDetailResponse {
  /** Order details */
  data?: OrdersResponseDetails;
}

/**
 * Create order body type definition
 */
export interface CreateOrderBody {
  /** Order items */
  items: OrderItem[];
  /** Shipping address */
  shippingAddress: ShippingAddress;
  /** Customer information */
  customerInfo: CustomerInfo;
  payment: {
    method: PaymentMethod;
    proof?: string;
    idempotencyKey?: string;
  };
}

/**
 * Order create response type definition
 */
export interface OrderCreateResponse {
  data: {
    /** Created order ID */
    orderId?: string;
    /** Order status */
    statusValue?: string;
    payment: {
      method: PaymentMethod;
      proof?: string;
      idempotencyKey?: string;
    };
  };
}

/**
 * Order update body type definition
 */
export interface OrderUpdateBody {
  /** New order status */
  status: OrderStatus;
}

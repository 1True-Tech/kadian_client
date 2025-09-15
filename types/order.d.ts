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
export type PaymentMethod = "card" | "transfer" | "delivery";

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
  /** Reference ID or transaction code */
  reference?: string;
  /** Paid amount */
  amount: number;
  /** Payment status */
  status: "initiated" | "pending" | "paid" | "failed" | "refunded";
  /** Proof of payment (for transfer) */
  proof?: PaymentProof;
  /** Date paid */
  paidAt?: Date;
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
  /** Order ID */
  id: string;
  /** User ID */
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
  orders?: OrdersResponseData[];
}

/**
 * Orders response details type definition
 */
export interface OrdersResponseDetails {
  /** Order ID */
  id: string;
  /** User ID */
  userId: string;
  /** Guest ID */
  guestId: string;
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
  /** Order items */
  items: OrderItem[];
  /** Shipping address */
  shippingAddress?: ShippingAddress;
  /** Payment details */
  payment: Payment;
}

/**
 * Order detail response type definition
 */
export interface OrderDetailResponse {
  /** Order details */
  order?: OrdersResponseDetails;
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
  payment:{
    method: PaymentMethod,
    proof?: string
  }
}

/**
 * Order create response type definition
 */
export interface OrderCreateResponse {
  /** Created order ID */
  orderId?: string;
  /** Order status */
  statusValue?: string;
}

/**
 * Order update body type definition
 */
export interface OrderUpdateBody {
  /** New order status */
  status: OrderStatus;
}

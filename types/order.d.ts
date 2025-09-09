/// <reference path="./user.d.ts" />

/**
 * Order status type definition
 */
export type OrderStatus = "pending" | "paid" | "shipped" | "completed" | "cancelled";

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
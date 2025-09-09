import { OrdersResponseData } from "./order";
import { ProductReady, ProductVariantReady } from "./product";
import { AccountSettings } from "./settings";

/**
 * User roles definition
 */
export type UserRole = "admin" | "user";

/**
 * Address type definition
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

/**
 * Cart item type definition
 */
export interface CartItem {
  /** Sanity product ID */
  productId: string;
  /** Date when item was added to cart */
  addedAt?: Date;
  /** Date when cart item was last updated */
  updatedAt?: Date;
  /** Number of items */
  quantity: number;
  /** Product variant SKU */
  variantSku: string;
  /** Item price */
  price: number;
  _id?: string;
}

/**
 * Wishlist item type definition
 */
export interface WishlistItem {
  /** Sanity product ID */
  productId: string;
}

/**
 * Name type definition
 */
export interface Name {
  /** First name (1-50 characters) */
  first: string;
  /** Last name (1-50 characters) */
  last: string;
}

/**
 * User data type definition
 */
export interface UserData {
  /** User's email address (must match email format) */
  email: string;
  /** Hashed password (min 8 chars, must include uppercase, number, and symbol) */
  password: string;
  /** User's full name */
  name: Name;
  /** Phone number in E.164 format (optional) */
  phone?: string;
  /** List of user addresses */
  addresses: Address[];
  /** User's shopping cart items */
  cart: CartItem[];
  /** User's wishlist items */
  wishList: WishlistItem[];
  /** User's role ("user" or "admin") */
  role: UserRole;
  /** Hashed reset password token (optional) */
  resetPasswordTokenHash?: string;
  /** Reset token expiration date (optional) */
  resetPasswordExpires?: Date;
  /** Number of failed login attempts */
  loginAttempts: number;
  /** Account lock expiration timestamp */
  lockUntil?: number;
  /** MongoDB document ID */
  _id: string;
  orders: OrdersResponseData[];
}

// Legacy interfaces for backward compatibility
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  // password remove this in real data
  test_password: string;
  role: UserRole;
  addresses: Address[];
  orders: Order[];
  wishlist: string[];
  settings?: AccountSettings;
}

export interface CartItemReady {
  product: {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    variant: ProductVariantReady;
  };
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: CartItem[];
  shippingAddress: Address;
}

export interface OrderPreviewReady {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: CartItemReady[];
  shippingAddress: Address;
}

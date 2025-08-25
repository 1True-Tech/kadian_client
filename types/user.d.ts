import { ProductReady, ProductVariantReady } from "./product";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  // password remove this in real data
  test_password: string;
  role: UserRole; // ← added
  addresses: Address[];
  orders: Order[];
  wishlist: string[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface CartItem {
  id: string;
  variantSku: string;
  quantity: number;
  price: number;
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

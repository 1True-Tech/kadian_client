import { ProductImage } from "./product";

export interface CartItem {
  variantSku: string;
  quantity: number;
  price: number;
  name: string;
  size: string;
  color: string;
  image: ProductImage;
}

export interface CartItemReady extends CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    variant: {
      sku: string;
      price: number;
      size: string;
      color: string;
      images: ProductImage[];
    };
  };
}

export interface Address {
  name?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: CartItem[];
  shippingAddress: Address;
}

export interface OrderPreviewReady extends Omit<Order, "items"> {
  items: CartItemReady[];
}

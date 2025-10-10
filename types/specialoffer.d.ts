// types/specialOffer.d.ts
import { imageAssetWithAsset } from "@/types/structures";
import { ProductRaw, ProductReady } from "./product";

export interface SpecialOfferRaw {
  _id: string;
  title: string;
  description?: string;
  highlightColor?: {
    name: string;
    hex: string;
    rgba?: string;
  };
  slug: string;
  start_date?: string;
  end_date?: string;
  minPurchase?: number;
  maxDiscount?: number;
  category?: string;
  terms?: any; // portable text or block content type
  displayImages: (imageAssetWithAsset & { alt?: string; primary?: boolean })[];
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  products: {
    discountType: string;
    discountValue: number;
    featured: boolean;
    product: ProductRaw;
  }[];
}

export interface SpecialOfferReady
  extends Omit<
    SpecialOfferRaw,
    "products" | "displayImages"
  > {
  displayImages: { alt: string; primary: boolean; src: string | null }[];
  products: {
    discountType: string;
    discountValue: number;
    featured: boolean;
    product: ProductReady;
  }[];
}

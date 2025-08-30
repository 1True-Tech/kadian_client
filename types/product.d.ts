import { Color } from "@/types/structures";
import { imageAssetWithAlt, ReadyImage } from "./structures/image";

type Currency = "JAD" | "USD";

// Raw types (from Sanity)
export interface SizeMeasurement {
  sizeName: string;
  chest: number;
  waist: number;
  hips: number;
  inseam?: number;
}

export interface SizeGuide {
  title: string;
  category: {
    name: string;
    slug: string;
  };
  measurementInstructions: any[]; // Portable Text Block
  sizeChart: {
    units: "cm" | "in";
    measurements: SizeMeasurement[];
  };
  images?: ReadyImage[];
}

export interface Category {
  name: string;
  slug: string;
  parent?: Category;
  description?: string;
  images?: ReadyImage[];
}

export interface BrandRaw {
  name: string;
  slug: string;
  logo?: imageAssetWithAlt;
  description?: string;
}

export interface ProductImageRaw extends imageAssetWithAlt {
  primary?: boolean;
}

export interface MaterialRaw {
  material: {
    name: string;
    description: string;
    careInstructions: string[];
  };
  percentage: number;
}

export interface SanityVariant {
  _key: string;
  color: Color | null;
  images: ProductImageRaw[];
  isBase: boolean;
  price: number;
  size: {
    label: string;
    description?: string;
    measurements: {
      chest: number;
      waist: number;
      hips: number;
      length?: number;
    };
  };
  sku: string;
  stock: number;
  stockThreshold?: number;
  weight?: {
    unit: string;
    value: number;
  };
}

export interface ProductRaw {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: string;
  description: string;
  details: string;
  basePrice: number;
  brand: BrandRaw;
  category: Category;
  careInstructions: string[];
  features: string[];
  materials: MaterialRaw[];
  mainImage: ProductImageRaw;
  gallery: ProductImageRaw[];
  variants: SanityVariant[];
  sizeGuide: SizeGuide;
  tags: string[];
  isActive: boolean;
}

// Processed types (after transformation)
export interface Material {
  name: string;
  percentage: number;
}

export interface Size {
  label: string;
  description?: string;
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    length?: number;
  };
}

export interface Brand {
  name: string;
  slug: string;
  logo?: ReadyImage;
  description?: string;
}

export interface ProductVariant {
  _key: string;
  color: string;
  size: Size;
  images: ReadyImage[];
  isBase: boolean;
  price: number;
  sku: string;
  stock: number;
  stockThreshold?: number;
  weight?: {
    unit: string;
    value: number;
  };
}

export interface ProductReady {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: string;
  description: string;
  details: string;
  basePrice: number;
  brand: Brand;
  category: Category;
  careInstructions: string[];
  features: string[];
  materials: Material[];
  mainImage: ReadyImage | null;
  gallery: ReadyImage[];
  variants: ProductVariant[];
  sizeGuide: SizeGuide;
  tags: string[];
  isActive: boolean;
}

export type ProductJsonLd = {
  "@type": "Product"
  name: string
  description: string
  brand: {
    "@type": "Brand"
    name: string
  }
  offers: {
    "@type": "Offer"
    price: number
    priceCurrency: Currency
    availability: "InStock" | "OutOfStock"
  }
}

export interface ProductBase {
  _id: string
  _type: "product"
  name: string
  slug: string
  basePrice: number
  description: string
  brand: BrandSummary
  category: {
    name: string
    slug: string
  }
  mainImage: ProductImage
  gallery: ProductImage[]
  variants: ProductVariant[]
  materials: MaterialInfo[]
  sizeGuide?: {
    measurements: Record<string, number>
    instructions: string
  }
  careInstructions: string
  sustainabilityInfo?: string
  seo: ProductSEO
  isActive: boolean
  createdAt: string
  updatedAt: string
}
export interface ProductRaw extends ProductBase{
    mainImage: ProductImageRaw;
  brand: BrandSummaryRaw;
  mainImage: ProductImageRaw;
  gallery: ProductImageRaw[];
  variants: ProductVariantRaw[];

}
export interface ProductReady extends Omit<ProductBase, "_type">{
  brand: BrandSummaryReady;
  mainImage: Partial<ProductImageReady>;
  gallery: ProductImageReady[];
  variants: ProductVariantReady[];

}


export interface ProductCardDataBase {
  name: string;
  slug: string;
  price: number;
  discount?:DiscountInfo;
}
export interface ProductCardDataRaw extends ProductCardDataBase {
  image: imageAssetWithAlt;
}
export interface ProductCardDataReady extends ProductCardDataBase {
  image: ReadyImage;
}

// Price range type
export type PriceRange = {
  min: number
  max: number
  currency: Currency
}

// Stock status type
export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'

// Size category type
export type SizeCategory = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

// Product status type
export type ProductStatus = 'draft' | 'active' | 'archived'

// Discount type
export type DiscountInfo = {
  type: 'percentage' | 'fixed' | 'special'
  value: number
  startDate?: string
  endDate?: string
}
// Price validation type
export type PriceValidation = {
  minPrice: 100
  maxPrice: 1000000
  increment: 100
}

// Stock validation type
export type StockValidation = {
  minStock: 0
  lowStockThreshold: 5
  maxStock: 1000
}

// Material percentage validation
export type MaterialValidation = {
  minPercentage: 1
  maxPercentage: 100
  totalPercentage: 100
}

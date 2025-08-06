type Currency = "JAD" | "USD";
export type ProductVariant = {
  sku: string
  size: string
  color: string
  stock: number
  price: number
  images: ProductImage[],
  isBase?: boolean
}

export type ProductImage = {
  url: string
  alt: string
  isPrimary?: boolean
}

export type BrandSummary = {
  name: string
  slug: string
  logo?: ProductImage
}

export type MaterialInfo = {
  material: string
  percentage: number
}

export type ProductSEO = {
  title: string
  description: string
  keywords: string[]
  structuredData: ProductJsonLd
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

export interface Product {
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


export interface ProductCardData {
  name: string;
  slug: string;
  price: number;
  discount?:DiscountInfo;
  image: {
    src: string;
    alt: string;
  };
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

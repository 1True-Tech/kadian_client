// Mock data for Kadian Fashion eCommerce

import { ProductReady } from "@/types/product";
import { User } from "@/types/user";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export const mockProducts: ProductReady[] = [
  {
    _id: "prod-001",
    name: "Silk Wrap Dress",
    slug: "silk-wrap-dress",
    basePrice: 149.99,
    description:
      "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
    brand: {
      name: "Maison Luxe",
      slug: "maison-luxe",
      logo: {
        src: "/images/brands/maison-luxe.png",
        alt: "Maison Luxe Logo",
      },
    },
    category: {
      name: "Dresses",
      slug: "dresses",
    },
    mainImage: {
      src: "/images/content/image (1).jpg",
      alt: "Front view of Silk Wrap Dress",
      isPrimary: true,
    },
    gallery: [
      {
        src: "/images/content/image (1).jpg",
        alt: "Front view of Silk Wrap Dress",
        isPrimary: true,
      },
      {
        src: "/images/content/image (2).jpg",
        alt: "Back view of Silk Wrap Dress",
      },
    ],
    variants: [
      {
        sku: "SWD-BLK-M",
        size: "M",
        color: "Black",
        stock: 12,
        price: 149.99,
        isBase: true,
        images: [
          {
            src: "/images/content/image (1).jpg",
            alt: "Black Silk Wrap Dress",
            isPrimary: true,
          },
        ],
      },
      {
        sku: "SWD-NAV-M",
        size: "M",
        color: "Navy",
        stock: 7,
        price: 149.99,
        images: [
          {
            src: "/images/content/image (11).jpg",
            alt: "Navy Silk Wrap Dress",
          },
        ],
      },
    ],
    materials: [
      {
        material: "Silk",
        percentage: 100,
      },
    ],
    sizeGuide: {
      measurements: {
        bust: 88,
        waist: 68,
        hips: 94,
      },
      instructions: "Measurements are in cm. Choose your usual size.",
    },
    careInstructions: "Dry clean only. Do not tumble dry. Iron on low heat.",
    sustainabilityInfo: "Made with 100% organic silk and fair labor practices.",
    seo: {
      title: "Silk Wrap Dress - Maison Luxe",
      description:
        "Shop the Silk Wrap Dress from Maison Luxe. Luxurious design and comfort.",
      keywords: ["silk", "wrap", "dress", "luxury", "fashion"],
      structuredData: {
        "@type": "Product",
        name: "Silk Wrap Dress",
        description:
          "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
        brand: {
          "@type": "Brand",
          name: "Maison Luxe",
        },
        offers: {
          "@type": "Offer",
          price: 149.99,
          priceCurrency: "USD",
          availability: "InStock",
        },
      },
    },
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-03-01T15:30:00Z",
  },
  {
    _id: "prod-002",
    name: "Cotton Maxi Dress",
    slug: "cotton-maxi-dress",
    basePrice: 149.99,
    description:
      "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
    brand: {
      name: "Maison Luxe",
      slug: "maison-luxe",
      logo: {
        src: "/images/brands/maison-luxe.png",
        alt: "Maison Luxe Logo",
      },
    },
    category: {
      name: "Dresses",
      slug: "dresses",
    },
    mainImage: {
      src: "/images/content/image (1).jpg",
      alt: "Front view of Silk Wrap Dress",
      isPrimary: true,
    },
    gallery: [
      {
        src: "/images/content/image (1).jpg",
        alt: "Front view of Silk Wrap Dress",
        isPrimary: true,
      },
      {
        src: "/images/content/image (2).jpg",
        alt: "Back view of Silk Wrap Dress",
      },
    ],
    variants: [
      {
        sku: "SWD-BLK-M",
        size: "M",
        color: "Black",
        stock: 12,
        price: 149.99,
        isBase: true,
        images: [
          {
            src: "/images/content/image (1).jpg",
            alt: "Black Silk Wrap Dress",
            isPrimary: true,
          },
        ],
      },
      {
        sku: "SWD-NAV-M",
        size: "M",
        color: "Navy",
        stock: 7,
        price: 149.99,
        images: [
          {
            src: "/images/content/image (11).jpg",
            alt: "Navy Silk Wrap Dress",
          },
        ],
      },
    ],
    materials: [
      {
        material: "Silk",
        percentage: 100,
      },
    ],
    sizeGuide: {
      measurements: {
        bust: 88,
        waist: 68,
        hips: 94,
      },
      instructions: "Measurements are in cm. Choose your usual size.",
    },
    careInstructions: "Dry clean only. Do not tumble dry. Iron on low heat.",
    sustainabilityInfo: "Made with 100% organic silk and fair labor practices.",
    seo: {
      title: "Cotton Maxi Dress - Maison Luxe",
      description:
        "Shop the Cotton Maxi Dress from Maison Luxe. Luxurious design and comfort.",
      keywords: ["cotton", "maxi", "dress", "luxury", "fashion"],
      structuredData: {
        "@type": "Product",
        name: "Cotton Maxi Dress",
        description:
          "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
        brand: {
          "@type": "Brand",
          name: "Maison Luxe",
        },
        offers: {
          "@type": "Offer",
          price: 149.99,
          priceCurrency: "USD",
          availability: "InStock",
        },
      },
    },
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-03-01T15:30:00Z",
  },
  {
    _id: "prod-003",
    name: "Knit Sweater",
    slug: "knit-sweater",
    basePrice: 149.99,
    description:
      "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
    brand: {
      name: "Maison Luxe",
      slug: "maison-luxe",
      logo: {
        src: "/images/brands/maison-luxe.png",
        alt: "Maison Luxe Logo",
      },
    },
    category: {
      name: "Dresses",
      slug: "dresses",
    },
    mainImage: {
      src: "/images/content/image (1).jpg",
      alt: "Front view of Silk Wrap Dress",
      isPrimary: true,
    },
    gallery: [
      {
        src: "/images/content/image (1).jpg",
        alt: "Front view of Silk Wrap Dress",
        isPrimary: true,
      },
      {
        src: "/images/content/image (2).jpg",
        alt: "Back view of Silk Wrap Dress",
      },
    ],
    variants: [
      {
        sku: "SWD-BLK-M",
        size: "M",
        color: "Black",
        stock: 12,
        price: 149.99,
        isBase: true,
        images: [
          {
            src: "/images/content/image (1).jpg",
            alt: "Black Silk Wrap Dress",
            isPrimary: true,
          },
        ],
      },
      {
        sku: "SWD-NAV-M",
        size: "M",
        color: "Navy",
        stock: 7,
        price: 149.99,
        images: [
          {
            src: "/images/content/image (11).jpg",
            alt: "Navy Silk Wrap Dress",
          },
        ],
      },
    ],
    materials: [
      {
        material: "Silk",
        percentage: 100,
      },
    ],
    sizeGuide: {
      measurements: {
        bust: 88,
        waist: 68,
        hips: 94,
      },
      instructions: "Measurements are in cm. Choose your usual size.",
    },
    careInstructions: "Dry clean only. Do not tumble dry. Iron on low heat.",
    sustainabilityInfo: "Made with 100% organic silk and fair labor practices.",
    seo: {
      title: "Knit Sweater - Maison Luxe",
      description:
        "Shop the Knit Sweater from Maison Luxe. Luxurious design and comfort.",
      keywords: ["knit", "sweater", "luxury", "fashion"],
      structuredData: {
        "@type": "Product",
        name: "Knit Sweater",
        description:
          "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
        brand: {
          "@type": "Brand",
          name: "Maison Luxe",
        },
        offers: {
          "@type": "Offer",
          price: 149.99,
          priceCurrency: "USD",
          availability: "InStock",
        },
      },
    },
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-03-01T15:30:00Z",
  },
  {
    _id: "prod-004",
    name: "Wide Leg Trousers",
    slug: "wide-leg-trousers",
    basePrice: 149.99,
    description:
      "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
    brand: {
      name: "Maison Luxe",
      slug: "maison-luxe",
      logo: {
        src: "/images/brands/maison-luxe.png",
        alt: "Maison Luxe Logo",
      },
    },
    category: {
      name: "Dresses",
      slug: "dresses",
    },
    mainImage: {
      src: "/images/content/image (1).jpg",
      alt: "Front view of Silk Wrap Dress",
      isPrimary: true,
    },
    gallery: [
      {
        src: "/images/content/image (1).jpg",
        alt: "Front view of Silk Wrap Dress",
        isPrimary: true,
      },
      {
        src: "/images/content/image (2).jpg",
        alt: "Back view of Silk Wrap Dress",
      },
    ],
    variants: [
      {
        sku: "SWD-BLK-M",
        size: "M",
        color: "Black",
        stock: 12,
        price: 149.99,
        isBase: true,
        images: [
          {
            src: "/images/content/image (1).jpg",
            alt: "Black Silk Wrap Dress",
            isPrimary: true,
          },
        ],
      },
      {
        sku: "SWD-NAV-M",
        size: "M",
        color: "Navy",
        stock: 7,
        price: 149.99,
        images: [
          {
            src: "/images/content/image (11).jpg",
            alt: "Navy Silk Wrap Dress",
          },
        ],
      },
    ],
    materials: [
      {
        material: "Silk",
        percentage: 100,
      },
    ],
    sizeGuide: {
      measurements: {
        bust: 88,
        waist: 68,
        hips: 94,
      },
      instructions: "Measurements are in cm. Choose your usual size.",
    },
    careInstructions: "Dry clean only. Do not tumble dry. Iron on low heat.",
    sustainabilityInfo: "Made with 100% organic silk and fair labor practices.",
    seo: {
      title: "Wide Leg Trousers - Maison Luxe",
      description:
        "Shop the Wide Leg Trousers from Maison Luxe. Luxurious design and comfort.",
      keywords: ["wide", "leg", "trousers", "luxury", "fashion"],
      structuredData: {
        "@type": "Product",
        name: "Wide Leg Trousers",
        description:
          "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
        brand: {
          "@type": "Brand",
          name: "Maison Luxe",
        },
        offers: {
          "@type": "Offer",
          price: 149.99,
          priceCurrency: "USD",
          availability: "InStock",
        },
      },
    },
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-03-01T15:30:00Z",
  },
  {
    _id: "prod-005",
    name: "Blazer Jacket",
    slug: "blazer-jacket",
    basePrice: 149.99,
    description:
      "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
    brand: {
      name: "Maison Luxe",
      slug: "maison-luxe",
      logo: {
        src: "/images/brands/maison-luxe.png",
        alt: "Maison Luxe Logo",
      },
    },
    category: {
      name: "Dresses",
      slug: "dresses",
    },
    mainImage: {
      src: "/images/content/image (1).jpg",
      alt: "Front view of Silk Wrap Dress",
      isPrimary: true,
    },
    gallery: [
      {
        src: "/images/content/image (1).jpg",
        alt: "Front view of Silk Wrap Dress",
        isPrimary: true,
      },
      {
        src: "/images/content/image (2).jpg",
        alt: "Back view of Silk Wrap Dress",
      },
    ],
    variants: [
      {
        sku: "SWD-BLK-M",
        size: "M",
        color: "Black",
        stock: 12,
        price: 149.99,
        isBase: true,
        images: [
          {
            src: "/images/content/image (1).jpg",
            alt: "Black Silk Wrap Dress",
            isPrimary: true,
          },
        ],
      },
      {
        sku: "SWD-NAV-M",
        size: "M",
        color: "Navy",
        stock: 7,
        price: 149.99,
        images: [
          {
            src: "/images/content/image (11).jpg",
            alt: "Navy Silk Wrap Dress",
          },
        ],
      },
    ],
    materials: [
      {
        material: "Silk",
        percentage: 100,
      },
    ],
    sizeGuide: {
      measurements: {
        bust: 88,
        waist: 68,
        hips: 94,
      },
      instructions: "Measurements are in cm. Choose your usual size.",
    },
    careInstructions: "Dry clean only. Do not tumble dry. Iron on low heat.",
    sustainabilityInfo: "Made with 100% organic silk and fair labor practices.",
    seo: {
      title: "Blazer Jacket - Maison Luxe",
      description:
        "Shop the Blazer Jacket from Maison Luxe. Luxurious design and comfort.",
      keywords: ["blazer", "jacket", "luxury", "fashion"],
      structuredData: {
        "@type": "Product",
        name: "Blazer Jacket",
        description:
          "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
        brand: {
          "@type": "Brand",
          name: "Maison Luxe",
        },
        offers: {
          "@type": "Offer",
          price: 149.99,
          priceCurrency: "USD",
          availability: "InStock",
        },
      },
    },
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-03-01T15:30:00Z",
  },
  {
    _id: "prod-006",
    name: "Floral Kids Dress",
    slug: "floral-kids-dress",
    basePrice: 149.99,
    description:
      "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
    brand: {
      name: "Maison Luxe",
      slug: "maison-luxe",
      logo: {
        src: "/images/brands/maison-luxe.png",
        alt: "Maison Luxe Logo",
      },
    },
    category: {
      name: "Dresses",
      slug: "dresses",
    },
    mainImage: {
      src: "/images/content/image (1).jpg",
      alt: "Front view of Silk Wrap Dress",
      isPrimary: true,
    },
    gallery: [
      {
        src: "/images/content/image (1).jpg",
        alt: "Front view of Silk Wrap Dress",
        isPrimary: true,
      },
      {
        src: "/images/content/image (2).jpg",
        alt: "Back view of Silk Wrap Dress",
      },
    ],
    variants: [
      {
        sku: "SWD-BLK-M",
        size: "M",
        color: "Black",
        stock: 12,
        price: 149.99,
        isBase: true,
        images: [
          {
            src: "/images/content/image (1).jpg",
            alt: "Black Silk Wrap Dress",
            isPrimary: true,
          },
        ],
      },
      {
        sku: "SWD-NAV-M",
        size: "M",
        color: "Navy",
        stock: 7,
        price: 149.99,
        images: [
          {
            src: "/images/content/image (11).jpg",
            alt: "Navy Silk Wrap Dress",
          },
        ],
      },
    ],
    materials: [
      {
        material: "Silk",
        percentage: 100,
      },
    ],
    sizeGuide: {
      measurements: {
        bust: 88,
        waist: 68,
        hips: 94,
      },
      instructions: "Measurements are in cm. Choose your usual size.",
    },
    careInstructions: "Dry clean only. Do not tumble dry. Iron on low heat.",
    sustainabilityInfo: "Made with 100% organic silk and fair labor practices.",
    seo: {
      title: "Floral Kids Dress - Maison Luxe",
      description:
        "Shop the Floral Kids Dress from Maison Luxe. Luxurious design and comfort.",
      keywords: ["floral", "kids", "dress", "luxury", "fashion"],
      structuredData: {
        "@type": "Product",
        name: "Floral Kids Dress",
        description:
          "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
        brand: {
          "@type": "Brand",
          name: "Maison Luxe",
        },
        offers: {
          "@type": "Offer",
          price: 149.99,
          priceCurrency: "USD",
          availability: "InStock",
        },
      },
    },
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-03-01T15:30:00Z",
  },
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: "dresses",
    name: "Dresses",
    slug: "dresses",
    image: "/images/content/image (1).jpg",
    description: "Elegant dresses for every occasion",
    productCount: 45,
  },
  {
    id: "tops",
    name: "Tops",
    slug: "tops",
    image: "/images/content/image (2).jpg",
    description: "Stylish tops and blouses",
    productCount: 62,
  },
  {
    id: "bottoms",
    name: "Bottoms",
    slug: "bottoms",
    image: "/images/content/image (3).jpg",
    description: "Pants, skirts and shorts",
    productCount: 38,
  },
  {
    id: "outerwear",
    name: "Outerwear",
    slug: "outerwear",
    image: "/images/content/image (4).jpg",
    description: "Coats, jackets and blazers",
    productCount: 24,
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    image: "/images/content/image (5).jpg",
    description: "Fashion for little ones",
    productCount: 56,
  },
];

// Mock User Data

const sharedAddress = {
  id: "addr-001",
  name: "Home",
  street: "123 Fashion Ave",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "United States",
  isDefault: true,
};

export const mockUsers: User[] = [
  {
    id: "admin-001",
    firstName: "Kadian",
    lastName: "Fashion",
    email: "admin@kadian.com",
    phone: "+1 (555) 987-6543",
    test_password: "admin123",
    role: "admin",
    addresses: [
      {
        ...sharedAddress,
        id: "addr-999",
        name: "HQ",
        street: "1 Admin Plaza",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
      },
    ],
    orders: [],
    wishlist: [],
  },
  {
    id: "user-001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    test_password: "user123",
    role: "user",
    addresses: [sharedAddress],
    orders: [
      {
        id: "order-001",
        date: "2024-01-15",
        status: "delivered",
        total: 239.98,
        items: [
          {
            id: "prod-001",
            variantSku:"SWD-BLK-M",
            quantity: 1,
            price: 149.99,
          },
          {
            id: "prod-004",
            variantSku:"SWD-BLK-M",
            quantity: 1,
            price: 89.99,
          },
        ],
        shippingAddress: sharedAddress,
      },
    ],
    wishlist: ["prod-003", "prod-004"],
  },
];

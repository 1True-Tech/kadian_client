export const dummyProducts = [
  {
    _id: "prod_001",
    _type: "product",
    name: "Classic Leather Jacket",
    slug: "classic-leather-jacket",
    basePrice: 250,
    description: "Timeless leather jacket with a sleek silhouette.",
    brand: {
      name: "Urban Edge",
      slug: "urban-edge",
      logo: {
        src: "/icon.jpg",
        alt: "Urban Edge Logo",
      }
    },
    category: {
      name: "Outerwear",
      slug: "outerwear"
    },
    mainImage: {
      src: "/images/content/image (1).jpg",
      alt: "Classic Leather Jacket Front View"
    },
    gallery: [
      { src: "/images/content/image (1).jpg", alt: "Side View" },
      { src: "/images/content/image (2).jpg", alt: "Back View" }
    ],
    variants: [
      {
        sku: "CLJ-BLACK-M",
        size: "M",
        color: "Black",
        stock: 10,
        price: 250,
        isBase: true,
        images: [
          {
            url: "/images/content/image (1).jpg",
            alt: "Black Medium Jacket",
            isPrimary: true
          }
        ]
      }
    ],
    materials: [
      { material: "Leather", percentage: 100 }
    ],
    careInstructions: "Dry clean only.",
    seo: {
      title: "Classic Leather Jacket | Urban Edge",
      description: "Stylish and durable leather jacket for every season.",
      keywords: ["leather", "jacket", "urban", "outerwear"],
      structuredData: {
        "@type": "Product",
        name: "Classic Leather Jacket",
        description: "Timeless leather jacket with a sleek silhouette.",
        brand: {
          "@type": "Brand",
          name: "Urban Edge"
        },
        offers: {
          "@type": "Offer",
          price: 250,
          priceCurrency: "USD",
          availability: "InStock"
        }
      }
    },
    isActive: true,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-06-01T00:00:00.000Z"
  },

  {
    _id: "prod_002",
    _type: "product",
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-tshirt",
    basePrice: 35,
    description: "Soft, breathable, and eco-friendly T-shirt.",
    brand: {
      name: "EcoWear",
      slug: "ecowear",
      logo: {
        src: "/icon.jpg",
        alt: "EcoWear Logo"
      }
    },
    category: {
      name: "T-Shirts",
      slug: "t-shirts"
    },
    mainImage: {
      src: "/images/content/image (3).jpg",
      alt: "White Organic T-Shirt"
    },
    gallery: [
      { src: "/images/content/image (3).jpg", alt: "Side View" },
      { src: "/images/content/image (4).jpg", alt: "Back View" }
    ],
    variants: [
      {
        sku: "OCT-WHITE-L",
        size: "L",
        color: "White",
        stock: 30,
        price: 35,
        images: [
          {
            src: "/images/content/image (3).jpg",
            alt: "White T-shirt Large",
            isPrimary: true
          }
        ]
      }
    ],
    materials: [
      { material: "Organic Cotton", percentage: 100 }
    ],
    careInstructions: "Machine wash cold, tumble dry low.",
    seo: {
      title: "Organic Cotton T-Shirt | EcoWear",
      description: "Comfortable and sustainable T-shirt made from 100% organic cotton.",
      keywords: ["cotton", "organic", "t-shirt", "eco"],
      structuredData: {
        "@type": "Product",
        name: "Organic Cotton T-Shirt",
        description: "Soft, breathable, and eco-friendly T-shirt.",
        brand: {
          "@type": "Brand",
          name: "EcoWear"
        },
        offers: {
          "@type": "Offer",
          price: 35,
          priceCurrency: "USD",
          availability: "InStock"
        }
      }
    },
    isActive: true,
    createdAt: "2025-02-10T00:00:00.000Z",
    updatedAt: "2025-08-01T00:00:00.000Z"
  },

  {
    _id: "prod_003",
    _type: "product",
    name: "Denim Jeans Slim Fit",
    slug: "denim-jeans-slim",
    basePrice: 60,
    description: "Stretchable slim-fit denim jeans.",
    brand: {
      name: "StreetFlex",
      slug: "streetflex",
      logo: {
        src: "/icon.jpg",
        alt: "StreetFlex Logo"
      }
    },
    category: {
      name: "Jeans",
      slug: "jeans"
    },
    mainImage: {
      src: "/images/content/image (5).jpg",
      alt: "Slim Fit Jeans"
    },
    gallery: [
      { src: "/images/content/image (5).jpg", alt: "Side View" },
      { src: "/images/content/image (6).jpg", alt: "Back View" }
    ],
    variants: [
      {
        sku: "DJ-BLUE-32",
        size: "32",
        color: "Blue",
        stock: 5,
        price: 60,
        images: [
          {
            src: "/images/content/image (5).jpg",
            alt: "Blue Slim Jeans",
            isPrimary: true
          }
        ]
      }
    ],
    materials: [
      { material: "Cotton", percentage: 98 },
      { material: "Elastane", percentage: 2 }
    ],
    careInstructions: "Wash inside out with like colors.",
    seo: {
      title: "Slim Fit Denim Jeans | StreetFlex",
      description: "Comfortable stretch denim for modern urban style.",
      keywords: ["jeans", "denim", "slim", "blue"],
      structuredData: {
        "@type": "Product",
        name: "Denim Jeans Slim Fit",
        description: "Stretchable slim-fit denim jeans.",
        brand: {
          "@type": "Brand",
          name: "StreetFlex"
        },
        offers: {
          "@type": "Offer",
          price: 60,
          priceCurrency: "USD",
          availability: "InStock"
        }
      }
    },
    isActive: true,
    createdAt: "2025-03-15T00:00:00.000Z",
    updatedAt: "2025-08-05T00:00:00.000Z"
  },

  {
    _id: "prod_004",
    _type: "product",
    name: "Wool Winter Scarf",
    slug: "wool-winter-scarf",
    basePrice: 45,
    description: "Soft wool scarf to keep you warm during winter.",
    brand: {
      name: "WarmThreads",
      slug: "warmthreads",
      logo: {
        src: "/icon.jpg",
        alt: "WarmThreads Logo"
      }
    },
    category: {
      name: "Accessories",
      slug: "accessories"
    },
    mainImage: {
      src: "/images/content/image (7).jpg",
      alt: "Gray Wool Scarf"
    },
    gallery: [
      { src: "/images/content/image (7).jpg", alt: "Side View" },
      { src: "/images/content/image (8).jpg", alt: "Back View" }
    ],
    variants: [
      {
        sku: "WWS-GRAY-ONE",
        size: "One Size",
        color: "Gray",
        stock: 20,
        price: 45,
        images: [
          {
            src: "/images/content/image (7).jpg",
            alt: "Gray Wool Scarf",
            isPrimary: true
          }
        ]
      }
    ],
    materials: [
      { material: "Wool", percentage: 100 }
    ],
    careInstructions: "Hand wash cold, lay flat to dry.",
    seo: {
      title: "Wool Winter Scarf | WarmThreads",
      description: "Warm and stylish wool scarf for chilly days.",
      keywords: ["scarf", "wool", "winter", "accessories"],
      structuredData: {
        "@type": "Product",
        name: "Wool Winter Scarf",
        description: "Soft wool scarf to keep you warm during winter.",
        brand: {
          "@type": "Brand",
          name: "WarmThreads"
        },
        offers: {
          "@type": "Offer",
          price: 45,
          priceCurrency: "USD",
          availability: "InStock"
        }
      }
    },
    isActive: true,
    createdAt: "2025-01-25T00:00:00.000Z",
    updatedAt: "2025-07-01T00:00:00.000Z"
  }
];

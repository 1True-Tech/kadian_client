// Mock data for Kadian Fashion eCommerce

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

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
  shippingAddress: Address;
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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[];
}

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Silk Wrap Dress",
    price: 149.99,
    originalPrice: 199.99,
    category: "dresses",
    subcategory: "evening",
    images: ["/images/content/image (1).jpg", "/images/content/image (2).jpg"],
    description: "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette and luxurious feel.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"],
    inStock: true,
    isOnSale: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: "2",
    name: "Cotton Maxi Dress",
    price: 89.99,
    category: "dresses",
    subcategory: "casual",
    images: ["/images/content/image (3).jpg", "/images/content/image (4).jpg"],
    description: "Comfortable cotton maxi dress for everyday elegance.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Beige", "Olive"],
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: "3",
    name: "Knit Sweater",
    price: 79.99,
    category: "tops",
    subcategory: "sweaters",
    images: ["/images/content/image (5).jpg", "/images/content/image (6).jpg"],
    description: "Cozy knit sweater with premium wool blend.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Cream", "Gray", "Rose"],
    inStock: true,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: "4",
    name: "Wide Leg Trousers",
    price: 119.99,
    category: "bottoms",
    subcategory: "pants",
    images: ["/images/content/image (7).jpg", "/images/content/image (8).jpg"],
    description: "High-waisted wide leg trousers for sophisticated style.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Camel"],
    inStock: true,
    rating: 4.5,
    reviewCount: 67
  },
  {
    id: "5",
    name: "Kids Floral Dress",
    price: 45.99,
    category: "kids",
    subcategory: "dresses",
    images: ["/images/content/image (9).jpg", "/images/content/image (10).jpg"],
    description: "Beautiful floral dress for little ones.",
    sizes: ["2T", "3T", "4T", "5T", "6T"],
    colors: ["Pink", "Blue", "Yellow"],
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 34
  },
  {
    id: "6",
    name: "Blazer Jacket",
    price: 159.99,
    category: "outerwear",
    subcategory: "blazers",
    images: ["/images/content/image (1).jpg", "/images/content/image (2).jpg"],
    description: "Tailored blazer perfect for professional and casual wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Camel"],
    inStock: true,
    rating: 4.8,
    reviewCount: 92
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: "dresses",
    name: "Dresses",
    slug: "dresses",
    image: "/images/content/image (1).jpg",
    description: "Elegant dresses for every occasion",
    productCount: 45
  },
  {
    id: "tops",
    name: "Tops",
    slug: "tops",
    image: "/images/content/image (2).jpg",
    description: "Stylish tops and blouses",
    productCount: 62
  },
  {
    id: "bottoms",
    name: "Bottoms",
    slug: "bottoms",
    image: "/images/content/image (3).jpg",
    description: "Pants, skirts and shorts",
    productCount: 38
  },
  {
    id: "outerwear",
    name: "Outerwear",
    slug: "outerwear",
    image: "/images/content/image (4).jpg",
    description: "Coats, jackets and blazers",
    productCount: 24
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    image: "/images/content/image (5).jpg",
    description: "Fashion for little ones",
    productCount: 56
  }
];

// Mock User Data
export const mockUser: User = {
  id: "user-1",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  addresses: [
    {
      id: "addr-1",
      name: "Home",
      street: "123 Fashion Ave",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true
    }
  ],
  orders: [
    {
      id: "order-1",
      date: "2024-01-15",
      status: "delivered",
      total: 239.98,
      items: [
        {
          id: "item-1",
          productId: "1",
          name: "Silk Wrap Dress",
          price: 149.99,
          image: "/images/content/image (2).jpg",
          size: "M",
          color: "Black",
          quantity: 1
        }
      ],
      shippingAddress: {
        id: "addr-1",
        name: "Home",
        street: "123 Fashion Ave",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States"
      }
    }
  ],
  wishlist: ["2", "3"]
};
import { DashboardMetric } from "@/app/api/admin/route";
import { LoginRequestBody, LoginSuccessResponse } from "@/app/api/auth/login/route";
import { CartItemResponse } from "@/app/api/auth/me/cart/[id]/route";
import { CartResponse } from "@/app/api/auth/me/cart/route";
import { RegisterRequestBody, RegisterSuccessResponse } from "@/app/api/auth/register/route";
import { InventoryGetResponse, InventoryItem, InventoryItemsResponse, InventoryPutResponse, InventoryStockUpdateResponse, InventoryVariantResponse } from "@/types/inventory";
import { CreateOrderBody, OrderCreateResponse, OrderDetailResponse, OrderListResponse, OrderUpdateBody } from "@/types/order";
import { GeneralResponse } from "@/types/structures";
import { CartItem, UserData, UserDataMini } from "@/types/user";

// Utility: extract :params from paths
export type PathParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof PathParams<Rest>]: string }
    : Path extends `${string}:${infer Param}`
      ? { [k in Param]: string }
      : {};

export const routes = {
  // --- AUTH ---
  login: {
    method: "POST",
    path: "/api/auth/login",
    body: {} as LoginRequestBody,
    response: {} as LoginSuccessResponse,
  },
  register: {
    method: "POST",
    path: "/api/auth/register",
    body: {} as RegisterRequestBody,
    response: {} as RegisterSuccessResponse,
  },
  getMe: {
    method: "GET",
    path: "/api/auth/me",
    response: {} as GeneralResponse & { data?: UserData },
  },
  updateMe: {
    method: "PATCH",
    path: "/api/auth/me",
    body: {} as Partial<Omit<UserData, "_id" | "id" | "role">>,
    response: {} as GeneralResponse,
  },
  deleteMe: {
    method: "DELETE",
    path: "/api/auth/me",
    response: {} as GeneralResponse,
  },

  // --- CART ---
  getCart: {
    method: "GET",
    path: "/api/auth/me/cart",
    response: {} as CartResponse,
  },
  updateCart: {
    method: "PATCH",
    path: "/api/auth/me/cart",
    body: {} as {updateData: CartItem[]},
    response: {} as CartResponse,
  },
  clearCart: {
    method: "DELETE",
    path: "/api/auth/me/cart",
    response: {} as GeneralResponse,
  },
  getCartItem: {
    method: "GET",
    path: "/api/auth/me/cart/:id",
    params: {} as { id: string },
    response: {} as CartItemResponse,
  },
  updateCartItem: {
    method: "PATCH",
    path: "/api/auth/me/cart/:id",
    params: {} as { id: string },
    body: {} as {data:{
      increment?:number, quantity?:number
    }},
    response: {} as CartItemResponse,
  },
  deleteCartItem: {
    method: "DELETE",
    path: "/api/auth/me/cart/:id",
    params: {} as { id: string },
    response: {} as GeneralResponse,
  },

  // --- INVENTORY ---
  getInventoryData: {
    method: "GET",
    path: "/api/inventory",
    response: {} as InventoryItemsResponse & GeneralResponse,
  },
  refreshInventory: {
    method: "POST",
    path: "/api/inventory/_refresh",
    response: {} as InventoryItemsResponse & GeneralResponse,
  },
  getInventoryByProduct: {
    method: "GET",
    path: "/api/inventory/:productId",
    params: {} as { productId: string },
    response: {} as InventoryGetResponse & GeneralResponse,
  },
  updateInventoryData: {
    method: "PATCH",
    path: "/api/inventory/:productId",
    params: {} as { productId: string },
    body: {} as Partial<InventoryItem>,
    response: {} as InventoryPutResponse & GeneralResponse,
  },
  getInventoryVariant: {
    method: "GET",
    path: "/api/inventory/:productId/:sku",
    params: {} as { productId: string; sku: string },
    response: {} as InventoryVariantResponse & GeneralResponse,
  },
  updateInventoryStock: {
    method: "PATCH",
    path: "/api/inventory/:productId/:sku/stock",
    params: {} as { productId: string; sku: string },
    body: {} as { stock: number },
    response: {} as InventoryStockUpdateResponse & GeneralResponse,
  },

  // --- ORDERS ---
  getAllOrders: {
    method: "GET",
    path: "/api/orders",
    response: {} as OrderListResponse & GeneralResponse,
  },
  getMyOrders: {
    method: "GET",
    path: "/api/orders-by-user",
    response: {} as OrderListResponse & GeneralResponse,
  },
  createOrder: {
    method: "POST",
    path: "/api/orders",
    body: {} as CreateOrderBody,
    response: {} as OrderCreateResponse & GeneralResponse,
  },
  getOrder: {
    method: "GET",
    path: "/api/orders/:id",
    params: {} as { id: string },
    response: {} as OrderDetailResponse & GeneralResponse,
  },
  updateOrder: {
    method: "PATCH",
    path: "/api/orders/:id",
    params: {} as { id: string },
    body: {} as OrderUpdateBody,
    response: {} as GeneralResponse,
  },
  cancelOrder: {
    method: "DELETE",
    path: "/api/orders/:id/cancel",
    params: {} as { id: string },
    response: {} as GeneralResponse,
  },
  deleteOrder: {
    method: "DELETE",
    path: "/api/orders/:id",
    params: {} as { id: string },
    response: {} as GeneralResponse,
  },

  // --- WISHLIST ---
  getWishlist: {
    method: "GET",
    path: "/api/auth/me/wishlist",
    response: {} as GeneralResponse & { data?: any[] },
  },
  updateWishlist: {
    method: "PATCH",
    path: "/api/auth/me/wishlist",
    body: {} as { updateData:{
      productId: string
    }[]},
    response: {} as GeneralResponse & { data?: any[] },
  },
  clearWishlist: {
    method: "DELETE",
    path: "/api/auth/me/wishlist",
    response: {} as GeneralResponse,
  },
  getWishlistItem: {
    method: "GET",
    path: "/api/auth/me/wishlist/:id",
    params: {} as { id: string },
    response: {} as GeneralResponse & { data?: any },
  },
  deleteWishlistItem: {
    method: "DELETE",
    path: "/api/auth/me/wishlist/:id",
    params: {} as { id: string },
    response: {} as GeneralResponse,
  },

  // --- ADMIN DASHBOARD ---
  getAdminDashboard: {
    method: "GET",
    path: "/api/admin",
    response: {} as GeneralResponse & { data?: DashboardMetric },
  },
  // --- ADMIN USER MANAGEMENT ---
  getUsers: {
    method: "GET",
    path: "/api/users",
    response: {} as GeneralResponse & { data?: UserDataMini[] },
  },
  getUserById: {
    method: "GET",
    path: "/api/users/:userId",
    params: {} as { userId: string },
    response: {} as GeneralResponse & { data?: UserData },
  },
  updateUser: {
    method: "PATCH",
    path: "/api/users/:userId",
    params: {} as { userId: string },
    body: {} as Partial<UserData>,
    response: {} as GeneralResponse,
  },
  createUser: {
    method: "POST",
    path: "/api/users",
    body: {} as Partial<UserDataMini>,
    response: {} as GeneralResponse & { data?: UserDataMini },
  },
  getUserDetails: {
    method: "GET",
    path: "/api/users/:userId",
    params: {} as { userId: string },
    response: {} as GeneralResponse & { data?: UserData },
  },
  updateUserRole: {
    method: "PATCH",
    path: "/api/users/:userId/role",
    params: {} as { userId: string },
    body: {} as { role: string },
    response: {} as GeneralResponse,
  },
  deleteUser: {
    method: "DELETE",
    path: "/api/users/:userId",
    params: {} as { userId: string },
    response: {} as GeneralResponse,
  },
  // --- IMAGES ---
  getImages: {
    method: "GET",
    path: "/api/images",
    response: {} as {
      status: string;
      connectionActivity: string;
      statusCode: number;
      success: boolean;
      message?: string;
      images: {
        _id: string;
        filename: string;
        mimetype: string;
        uploadedAt: string;
        __v: number;
      }[];
    },
  },
  getImageById: {
    method: "GET",
    path: "/api/images/:id",
    params: {} as { id: string },
    response: {} as Response,
  },
} as const;

export type Routes = {
  [K in keyof typeof routes]: {
    method: typeof routes[K]["method"];
    path: typeof routes[K]["path"];
    params: typeof routes[K] extends { params: infer P } ? P : never;
    body: typeof routes[K] extends { body: infer B } ? B : never;
    response: typeof routes[K]["response"];
  };
};

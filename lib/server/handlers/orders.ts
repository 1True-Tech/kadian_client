import cookies from "@/lib/utils/cookies";
import {
  CreateOrderBody,
  OrderCreateResponse,
  OrderDetailResponse,
  OrderListResponse,
  OrderUpdateBody,
  ProcessPaymentBody,
} from "@/types/order";
import { GeneralResponse } from "@/types/structures";

/**
 * Get all orders (admin only)
 */
export async function getAllOrders(): Promise<
  OrderListResponse & GeneralResponse
> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/orders", {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Get orders by current user
 */
export async function getMyOrders(): Promise<
  OrderListResponse & GeneralResponse
> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/orders-by-user", {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Create a new order
 */
export async function createOrder(
  {body}: {body: CreateOrderBody}
): Promise<OrderCreateResponse & GeneralResponse> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * Create a new order
 */
export async function processPayment(
  {body,params}: {body: ProcessPaymentBody, params:{id:string}}
): Promise<OrderCreateResponse & GeneralResponse> {
  const token = cookies.get("access_token") || "";
  const res = await fetch(`/api/orders/${params.id}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * Get single order by id
 */
export async function getOrder(
  {params:{id}}:{params:{id:string}}
): Promise<OrderDetailResponse & GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/orders/${id}`, {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Update order status (admin only)
 */
export async function updateOrder(
  {params:{id}, body}: {params:{id:string}, body: OrderUpdateBody}
): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * Cancel own order
 */
export async function cancelOrder({params:{id}}:{params:{id: string}}): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/orders/${id}/cancel`, {
    method: "DELETE",
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Delete order (admin only)
 */
export async function deleteOrder({params:{id}}:{params:{id: string}}): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/orders/${id}`, {
    method: "DELETE",
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

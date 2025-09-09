import { GeneralResponse } from "@/types/structures";
import { OrderItem } from "@/types/order";
import cookies from "@/lib/utils/cookies";

/**
 * Get all cart items
 */
export async function getCart(): Promise<
  GeneralResponse & { data?: OrderItem[] }
> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/auth/me/cart", {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Update entire cart
 */
export async function updateCart(
  {body}: {body: { updateData: OrderItem[] }}
  
): Promise<GeneralResponse & { data?: OrderItem[] }> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/auth/me/cart", {
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
 * Clear cart
 */
export async function clearCart(): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/auth/me/cart", {
    method: "DELETE",
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Get single cart item
 */
export async function getCartItem(
  {params:{id}}:{params:{id:string}}
): Promise<GeneralResponse & { data?: OrderItem }> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/auth/me/cart/${id}`, {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Update single cart item
 */
export async function updateCartItem(
  {params:{id}, body}: {params:{id:string}, body: {data:{increment?:number, quantity?:number}}}
): Promise<GeneralResponse & { data?: OrderItem }> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/auth/me/cart/${id}`, {
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
 * Delete single cart item
 */
export async function deleteCartItem({params:{id}}:{params:{id:string}}): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/auth/me/cart/${id}`, {
    method: "DELETE",
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

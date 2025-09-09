import cookies from "@/lib/utils/cookies";
import { GeneralResponse } from "@/types/structures";

export async function getWishlist(): Promise<
  GeneralResponse & { data?: any[] }
> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/auth/me/wishlist", {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

export async function updateWishlist(
  {body}: {body: { productIds: string[]; }}
): Promise<GeneralResponse & { data?: any[] }> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/auth/me/wishlist", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function clearWishlist(): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/auth/me/wishlist", {
    method: "DELETE",
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

export async function getWishlistItem(
  {params:{id}}:{params:{id: string}}
): Promise<GeneralResponse & { data?: any }> {
  const token = cookies.get("access_token") || "";
  const res = await fetch(`/api/auth/me/wishlist/${id}`, {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

export async function deleteWishlistItem({params:{id}}:{params:{id: string}}): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";
  console.log(id)

  const res = await fetch(`/api/auth/me/wishlist/${id}`, {
    method: "DELETE",
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

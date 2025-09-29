import cookies from "@/lib/utils/cookies";
import {
  InventoryGetResponse,
  InventoryItem,
  InventoryItemsResponse,
  InventoryPutResponse,
  InventoryStockUpdateResponse,
  InventoryVariantResponse
} from "@/types/inventory";
import { GeneralResponse } from "@/types/structures";

/**
 * Fetch all inventory items
 */
export async function getInventoryData(): Promise<
  InventoryItemsResponse & GeneralResponse
> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/inventory", {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Refresh inventory (admin only)
 */
export async function refreshInventory(): Promise<
  InventoryItemsResponse & GeneralResponse
> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/inventory_refresh", {
    method: "GET",
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Get a single product’s inventory
 */
export async function getInventoryByProduct({
  params: { productId },
}: {
  params: { productId: string };
}): Promise<InventoryGetResponse & GeneralResponse> {
  const res = await fetch(`/api/inventory/${productId}`);
  return res.json();
}

/**
 * Update a product’s inventory (admin only)
 */
export async function updateInventoryData({
  params: { productId },
  body,
}: {
  params: { productId: string };
  body: Partial<InventoryItem>;
}): Promise<InventoryPutResponse & GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/inventory/${productId}`, {
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
 * Get a specific variant’s inventory
 */
export async function getInventoryVariant({
  params: { productId, sku },
}: {
  params: { productId: string; sku: string };
}): Promise<InventoryVariantResponse & GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/inventory/${productId}/${sku}`, {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Update stock for a specific variant (admin only)
 */
export async function updateInventoryStock({
  params: { productId, sku },
  body: { stock },
}: {
  params: { productId: string; sku: string };
  body: { stock: number };
}): Promise<InventoryStockUpdateResponse & GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch(`/api/inventory/${productId}/${sku}/stock`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({ stock }),
  });
  return res.json();
}

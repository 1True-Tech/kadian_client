import env from "@/lib/constants/env";
import queries from "@/lib/queries";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { client } from "@/lib/utils/NSClient";
import ping from "@/lib/utils/ping";
import { ProductRaw } from "@/types/product";
import { GeneralResponse } from "@/types/structures";
import { CartItem, CartItemReady } from "@/types/user";
import { NextResponse } from "next/server";

export interface CartResponse extends GeneralResponse {
  data?: {
    items: CartItemReady[];
    totalItems: number;
    totalAmount: number;
  };
}

/**
 * GET /api/v1/auth/me/cart
 * Retrieve the user's cart
 */
export async function GET(req: Request) {
  const isOnline = await ping();

  try {
    const res = await fetch(`${env.API_URL}auth/me/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const cartData: CartItemReady[] = await Promise.all(
        data.data.map(async (item: CartItem) => {
          const res: ProductRaw[] = await client.fetch(
            queries.productsByIdsQuery,
            { ids: [item.productId] }
          );
          const found = res.find((i) => i._id === item.productId);
          const foundVariant = found?.variants.find(
            (v) => v.sku === item.variantSku
          );
          return {
            id: item._id,
            productId: item.productId,
            price: item.price,
            size: foundVariant?.size,
            color: foundVariant?.color,
            quantity: item.quantity,
            name: found?.name,
            image: foundVariant?.images?.map((img) => ({
              alt: img.alt,
              src: fashionImageBuilder([img.asset], {
                treatment: "catalog",
                quality: 85,
                format: "webp",
              })[0],
            }))[0],
            updatedAt: item.updatedAt,
            addedAt: item.addedAt,
            variantSku: item.variantSku,
          };
        })
      );
      const totalAmount = cartData.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalItems = cartData.length;
      const successResponse: CartResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Cart retrieved successfully.",
        data: {
          totalAmount,
          totalItems,
          items: cartData,
        },
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to fetch cart",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * PATCH /api/v1/auth/me/cart
 * Update the user's cart (add/remove/update items)
 */
export async function PATCH(req: Request) {
  const isOnline = await ping();

  try {
    const body = await req.json();

    const res = await fetch(`${env.API_URL}auth/me/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const cartData: CartItemReady[] = await Promise.all(
        data.data.map(async (item: CartItem) => {
          const res: ProductRaw[] = await client.fetch(
            queries.productsByIdsQuery,
            { ids: [item.productId] }
          );
          const found = res.find((i) => i._id === item.productId);
          const foundVariant = found?.variants.find(
            (v) => v.sku === item.variantSku
          );
          return {
            id: item._id,
            productId: item.productId,
            price: item.price,
            size: foundVariant?.size,
            color: foundVariant?.color,
            quantity: item.quantity,
            name: found?.name,
            image: foundVariant?.images?.map((img) => ({
              alt: img.alt,
              src: fashionImageBuilder([img.asset], {
                treatment: "catalog",
                quality: 85,
                format: "webp",
              })[0],
            }))[0],
            updatedAt: item.updatedAt,
            addedAt: item.addedAt,
            variantSku: item.variantSku,
          };
        })
      );
      const totalAmount = cartData.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalItems = cartData.length;
      const successResponse: CartResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Cart retrieved successfully.",
        data: {
          totalAmount,
          totalItems,
          items: cartData,
        },
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to update cart",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * DELETE /api/v1/auth/me/cart
 * Clear the user's cart
 */
export async function DELETE(req: Request) {
  const isOnline = await ping();

  try {
    const res = await fetch(`${env.API_URL}auth/me/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Cart cleared successfully.",
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to clear cart",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

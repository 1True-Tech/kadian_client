import env from "@/lib/constants/env";
import queries from "@/lib/queries";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { client } from "@/lib/utils/NSClient";
import ping from "@/lib/utils/ping";
import { ProductRaw } from "@/types/product";
import { GeneralResponse, ParamsProps } from "@/types/structures";
import { CartItem, CartItemReady } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";


export interface CartItemResponse extends GeneralResponse {
  data?: CartItemReady & {
    itemsLeft: number;
  };
}

type Params = ParamsProps<{ id: string }>;
/**
 * GET /api/v1/auth/me/cart/:id
 * Retrieve a single cart item
 */
export async function GET(req: NextRequest, { params }: Params) {
  const isOnline = await ping();
  const { id } = await params;

  try {
    const res = await fetch(`${env.API_URL}auth/me/cart/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const baseUrl = req.nextUrl.origin;

      const stockRes = await (
        await fetch(`${baseUrl}/inventory/${id}/${data.data.variantSku}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: req.headers.get("authorization") || "",
          },
        })
      ).json();
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
      const successResponse: CartItemResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Cart item retrieved successfully.",
        data: {
          ...cartData[0],
          itemsLeft: stockRes.data.currentStock,
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
      message: error?.message || "Unable to fetch cart item",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * PATCH /api/v1/auth/me/cart/:id
 * Update a specific cart item (quantity, variant, etc.)
 */
export async function PATCH(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { id } = await params;

  try {
    const body = await req.json();

    const res = await fetch(`${env.API_URL}auth/me/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: CartItemResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Cart item updated successfully.",
        data: data.data,
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to update cart item",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * DELETE /api/v1/auth/me/cart/:id
 * Remove a single item from the cart
 */
export async function DELETE(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { id } = await params;

  try {
    const res = await fetch(`${env.API_URL}auth/me/cart/${id}`, {
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
        message: data.message || "Cart item removed successfully.",
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to remove cart item",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

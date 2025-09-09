import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse, ParamsProps } from "@/types/structures";
import { NextResponse } from "next/server";

interface WishlistItem {
  sanityProductId: string;
  slug: string;
  name: string;
  variantSku?: string;
  price: number;
  addedAt: string;
}

interface WishlistItemResponse extends GeneralResponse {
  data?: WishlistItem;
}

type Params = ParamsProps<{ id: string }>;

/**
 * GET /api/v1/auth/me/wishlist/:id
 * Retrieve a single wishlist item
 */
export async function GET(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { id } = await params;

  try {
    const res = await fetch(`${env.API_URL}auth/me/wishlist/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: WishlistItemResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Wishlist item retrieved successfully.",
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
      message: error?.message || "Unable to fetch wishlist item",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * DELETE /api/v1/auth/me/wishlist/:id
 * Remove a single item from the wishlist
 */
export async function DELETE(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { id } = await params;

  try {
    const res = await fetch(`${env.API_URL}auth/me/wishlist/${id}`, {
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
        message: data.message || "Wishlist item removed successfully.",
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to remove wishlist item",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

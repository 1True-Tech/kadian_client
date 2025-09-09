import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse } from "@/types/structures";
import { NextResponse } from "next/server";

interface CartItem {
  sanityProductId: string;
  variantSku: string;
  quantity: number;
  price: number;
}

interface CartResponse extends GeneralResponse {
  data?: {
    userId: string;
    items: CartItem[];
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
      const successResponse: CartResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Cart retrieved successfully.",
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
      const successResponse: CartResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Cart updated successfully.",
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

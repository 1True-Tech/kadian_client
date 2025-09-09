import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse, ParamsProps } from "@/types/structures";
import { NextRequest, NextResponse } from "next/server";

interface CartItem {
  sanityProductId: string;
  variantSku: string;
  quantity: number;
  price: number;
}

interface CartItemResponse extends GeneralResponse {
  data?: CartItem &{
    itemsLeft:number
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

      const stockRes = await (await fetch(`${baseUrl}/inventory/${id}/${data.data.variantSku}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: req.headers.get("authorization") || "",
        },
      })).json();
      const successResponse: CartItemResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Cart item retrieved successfully.",
        data: {
          ...data.data,
          itemsLeft: stockRes.data.currentStock
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

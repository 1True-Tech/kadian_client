import env from "@/lib/constants/env";
import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import ping from "@/lib/utils/ping";
import { GeneralResponse } from "@/types/structures";
import { UserData } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

interface UserResponse extends GeneralResponse {
  data?: UserData;
}

/**
 * GET /api/v1/auth/me
 * Fetch the authenticated user's profile
 */
export async function GET(req: NextRequest) {
  const isOnline = await ping();

  try {
    // Make a single request to the server that includes orders
    const res = await fetch(`${env.API_URL}auth/me?include_orders=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const userData = data.data as UserData;
      const products = await client.fetch(queries.productsOrdersQuery, {items: userData.orders?.flatMap(p => p.items)})
      userData.orders = userData.orders?.map(order => ({
        ...order,
        items: order.items?.map(item => {
          const foundProduct = products.find((p: { _id: any; }) => p._id === item.productId)
          const foundVariant = foundProduct.variants.filter((p: { sku: string; })=> p.sku === item.variantSku)
          return ({
          ...item,
          product: {
            ...foundProduct,
            variants:foundVariant
          }
        })})
      }))
      const successResponse: UserResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "User profile retrieved successfully.",
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
      message: error?.message || "Unable to fetch user profile",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * PATCH /api/v1/auth/me
 * Update authenticated user's profile
 */
export async function PATCH(req: Request) {
  const isOnline = await ping();

  try {
    const body = await req.json();

    const res = await fetch(`${env.API_URL}auth/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: UserResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "User profile updated successfully.",
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
      message: error?.message || "Unable to update user profile",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * DELETE /api/v1/auth/me
 * Delete the authenticated user
 */
export async function DELETE(req: Request) {
  const isOnline = await ping();

  try {
    const res = await fetch(`${env.API_URL}auth/me`, {
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
        message: data.message || "User deleted successfully.",
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to delete user account",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

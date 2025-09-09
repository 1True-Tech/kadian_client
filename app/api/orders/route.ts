import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import {
  GeneralResponse,
  Pagination,
} from "@/types/structures";
import {
  OrderListResponse,
  OrderDetailResponse,
  OrderCreateResponse,
  CreateOrderBody,
} from "@/types/order";
import { NextResponse } from "next/server";

/**
 * GET /api/v1/orders (admin only)
 * Retrieve all orders (paginated)
 */
export async function GET(req: Request) {
  const isOnline = await ping();

  try {
    const res = await fetch(`${env.API_URL}orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data: OrderListResponse & {
      pagination?: Pagination;
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: OrderListResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Orders retrieved successfully.",
        orders: data.orders,
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to fetch orders",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * POST /api/v1/orders
 * Create a new order
 */
export async function POST(req: Request) {
  const isOnline = await ping();

  try {
    const body: CreateOrderBody = await req.json();

    const res = await fetch(`${env.API_URL}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data: OrderCreateResponse & {
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: OrderCreateResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Order created successfully.",
        orderId: data.orderId,
        statusValue: data.statusValue,
      };

      return NextResponse.json(successResponse, { status: 201 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to create order",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

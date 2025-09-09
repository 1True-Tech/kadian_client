import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse, ParamsProps } from "@/types/structures";
import { OrderDetailResponse, OrderUpdateBody } from "@/types/order";
import { NextResponse } from "next/server";

type Params = ParamsProps<{ id: string }>;

/**
 * GET /api/v1/orders/:id
 * Retrieve details for a specific order
 */
export async function GET(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { id } = await params;

  try {
    const res = await fetch(`${env.API_URL}orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data: OrderDetailResponse & {
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: OrderDetailResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Order details retrieved successfully.",
        order: data.order,
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to fetch order details",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * PATCH /api/v1/orders/:id (admin only)
 * Update order status
 */
export async function PATCH(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { id } = await params;

  try {
    const body: OrderUpdateBody = await req.json();

    const res = await fetch(`${env.API_URL}orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data: OrderDetailResponse & {
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: OrderDetailResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Order updated successfully.",
        order: data.order,
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to update order",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * DELETE /api/v1/orders/:id (admin only)
 * Permanently delete an order
 */
export async function DELETE(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { id } = await params;

  try {
    const res = await fetch(`${env.API_URL}orders/${id}`, {
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
        message: data.message || "Order deleted successfully.",
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to delete order",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

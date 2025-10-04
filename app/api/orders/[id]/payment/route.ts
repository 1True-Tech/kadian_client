import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import {
  OrderCreateResponse,
  ProcessPaymentBody
} from "@/types/order";
import { DataResponse, GeneralResponse, ParamsProps } from "@/types/structures";

import { NextResponse } from "next/server";

/**
 * POST /api/v1/orders
 * Create a new order
 */
export async function POST(req: Request, {params}:ParamsProps<{id:string}>) {
  const isOnline = await ping();
  const {id} = await params

  try {
    const body: ProcessPaymentBody = await req.json();

    const res = await fetch(`${env.API_URL}orders/${id}/payment`, {
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
      const successResponse: DataResponse<OrderCreateResponse["data"]> = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Payment updated successfully.",
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
      message: error?.message || "Unable to update payment",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

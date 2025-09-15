import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse, ParamsProps } from "@/types/structures";
import { NextResponse } from "next/server";

type Params = ParamsProps<{ id: string }>;

/**
 * DELETE /api/v1/orders/:id/cancel
 * Cancel an order (user initiated)
 */
export async function DELETE(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { id } = await params;

  try {
    const res = await fetch(`${env.API_URL}orders/${id}/cancel`, {
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
        message: data.message || "Order cancelled successfully.",
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to cancel order",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

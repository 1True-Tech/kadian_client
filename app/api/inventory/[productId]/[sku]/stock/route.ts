import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { InventoryStockUpdateResponse } from "@/types/inventory";
import { GeneralResponse, ParamsProps } from "@/types/structures";
import { NextResponse } from "next/server";

type Params = ParamsProps<{ productId: string; sku: string }>;

/**
 * PATCH /api/v1/inventory/:productId/:sku/stock (admin only)
 * Update stock levels for a specific variant (SKU)
 */
export async function PATCH(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { productId, sku } = await params;

  try {
    const body = await req.json();

    const res = await fetch(
      `${env.API_URL}inventory/${productId}/${sku}/stock`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data: InventoryStockUpdateResponse & {
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: InventoryStockUpdateResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Stock updated successfully.",
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
      message: error?.message || "Unable to update stock",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse, ParamsProps } from "@/types/structures";
import {
  InventoryVariantResponse,
  InventoryStockUpdateResponse,
} from "@/types/inventory";
import { NextResponse } from "next/server";

type Params = ParamsProps<{ productId: string; sku: string }>;

/**
 * GET /api/v1/inventory/:productId/:sku
 * Retrieve inventory details for a specific variant (SKU) of a product
 */
export async function GET(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { productId, sku } = await params;

  try {
    const res = await fetch(`${env.API_URL}inventory/${productId}/${sku}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data: InventoryVariantResponse & {
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: InventoryVariantResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message:
          data.message || "Inventory variant details retrieved successfully.",
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
      message: error?.message || "Unable to fetch inventory variant",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}
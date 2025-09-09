import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { InventoryItemsResponse } from "@/types/inventory";
import { GeneralResponse } from "@/types/structures";
import { NextResponse } from "next/server";

/**
 * GET /api/v1/inventory
 * Retrieve the full list of inventory items
 */
export async function GET(req: Request) {
  const isOnline = await ping();

  try {
    const res = await fetch(`${env.API_URL}inventory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data: InventoryItemsResponse & {
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: InventoryItemsResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Inventory retrieved successfully.",
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
      message: error?.message || "Unable to fetch inventory",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

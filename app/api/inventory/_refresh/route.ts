import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse } from "@/types/structures";
import { InventoryItemsResponse } from "@/types/inventory";
import { NextResponse } from "next/server";

/**
 * POST /api/v1/inventory/_refresh (admin only)
 * Force refresh and sync inventory from source (e.g. Sanity, DB)
 */
export async function POST(req: Request) {
  const isOnline = await ping();

  try {
    const res = await fetch(`${env.API_URL}inventory/_refresh`, {
      method: "POST",
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
        message: data.message || "Inventory refresh completed successfully.",
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
      message: error?.message || "Unable to refresh inventory",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

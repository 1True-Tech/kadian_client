import env from "@/lib/constants/env";
import { processProducts } from "@/lib/controllers/processShop/processProducts";
import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import ping from "@/lib/utils/ping";
import { InventoryGetResponse, InventoryPutResponse } from "@/types/inventory";
import { GeneralResponse, ParamsProps } from "@/types/structures";
import { NextResponse } from "next/server";

type Params = ParamsProps<{ productId: string }>;

/**
 * GET /api/v1/inventory/:productId
 * Retrieve inventory details for a single product
 */
export async function GET(_: Request, { params }: Params) {
  const isOnline = await ping();
  const { productId } = await params;

  try {
    const res = await fetch(`${env.API_URL}inventory/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: InventoryGetResponse & {
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: InventoryGetResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Inventory item retrieved successfully.",
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
      message: error?.message || "Unable to fetch inventory item",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * PATCH /api/v1/inventory/:productId (admin only)
 * Update inventory details for a product
 */
export async function PATCH(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { productId } = await params;

  try {
    const body = await req.json();

    const res = await fetch(`${env.API_URL}inventory/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data: InventoryPutResponse & {
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const productData = (
        await Promise.all(
          [data.data].map(async (i) => {
            const itemData = await client.fetch(queries.productsByIdsQuery, {
              ids: i?.sanityProductId,
            }, {
              token: env.SANITY_STUDIO_UPDATE_TOKEN
            });
            return processProducts(itemData);
          })
        )
      ).flat()[0];
      const successResponse: InventoryPutResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Inventory item updated successfully.",
        data: data.data ? { ...data.data, productData } : undefined,
      };

      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to update inventory item",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

import env from "@/lib/constants/env";
import { processProducts } from "@/lib/controllers/processShop/processProducts";
import queries from "@/lib/queries";
import { refreshInventory } from "@/lib/server/handlers";
import { client, sanityClientServer } from "@/lib/utils/NSClient";
import ping from "@/lib/utils/ping";
import { InventoryItemSanity, InventoryItemsResponse } from "@/types/inventory";
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
      const productData = (
        await Promise.all(
          (data.data || []).map(async (i) => {
            const itemData = await client.fetch(queries.productsByIdsQuery, {
              ids: [i.sanityProductId],
            });
            return processProducts(itemData);
          })
        )
      ).flat();
      const successResponse: InventoryItemsResponse & GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Inventory retrieved successfully.",
        data: data.data?.map((i) => ({
          ...i,
          productData: productData.find((pd) => pd._id === i.sanityProductId),
        })),
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

export async function POST(req: Request) {
  try {
    const { docId, variantSku, price, stock, stockThreshold } =
      await req.json();

    if (!docId || !variantSku) {
      return NextResponse.json(
        { error: "Missing docId or variantSku" },
        { status: 400 }
      );
    }
    const res = await sanityClientServer
      .patch(docId)
      .set({
        [`variants[sku=="${variantSku}"].price`]: price,
        [`variants[sku=="${variantSku}"].stock`]: stock,
        [`variants[sku=="${variantSku}"].stockThreshold`]: stockThreshold,
      })
      .commit();

    await refreshInventory()

    return NextResponse.json({ success: true, data: res });
  } catch (err: any) {
    console.error("Sanity update error:", err.message);
    return NextResponse.json(
      { error: "Failed to update variant" },
      { status: 500 }
    );
  }
}
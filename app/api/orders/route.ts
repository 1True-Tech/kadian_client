import env from "@/lib/constants/env";
import queries from "@/lib/queries";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { client } from "@/lib/utils/NSClient";
import ping from "@/lib/utils/ping";
import {
  CreateOrderBody,
  OrderCreateResponse,
  OrderListResponse,
} from "@/types/order";
import { DataResponse, GeneralResponse, Pagination } from "@/types/structures";

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
      const products = await client.fetch(queries.productsOrdersQuery, {
        items: data.data?.flatMap((p) => p.items),
      });
      data.data = data.data?.map((order) => ({
        ...order,
        items: order.items?.map((item) => {
          const foundProduct = products.find(
            (p: { _id: any }) => p._id === item.productId
          );
          const foundVariant = foundProduct.variants
            .filter((p: { sku: string }) => p.sku === item.variantSku)
            .map((item: any) => ({
              ...item,
              images: item.images.map((img: any) => ({
                alt: img.alt || foundProduct.name || "Product image",
                src: fashionImageBuilder([img.asset], {
                  quality: 80,
                  width: 400,
                })[0],
              })),
            }));
          return {
            ...item,
            product: {
              ...foundProduct,
              variants: foundVariant,
            },
          };
        }),
      }));
      const successResponse: DataResponse<any> = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Orders retrieved successfully.",
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
      const successResponse: DataResponse<OrderCreateResponse["data"]> = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Order created successfully.",
        data: data.data,
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

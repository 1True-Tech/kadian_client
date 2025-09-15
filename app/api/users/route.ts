import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import {
  GeneralResponse,
  Pagination,
} from "@/types/structures";
import { UserData } from "@/types/user";
import { NextResponse } from "next/server";

interface UserListResponse extends GeneralResponse {
  data: UserData[];
}
/**
 * GET /api/v1/orders (admin only)
 * Retrieve all orders (paginated)
 */
export async function GET(req: Request) {
  const isOnline = await ping();

  try {
    const res = await fetch(`${env.API_URL}users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
    });

    const data: UserListResponse & {
      pagination?: Pagination;
      status: "good" | "bad";
      message?: string;
      success: boolean;
    } = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: UserListResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "users retrieved successfully.",
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
      message: error?.message || "Unable to fetch users",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

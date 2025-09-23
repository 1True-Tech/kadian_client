import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { DataResponse, GeneralResponse } from "@/types/structures";
import { Pagination, ParamsProps } from "@/types/structures";

import { UserData } from "@/types/user";
import { NextResponse } from "next/server";

type Params = ParamsProps<{ userId: string }>;

interface UserRoleData {
  id: string;
  email: UserData["email"];
  name: UserData["name"];
  role: UserData["role"];
}

type UserListResponse = DataResponse<UserRoleData>;

export async function PATCH(req: Request, { params }: Params) {
  const isOnline = await ping();
  const { userId } = await params;

  try {
    const res = await fetch(`${env.API_URL}users/${userId}/role`, {
      method: "PATCH",
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

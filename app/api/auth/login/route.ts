import env from "@/lib/constants/env";
import handleAuthToken from "@/lib/server/handleAuthToken";
import ping from "@/lib/utils/ping";
import { GeneralResponse } from "@/types/structures";
import { NextResponse } from "next/server";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseData {
  access: string;
  refresh: string;
}

export interface LoginSuccessResponse extends GeneralResponse {
  data?: LoginResponseData;
}

export async function POST(req: Request) {
  const isOnline = await ping();

  try {
    const body: LoginRequestBody = await req.json();

    const res = await fetch(`${env.API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: LoginSuccessResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        message: data.message || "Sign in successful.",
        success: true,
        data: {
          access: data.data.access,
          refresh: data.data.refresh,
        },
      };
      await handleAuthToken({
        access: {
          token: data.data.access,
          expires: 7 * 24 * 60 * 60, // 7 days
        },
        refresh: {
          token: data.data.refresh,
          expires: 30 * 24 * 60 * 60, // 7 days
        },
      });

      return NextResponse.json(successResponse, { status: 200 });
    }

    // ❌ Throw API error
    throw {
      ...data,
      statusCode: res.status,
    };
  } catch (error: any) {
    // Ensure fallback values in error response
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to process login request",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

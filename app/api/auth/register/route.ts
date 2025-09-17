import env from "@/lib/constants/env";
import handleAuthToken from "@/lib/server/handleAuthToken";
import ping from "@/lib/utils/ping";
import { GeneralResponse } from "@/types/structures";
import { NextResponse } from "next/server";

export interface RegisterRequestBody {
  name: {
    first: string;
    last: string;
  };
  username:string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterResponseData {
  access: string;
  refresh: string;
}

export interface RegisterSuccessResponse extends GeneralResponse {
  data?: RegisterResponseData;
}

export async function POST(req: Request) {
  const isOnline = await ping();

  try {
    const body: RegisterRequestBody = await req.json();

    const res = await fetch(`${env.API_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: RegisterSuccessResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        message: data.message || "Registration successful.",
        success: true,
        data: {
          access: data.data?.access,
          refresh: data.data?.refresh,
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

      return NextResponse.json(successResponse, { status: 201 });
    }

    // ❌ Throw API error
    throw {
      ...data,
      statusCode: res.status,
    };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to process registration request",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

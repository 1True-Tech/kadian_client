import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse } from "@/types/structures";
import { NextResponse } from "next/server";

export async function GET() {
  const isOnline = await ping();
  try {
    const res = await fetch(env.API_URL + "health", {
      method: "GET",
    });
    const data: GeneralResponse = await res.json();
    if (res.ok && data.status === "good") {
      return new NextResponse(JSON.stringify(data), {
        status: 200,
      });
    }
    throw {
      ...data,
      statusCode: res.status,
    };
  } catch (error: GeneralResponse | any) {
    const errorData = error as GeneralResponse;
    return new NextResponse(
      JSON.stringify({
        success: errorData.success || false,
        message: errorData.message || "API is not reachable",
        connectionActivity:
          errorData.connectionActivity || isOnline ? "online" : "offline",
        status: errorData.status || "bad",
        statusCode: errorData.statusCode || 500,
      } as GeneralResponse),
      { status: 500 }
    );
  }
}

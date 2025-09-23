import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse, ParamsProps } from "@/types/structures";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: ParamsProps<{ id: string }>) {
  const {id} = await params;
  const isOnline = await ping();

  try {
    const res = await fetch(`${env.API_URL}images/${id}`, {
      method: "GET",
      headers: {
        authorization: req.headers.get("authorization") || "",
      },
    });
    if (!res.ok) {
      return new NextResponse("failed to fetch image", { status: res.status });
    }


    const arrayBuff = await res.arrayBuffer();
    const buff = Buffer.from(arrayBuff);

    const contentType =
      res.headers.get("content-type") || "application/octet-stream";
    return new NextResponse(buff, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": buff.length.toString(),
      },
    });
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

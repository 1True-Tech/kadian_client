import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse } from "@/types/structures";
import { NextRequest, NextResponse } from "next/server";

type RecentOrder = {
    id: string;
    customer: string;
    amount: string;
    status: string;
}
type TopProduct = {
    name: string;
    sales: number;
    revenue: string;
}
type TopUser = {
    id: string;
    name: string;
    orders: number;
    spent: string;
}
type Stats = {
    type: "orders" | "revenue" | "users" | "products";
    title: string;
    value: string;
    change: string;
    positive: boolean;
}
export type DashboardMetric = {
    recentOrders: RecentOrder[];
    topProducts: TopProduct[];
    topUsers: TopUser[];
    stats: Stats[];
}
export async function GET(req: NextRequest) {
  const isOnline = await ping();
    console.log(req.headers.get("authorization"))

  try {
    const res = await fetch(`${env.API_URL}admin/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization") || "",
      },
    });

    const data: DashboardMetric = await res.json();
    if (res.ok) return NextResponse.json(data);
    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to fetch user profile",
      connectionActivity: isOnline ? "online" : "offline",
    };

    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

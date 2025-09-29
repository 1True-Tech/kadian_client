import env from "@/lib/constants/env";
import ping from "@/lib/utils/ping";
import { GeneralResponse } from "@/types/structures";
import { UserData, Address } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

interface AddressResponse extends GeneralResponse {
  data?: Address | Address[];
}

/**
 * POST /api/v1/auth/me/address
 * Add one or more addresses to the authenticated user
 */
export async function POST(req: NextRequest) {
  const isOnline = await ping();

  try {
    const body = await req.json();

    const res = await fetch(`${env.API_URL}auth/me/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: AddressResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Address added successfully",
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
      message: error?.message || "Unable to add address",
      connectionActivity: isOnline ? "online" : "offline",
    };
    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * PATCH /api/v1/auth/me/address
 * Update one or more addresses by id
 */
export async function PATCH(req: NextRequest) {
  const isOnline = await ping();

  try {
    const body = await req.json();

    const res = await fetch(`${env.API_URL}auth/me/address`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: AddressResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Address updated successfully",
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
      message: error?.message || "Unable to update address",
      connectionActivity: isOnline ? "online" : "offline",
    };
    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

/**
 * DELETE /api/v1/auth/me/address
 * Remove an address by id
 */
export async function DELETE(req: NextRequest) {
  const isOnline = await ping();

  try {
    const body = await req.json();

    const res = await fetch(`${env.API_URL}auth/me/address`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body), // expects { id: "addressId" }
    });

    const data = await res.json();

    if (res.ok && data.status === "good") {
      const successResponse: GeneralResponse = {
        status: "good",
        connectionActivity: "online",
        statusCode: res.status,
        success: true,
        message: data.message || "Address removed successfully",
      };
      return NextResponse.json(successResponse, { status: 200 });
    }

    throw { ...data, statusCode: res.status };
  } catch (error: any) {
    const errorData: GeneralResponse = {
      success: false,
      status: error?.status ?? "bad",
      statusCode: error?.statusCode ?? 500,
      message: error?.message || "Unable to remove address",
      connectionActivity: isOnline ? "online" : "offline",
    };
    return NextResponse.json(errorData, { status: errorData.statusCode });
  }
}

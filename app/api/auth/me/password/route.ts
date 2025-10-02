import { NextRequest, NextResponse } from "next/server";
import env from "@/lib/constants/env";

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json();
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Forward the request to the backend
    const response = await fetch(`${env.API_URL}auth/me/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json(
      { message: "Failed to change password" },
      { status: 500 }
    );
  }
}
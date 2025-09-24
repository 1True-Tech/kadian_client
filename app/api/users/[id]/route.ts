import env from "@/lib/constants/env";
import { ParamsProps } from "@/types/structures";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {params}: ParamsProps<{ id: string }>
) {
  const {id} = await params
  try {
    const token = (await cookies()).get("access_token")?.value;
    const response = await fetch(`${env.API_URL}users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { status: "bad", message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  
  {params}: ParamsProps<{ id: string }>
) {
  const {id} = await params
  try {
    const userData = await req.json();
    const token = (await cookies()).get("access_token")?.value;

    const response = await fetch(`${env.API_URL}users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { status: "bad", message: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  
  {params}: ParamsProps<{ id: string }>
) {
  const {id} = await params
  try {
    const token = (await cookies()).get("access_token")?.value;

    const response = await fetch(`${env.API_URL}users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { status: "bad", message: "Failed to delete user" },
      { status: 500 }
    );
  }
}

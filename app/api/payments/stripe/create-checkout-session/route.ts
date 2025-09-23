import env from "@/lib/constants/env";
import { cookies } from "next/headers";
import { DataResponse, GeneralResponse } from "@/types/structures";
import { NextResponse } from "next/server";

// Initialize Stripe


export async function POST(req: Request) {
  try {
    // Get user session

    // Parse request body
    const body = await req.json();
    const { orderId, items, customerEmail, customerName } = body;

    if (!orderId || !items || items.length === 0) {
      const errorResponse: GeneralResponse = {
        status: "bad",
        connectionActivity: "online",
        statusCode: 400,
        success: false,
        message: "Invalid request data"
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Format items for Stripe API
    const formattedItems = items.map((item: any) => ({
      productId: item.productId || "",
      name: item.name,
      price: Math.round(item.price * 100), // Convert to cents for Stripe
      quantity: item.quantity,
      variantSku: item.variantSku || "",
      image: item.image || "",
    }));

    const token = (await cookies()).get("access_token")?.value;

    // Create Stripe checkout session via server API
    const response = await fetch(
      `${env.API_URL}/payments/stripe/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: formattedItems,
          customer: {
            email: customerEmail,
            name: customerName || "",
          },
          metadata: { orderId },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to create Stripe checkout session"
      );
    }

    const stripeData = await response.json();

    const successResponse: DataResponse<{sessionId: string, url: string}> = {
      status: "good",
      connectionActivity: "online",
      statusCode: 200,
      success: true,
      message: "Stripe checkout session created successfully",
      data: {
        sessionId: stripeData.id,
        url: stripeData.url,
      }
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error: any) {
    console.error("Stripe checkout session creation error:", error);
    return NextResponse.json(
      { error: error.message || "Error creating Stripe checkout session" },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import env from '@/lib/constants/env';
import { DataResponse, GeneralResponse } from '@/types/structures';

export async function POST(req: Request) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      const errorResponse: GeneralResponse = {
        status: "bad",
        connectionActivity: "online",
        statusCode: 401,
        success: false,
        message: 'Authentication required'
      };
      
      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { orderId, items, customerEmail } = body;

    if (!orderId || !items || items.length === 0) {
      const errorResponse: GeneralResponse = {
        status: "bad",
        connectionActivity: "online",
        statusCode: 400,
        success: false,
        message: 'Invalid request data'
      };
      
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Calculate total amount
    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Format items for PayPal API
    const formattedItems = items.map((item: any) => ({
      name: item.name,
      description: item.description || '',
      quantity: item.quantity,
      price: item.price,
      sku: item.variantSku || ''
    }));

    // Create PayPal order via server API
    const response = await fetch(`${env.API_URL}/payments/paypal/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(session.user as any).accessToken}`,
      },
      body: JSON.stringify({
        items: formattedItems,
        total,
        customer: {
          email: customerEmail,
          name: session.user.name || ''
        },
        metadata: { orderId }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create PayPal order');
    }

    const paypalData = await response.json();
    
    const successResponse: DataResponse<any> = {
      status: "good",
      connectionActivity: "online",
      statusCode: 200,
      success: true,
      message: "PayPal order created successfully",
      data: {
        orderId: paypalData.id,
        approvalUrl: paypalData.links.find((link: any) => link.rel === 'approve').href,
      }
    };
    
    return NextResponse.json(successResponse);
  } catch (error: any) {
    console.error('PayPal order creation error:', error);
    const errorResponse: GeneralResponse = {
      status: "bad",
      connectionActivity: "offline",
      statusCode: 500,
      success: false,
      message: error.message || 'Error creating PayPal order'
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}


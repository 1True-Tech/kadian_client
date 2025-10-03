// app/services/emailservice/route.ts
import { sendNotificationEmail, sendPasswordResetEmail } from "@/lib/controllers/emailService/sendMails";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { success: false, message: "Missing email type" },
        { status: 400 }
      );
    }

    const body = await request.json();

    let result;

    switch (type) {
      case "password-reset-email": {
        const { to, resetUrl } = body;
        if (!to || !resetUrl) {
          return NextResponse.json(
            { success: false, message: "Missing required fields" },
            { status: 400 }
          );
        }
        result = await sendPasswordResetEmail(to, resetUrl);
        break;
      }

      case "notification-email": {
        const { to, subject, templateName, data } = body;
        if (!to || !subject || !templateName) {
          return NextResponse.json(
            { success: false, message: "Missing required fields" },
            { status: 400 }
          );
        }
        result = await sendNotificationEmail(to, subject, templateName, data);
        break;
      }

      default:
        return NextResponse.json(
          { success: false, message: "Invalid email type" },
          { status: 400 }
        );
    }

    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (error: any) {
    console.error("Email route error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

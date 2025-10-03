import nodemailer, { SentMessageInfo } from "nodemailer";
import { createTransporter } from "./transporter";

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export const sendPasswordResetEmail = async (
  to: string,
  resetUrl: string
): Promise<EmailResult> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Kadian Support" <${
        process.env.EMAIL_FROM || "support@kadian.com"
      }>`,
      to,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password for your Kadian account. Please click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour for security reasons.</p>
          <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          <p>Thank you,<br>The Kadian Team</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777; text-align: center;">
            <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
            <p style="word-break: break-all;">${resetUrl}</p>
          </div>
        </div>
      `,
    };

    const info: SentMessageInfo = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV !== "production") {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message };
  }
};

interface NotificationData {
  name?: string;
  loginUrl?: string;
  orderId?: string;
  message?: string;
}

export const sendNotificationEmail = async (
  to: string,
  subject: string,
  templateName: "welcome" | "orderConfirmation" | "custom",
  data: NotificationData
): Promise<EmailResult> => {
  try {
    const transporter = createTransporter();

    let htmlContent = "";

    switch (templateName) {
      case "welcome":
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333; text-align: center;">Welcome to Kadian!</h2>
            <p>Hello ${data.name || ""},</p>
            <p>Thank you for creating an account with Kadian. We're excited to have you join our community!</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.loginUrl || ""}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Visit Your Account</a>
            </div>
            <p>Thank you,<br>The Kadian Team</p>
          </div>
        `;
        break;

      case "orderConfirmation":
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333; text-align: center;">Order Confirmation</h2>
            <p>Hello ${data.name || ""},</p>
            <p>Your order #${data.orderId || ""} has been received and is being processed.</p>
            <p>Thank you for shopping with Kadian!</p>
            <p>Thank you,<br>The Kadian Team</p>
          </div>
        `;
        break;

      default:
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333; text-align: center;">${subject}</h2>
            <p>Hello,</p>
            <p>${data.message || "Thank you for using Kadian."}</p>
            <p>Thank you,<br>The Kadian Team</p>
          </div>
        `;
    }

    const mailOptions = {
      from: `"Kadian Notifications" <${
        process.env.EMAIL_FROM || "notifications@kadian.com"
      }>`,
      to,
      subject,
      html: htmlContent,
    };

    const info: SentMessageInfo = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV !== "production") {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message };
  }
};

const sendMails =  {
  sendPasswordResetEmail,
  sendNotificationEmail,
};
export default sendMails
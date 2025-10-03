import nodemailer, { Transporter } from "nodemailer";

// Helper function to create transporter if not globally available
// You can adjust this depending on how you configure transporter
export const createTransporter = (): Transporter => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const transporter = createTransporter();

export { transporter };



import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/hooks/theme";
import {
  CircleCheckBigIcon,
  CircleOff,
  InfoIcon,
  LoaderCircleIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from "lucide-react";
import type { Metadata } from "next";
import "../assets/css/fonts.properties.css";
import 'primeicons/primeicons.css';
import "./globals.css";
import { cookies } from "next/headers";
import { LoadUser } from "@/lib/controllers/_loadUser";

export const metadata: Metadata = {
  title: "Kadian Nicely Clothing Store | Elegant Apparel For All Seasons",
  description: "Elevate your wardrobe with modern, fresh apparel! Explore our impeccable collection of stylish dresses & more for every occasion. We ship globally.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeCookie = "web-theme";
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get(themeCookie);
  return (
    <html lang="en" className={currentTheme?.value === "dark" ? "dark" : ""}>
      <body className="font-poppins antialiased">
        <ThemeProvider cookieKey={themeCookie}>
          {children}

          <Toaster
            icons={{
              close: <XCircleIcon />,
              success: <CircleCheckBigIcon />,
              error: <CircleOff />,
              info: <InfoIcon />,
              loading: <LoaderCircleIcon className="animate-spin" />,
              warning: <TriangleAlertIcon />,
            }}
            visibleToasts={3}
            swipeDirections={["top", "left", "right", "bottom"]}
            closeButton
            duration={3000}
            offset={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            }}
            richColors
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

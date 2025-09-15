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
import { cookies } from "next/headers";
import 'primeicons/primeicons.css';
import "../assets/css/fonts.properties.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kadian - Premium Fashion & Lifestyle",
    template: "%s | Kadian"
  },
  description: "Discover premium fashion and lifestyle products at Kadian. Shop the latest trends in clothing, accessories, and more.",
  keywords: ["fashion", "clothing", "lifestyle", "premium", "accessories", "shop", "online store"],
  authors: [{ name: "Kadian" }],
  metadataBase: new URL('https://kadian.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kadian.com",
    siteName: "Kadian",
    title: "Kadian - Premium Fashion & Lifestyle",
    description: "Discover premium fashion and lifestyle products at Kadian. Shop the latest trends in clothing, accessories, and more.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kadian - Premium Fashion & Lifestyle"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kadian - Premium Fashion & Lifestyle",
    description: "Discover premium fashion and lifestyle products at Kadian",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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

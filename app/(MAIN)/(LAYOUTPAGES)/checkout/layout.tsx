import PagesLayout from "@/components/layout/PagesLayout";
import { HasSlot } from "@/types/structures";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase securely at Kadian. Review your order and enter shipping details.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: HasSlot) {
  const breadcrumbItems = [
    { label: "Cart", href: "/cart" },
    { label: "Checkout" }
  ];  return (
    <PagesLayout showBreadcrumbs breadcrumbItems={breadcrumbItems}>
      {children}
    </PagesLayout>
  );
}

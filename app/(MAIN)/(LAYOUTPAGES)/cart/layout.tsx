import PagesLayout from "@/components/layout/PagesLayout";
import { HasSlot } from "@/types/structures";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "View and manage your shopping cart at Kadian. Review your selected items and proceed to checkout.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: HasSlot) {
  const breadcrumbItems = [{ label: "Shopping Cart" }];
  return (
    <PagesLayout showBreadcrumbs breadcrumbItems={breadcrumbItems}>
      {children}
    </PagesLayout>
  );
}

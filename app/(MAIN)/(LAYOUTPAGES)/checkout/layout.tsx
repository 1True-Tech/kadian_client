import PagesLayout from "@/components/layout/PagesLayout";
import { HasSlot } from "@/types";

export default function layout({ children }: HasSlot) {
  const breadcrumbItems = [
    { label: "Cart", href: "/cart" },
    { label: "Checkout" }
  ];  return (
    <PagesLayout showBreadcrumbs breadcrumbItems={breadcrumbItems}>
      {children}
    </PagesLayout>
  );
}

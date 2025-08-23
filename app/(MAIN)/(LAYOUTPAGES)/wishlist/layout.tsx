import PagesLayout from "@/components/layout/PagesLayout";
import { HasSlot } from "@/types";

export default function Layout({ children }: HasSlot) {
  const breadcrumbItems = [{ label: "Wishlist" }];
  return (
    <PagesLayout showBreadcrumbs breadcrumbItems={breadcrumbItems}>
      {children}
    </PagesLayout>
  );
}

import PagesLayout from "@/components/layout/PagesLayout";
import { HasSlot } from "@/types/structures";

export default function Layout({ children }: HasSlot) {
  const breadcrumbItems = [{ label: "Legal" }, { label: "Terms and condition" }];
  return (
    <PagesLayout showBreadcrumbs breadcrumbItems={breadcrumbItems}>
      {children}
    </PagesLayout>
  );
}

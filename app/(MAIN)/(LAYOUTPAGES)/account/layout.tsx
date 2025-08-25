import PagesLayout from "@/components/layout/PagesLayout";
import { HasSlot } from "@/types/structures";

export default function Layout({ children }: HasSlot) {
  const breadcrumbItems = [{ label: "Account Dashboard" }];
  return (
    <PagesLayout hasFooter={false} showBreadcrumbs breadcrumbItems={breadcrumbItems}>
      {children}
    </PagesLayout>
  );
}

import PagesLayout from "@/components/layout/PagesLayout";
import AccountSidebar from "@/components/pages/account/AccountLayout";
import { HasSlot } from "@/types/structures";
import { ReactNode } from "react";

export default function Layout({ children, mainHeader }: HasSlot & {mainHeader:ReactNode}) {
  const breadcrumbItems = [{ label: "Account Dashboard" }];
  return (
    <PagesLayout
      hasFooter={false}
      showBreadcrumbs
      breadcrumbItems={breadcrumbItems}
    >
      <AccountSidebar mainHeader={mainHeader}>{children}</AccountSidebar>
    </PagesLayout>
  );
}

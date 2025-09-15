import PagesLayout from "@/components/layout/PagesLayout";
import AccountSidebar from "@/components/pages/account/AccountLayout";
import { HasSlot } from "@/types/structures";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Kadian account. View orders, update profile, and manage addresses.",
  robots: {
    index: false,
    follow: true,
  },
};

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

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: { label: string; href?: string }[];
  className?: string;
  hasFooter?: boolean;
}

const PagesLayout = ({
  children,
  showBreadcrumbs = false,
  breadcrumbItems = [],
  className = "",
  hasFooter = true,
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {showBreadcrumbs && (
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      )}

      <main className={`flex-1 ${className}`}>{children}</main>
      {hasFooter && <Footer />}
    </div>
  );
};

export default PagesLayout;

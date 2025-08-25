import PagesLayout from "@/components/layout/PagesLayout";
import { HasSlot, ParamsProps } from "@/types/structures";

export default async function Layout({ children, params }: HasSlot & ParamsProps<{categorySlug:string|null}>) {
  const {categorySlug} = await params
  const breadcrumbItems = [
    { label: "Shop", href: "/shop" },
    { label: categorySlug||"" },
  ];
  return (
    <PagesLayout showBreadcrumbs breadcrumbItems={breadcrumbItems}>
      {children}
    </PagesLayout>
  );
}

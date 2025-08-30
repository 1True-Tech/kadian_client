import { notFound } from "next/navigation";
import { client } from "@/lib/utils/NSClient";
import { processProducts } from "@/lib/controllers/processShop/processProducts";
import PagesLayout from "@/components/layout/PagesLayout";
import { ParamsProps } from "@/types/structures";
import ProductDetailClient from "./ProductDetailClient";
import queries from "@/lib/queries";

const ProductDetail = async ({ params }: ParamsProps<{ id: string }>) => {
  const { id } = await params;
  
  // Fetch product from Sanity using the slug (id)
  const rawProduct = await client.fetch(queries.productBySlugQuery, { slug: id });
  
  if (!rawProduct) {
    notFound();
  }

  // Process the product data
  const [product] = processProducts([rawProduct]);
  // Create breadcrumb items


  const breadcrumbItems = [
    { label: "Shop", href: "/shop" },
    { label: product.name },
  ];

  return (
    <PagesLayout showBreadcrumbs breadcrumbItems={breadcrumbItems}>
      <ProductDetailClient product={product} />
    </PagesLayout>
  );
}
export default ProductDetail;

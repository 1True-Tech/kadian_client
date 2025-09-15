import { notFound } from "next/navigation";
import { client } from "@/lib/utils/NSClient";
import { processProducts } from "@/lib/controllers/processShop/processProducts";
import PagesLayout from "@/components/layout/PagesLayout";
import { ParamsProps } from "@/types/structures";
import ProductDetailClient from "./ProductDetailClient";
import queries from "@/lib/queries";
import { Metadata } from "next";

export async function generateMetadata({ params }: ParamsProps<{ id: string }>): Promise<Metadata> {
  const { id } = await params;
  const product = await client.fetch(queries.productBySlugQuery, { slug: id });

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description || `${product.name} - Premium fashion item at Kadian`,
    openGraph: {
      title: product.name,
      description: product.description || `${product.name} - Premium fashion item at Kadian`,
      images: product.images?.map((img: any) => ({
        url: img.url,
        width: 800,
        height: 600,
        alt: product.name
      })) || [],
    },
  };
}

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

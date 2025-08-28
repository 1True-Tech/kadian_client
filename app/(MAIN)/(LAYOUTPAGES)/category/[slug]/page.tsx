import { getCategoryBySlug } from "@/lib/controllers/processCategories";
import CategoryDetails from "@/components/pages/category/CategoryDetails";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }

  return <CategoryDetails category={category} />;
}

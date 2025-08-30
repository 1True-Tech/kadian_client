import { getCategoryBySlug } from "@/lib/controllers/processCategories";
import CategoryDetails from "@/components/pages/category/CategoryDetails";
import { notFound } from "next/navigation";
import { ParamsProps } from "@/types/structures";

export default async function CategoryPage({ params }: ParamsProps<{ slug: string }>) {
  const {slug} = await params
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  return <CategoryDetails category={category} />;
}

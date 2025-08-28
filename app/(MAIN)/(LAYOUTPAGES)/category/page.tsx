import { getAllCategories } from "@/lib/controllers/processCategories";
import CategoryList from "@/components/pages/category/CategoryList";

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  return <CategoryList initialCategories={categories} />;
}

import { getCategoryBySlug } from "@/lib/controllers/processCategories";
import CategoryDetails from "@/components/pages/category/CategoryDetails";
import { notFound } from "next/navigation";
import { ParamsProps } from "@/types/structures";
import { Metadata } from "next";
import { Suspense } from "react";
import CategorySkeleton from "@/components/pages/category/CategorySkeleton";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: ParamsProps<{ slug: string }>): Promise<Metadata> {
  try {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
      return {
        title: "Category Not Found",
        description: "The requested category could not be found.",
      };
    }

    return {
      title: `${category.name} | Shop by Category`,
      description: category.description || `Shop our ${category.name} collection at Kadian. Find the latest trends and styles.`,
      openGraph: {
        title: `${category.name} | Shop by Category`,
        description: category.description || `Shop our ${category.name} collection at Kadian. Find the latest trends and styles.`,
        images: category.category_images ? [...category.category_images.map(ci => ({ url: ci.src, width: 800, height: 600, alt: ci.alt }))] : [],
      },
    };
  } catch (error) {
    console.error("Error generating category metadata:", error);
    return {
      title: "Category | Kadian",
      description: "Explore our category collections at Kadian.",
    };
  }
}

export default async function CategoryPage({ params }: ParamsProps<{ slug: string }>) {
  try {
    const {slug} = await params;
    const category = await getCategoryBySlug(slug);
    
    if (!category) {
      notFound();
    }

    return (
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryDetails category={category} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading category page:", error);
    notFound();
  }
}

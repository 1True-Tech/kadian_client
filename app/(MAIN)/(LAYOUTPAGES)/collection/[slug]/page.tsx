import { getCollectionBySlug } from "@/lib/controllers/processCollections";
import CollectionProducts from "@/components/pages/collection/CollectionProducts";
import { notFound } from "next/navigation";
import { ParamsProps } from "@/types/structures";
import { Suspense } from "react";
import CollectionSkeleton from "@/components/pages/collection/CollectionSkeleton";
import { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: ParamsProps<{ slug: string }>): Promise<Metadata> {
  try {
    const { slug } = await params;
    const collection = await getCollectionBySlug(slug);

    if (!collection) {
      return {
        title: "Collection Not Found",
        description: "The requested collection could not be found.",
      };
    }

    return {
      title: `${collection.title} | Kadian Collection`,
      description: collection.description || `Explore our ${collection.title} collection at Kadian.`,
      openGraph: {
        title: `${collection.title} | Kadian Collection`,
        description: collection.description || `Explore our ${collection.title} collection at Kadian.`,
        images: collection.collection_images ? [...collection.collection_images.map(ci => ({ url: ci.src, width: 800, height: 600, alt: ci.alt }))] : [],
      },
    };
  } catch (error) {
    console.error("Error generating collection metadata:", error);
    return {
      title: "Collection | Kadian",
      description: "Explore our collections at Kadian.",
    };
  }
}

export default async function CollectionPage({ params }: ParamsProps<{ slug: string }>) {
  try {
    const {slug} = await params;
    const collection = await getCollectionBySlug(slug);
    
    if (!collection) {
      notFound();
    }

    return (
      <Suspense fallback={<CollectionSkeleton />}>
        <CollectionProducts collection={collection} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading collection page:", error);
    notFound();
  }
}

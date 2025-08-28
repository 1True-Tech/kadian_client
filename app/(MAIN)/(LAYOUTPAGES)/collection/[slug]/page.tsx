import { getCollectionBySlug } from "@/lib/controllers/processCollections";
import CollectionProducts from "@/components/pages/collection/CollectionProducts";
import { notFound } from "next/navigation";

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = await getCollectionBySlug(params.slug);
  
  if (!collection) {
    notFound();
  }

  return <CollectionProducts collection={collection} />;
}

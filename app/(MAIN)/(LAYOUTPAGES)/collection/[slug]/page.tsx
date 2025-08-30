import { getCollectionBySlug } from "@/lib/controllers/processCollections";
import CollectionProducts from "@/components/pages/collection/CollectionProducts";
import { notFound } from "next/navigation";
import { ParamsProps } from "@/types/structures";

export default async function CollectionPage({ params }: ParamsProps<{ slug: string }>) {
const {slug} = await params
  const collection = await getCollectionBySlug(slug);
  
  if (!collection) {
    notFound();
  }

  return <CollectionProducts collection={collection} />;
}

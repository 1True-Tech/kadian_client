import { getAllCollections } from "@/lib/controllers/processCollections";
import CollectionList from "@/components/pages/collection/CollectionList";

export default async function CollectionsPage() {
  const collections = await getAllCollections();
  return (
    <CollectionList initialCollections={collections.filter((c) => c.active)} />
  );
}

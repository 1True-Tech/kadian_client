import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { Collection, CollectionRaw } from "@/types/shop";

export const getAllCollections = async (): Promise<Collection[]> => {
  const collections = await client.fetch<CollectionRaw[]>(queries.allCollections);
  
  return collections.map(processCollection);
};

export const getCollectionBySlug = async (slug: string): Promise<Collection | null> => {
  const collections = await client.fetch<CollectionRaw[]>(queries.collectionBySlug, { slug });
  
  if (!collections.length) return null;
  return processCollection(collections[0]);
};

export const searchCollections = async (searchTerm: string): Promise<Collection[]> => {
  const collections = await client.fetch<CollectionRaw[]>(queries.searchCollections, { searchTerm });
  
  return collections.map(processCollection);
};

const processCollection = (collection: CollectionRaw): Collection => {
  return {
    ...collection,
    collection_images: (collection.collection_images || [])
      .filter(i => i.asset)
      .map(image => ({
        alt: image.alt,
        src: fashionImageBuilder([image.asset], {
          height: 700,
          width: 1200,
          quality: 100,
          format: "webp",
        })[0],
      })),
    products: (collection.products || []).map(product => ({
      ...product,
      image: {
        alt: product.image.alt,
        src: fashionImageBuilder([product.image.asset], {
          height: 700,
          width: 1200,
          quality: 100,
          format: "webp",
        })[0],
      },
    })),
  };
};

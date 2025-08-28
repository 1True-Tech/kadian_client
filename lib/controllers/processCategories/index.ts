import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { Category, CategoryRaw } from "@/types/shop";

export const getAllCategories = async (): Promise<Category[]> => {
  const categories = await client.fetch<CategoryRaw[]>(queries.allCategories);
  
  return categories.map(processCategory);
};

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const categories = await client.fetch<CategoryRaw[]>(queries.categoryBySlug, { slug });
  
  if (!categories.length) return null;
  return processCategory(categories[0]);
};

export const searchCategories = async (searchTerm: string): Promise<Category[]> => {
  const categories = await client.fetch<CategoryRaw[]>(queries.searchCategories, { searchTerm });
  
  return categories.map(processCategory);
};

const processCategory = (category: CategoryRaw): Category => {
  return {
    ...category,
    category_images: (category.category_images || [])
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
    collections: (category.collections || []).map(collection => ({
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
    })),
  };
};

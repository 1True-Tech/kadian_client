import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { ShopCategoryRaw, ShopCategoryReady } from "@/types/shop";

export const processShopCategory = async (slug:string): Promise<ShopCategoryReady> => {
  const items =
    (await client.fetch<ShopCategoryRaw[]>(queries.shopCategory, {slug})) ||
    ({} as ShopCategoryRaw);
    const shopCategory = items[0]

  const collections: ShopCategoryReady["collections"] = (shopCategory.collections||[]).map(
    (col) => ({
      ...col,
      products: (col.products||[]).map((p) => ({
        ...p,
        image: {
          alt: p.image.alt,
          src: fashionImageBuilder([p.image.asset], {
            height: 700,
            width: 1200,
            quality: 100,
            format: "webp",
          })[0],
        },
      })),
      collection_images: (col.collection_images||[])
        .filter((i) => i.asset)
        .map((i) => ({
          alt: i.alt,
          src: fashionImageBuilder([i.asset], {
            height: 700,
            width: 1200,
            quality: 100,
            format: "webp",
          })[0],
        })),
    })
  );
  return {
    ...shopCategory,
    collections: collections,
    category_images: (shopCategory.category_images||[])
      .filter((i) => i.asset)
      .map((i) => ({
        alt: i.alt,
        src: fashionImageBuilder([i.asset], {
          height: 700,
          width: 1200,
          quality: 100,
          format: "webp",
        })[0],
      })),
  };
};

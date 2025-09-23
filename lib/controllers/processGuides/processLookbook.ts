import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { Lookbook } from "@/types/guides";
import { imageAssetWithAlt } from "@/types/structures/image";

type LookbookRaw = Omit<Lookbook, "looks"> & {
  looks: Array<{
    image: imageAssetWithAlt;
    outfitDetails: Array<{
      name: string;
      description?: string;
      productLink: {
        _id: string;
        name: string;
        slug: { current: string };
        price: number;
        image: imageAssetWithAlt;
      };
    }>;
  }>;
};

export const processLookbook = (lookbook: LookbookRaw): Lookbook => {
  // Extract first paragraph from introduction for description if available
  let description = "";
  if (lookbook.introduction && lookbook.introduction.length > 0) {
    const firstBlock = lookbook.introduction[0];
    if (firstBlock.children && firstBlock.children.length > 0) {
      description = firstBlock.children[0]?.text || "";
    }
  }

  return {
    ...lookbook,
    description, // Add description field
    looks: lookbook.looks?.map((look) => ({
      ...look,
      image: {
        alt: look.image?.alt || "Lookbook image",
        src: fashionImageBuilder([look.image?.asset], {
          treatment: "lookbook",
          quality: 100,
          format: "webp",
        })[0],
      },
      outfitDetails: look.outfitDetails?.map((detail) => ({
        ...detail,
        productLink: {
          ...detail.productLink,
          image: {
            alt: detail.productLink?.image?.alt || "Product image",
            src: fashionImageBuilder([detail.productLink?.image?.asset], {
              treatment: "catalog",
              quality: 85,
              format: "webp",
            })[0],
          },
        },
      })) || [],
    })) || [],
  };
};

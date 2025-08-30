import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { imageAssetWithAlt } from "@/types/structures";
import { Lookbook } from "@/types/guides";

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
  return {
    ...lookbook,
    looks: lookbook.looks.map((look) => ({
      ...look,
      image: {
        alt: look.image.alt,
        src: fashionImageBuilder([look.image.asset], {
          treatment: "lookbook",
          quality: 100,
          format: "webp",
        })[0],
      },
      outfitDetails: look.outfitDetails.map((detail) => ({
        ...detail,
        productLink: {
          ...detail.productLink,
          image: {
            alt: detail.productLink.image.alt,
            src: fashionImageBuilder([detail.productLink.image.asset], {
              treatment: "catalog",
              quality: 85,
              format: "webp",
            })[0],
          },
        },
      })),
    })),
  };
};

import { Lookbook } from "@/types/guides";
import { ReadyImage } from "@/types/structures/image";

type LookbookRaw = Omit<Lookbook, "looks"> & {
  looks: Array<{
    image: ReadyImage&{caption:string};
    outfitDetails: Array<{
      name: string;
      description?: string;
      productLink: {
        _id: string;
        name: string;
        slug: { current: string };
        price: number;
        image: ReadyImage&{caption:string};
      };
    }>;
  }>;
};

export const processLookbook = (lookbook: LookbookRaw): Lookbook => {
  // Extract first paragraph from introduction for description if available
  const description =lookbook.introduction;


  return {
    ...lookbook,
    description, // Add description field
    looks: lookbook.looks?.map((look) => ({
      ...look,
      image: {
        alt: look.image?.alt || "Lookbook image",
        src: look.image?.src,
        caption: look.image?.caption ||"",
      },
      outfitDetails: look.outfitDetails?.map((detail) => ({
        ...detail,
        productLink: {
          ...detail.productLink,
          image: {
            alt: detail.productLink?.image?.alt || "Product image",
            src: detail.productLink?.image.src,
            caption: detail.productLink?.image.caption || "",
          },
        },
      })) || [],
    })) || [],
  };
};

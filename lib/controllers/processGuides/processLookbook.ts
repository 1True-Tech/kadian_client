import { Lookbook } from "@/types/guides";
import { ReadyImage } from "@/types/structures/image";

type LookbookRaw = Omit<Lookbook, "looks"> & {
  looks: Array<{
    image: ReadyImage & { caption: string };
    products?: Array<{
      product: {
        _id: string;
        name: string;
        slug: { current: string };
        price?: number;
        image: ReadyImage & { caption: string };
      };
      coordinates: { x: number; y: number };
    }>;
    styleNotes?: string;
  }>;
};

export const processLookbook = (lookbook: LookbookRaw): Lookbook => {
  const description = lookbook.introduction;

  return {
    ...lookbook,
    description,
    looks: lookbook.looks?.map((look) => ({
      ...look,
      image: {
        alt: look.image?.alt || "Lookbook image",
        src: look.image?.src,
        caption: look.image?.caption || "",
      },
      products: look.products?.map((item) => ({
        product: {
          ...item.product,
          image: {
            alt: item.product?.image?.alt || "Product image",
            src: item.product?.image?.src,
            caption: item.product?.image?.caption || "",
          },
        },
        coordinates: item.coordinates || { x: 0, y: 0 },
      })) || [],
      styleNotes: look.styleNotes || "",
    })) || [],
  };
};

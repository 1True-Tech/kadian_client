import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { imageAssetWithAlt } from "@/types";
import { LookBookItem } from "@/types/home";

export const processLookBook = async (): Promise<LookBookItem[]> => {
  const items = await client.fetch<
    (Omit<LookBookItem, "previewImage"> & {
      previewImage: imageAssetWithAlt;
    })[]
  >(queries.homePageLookBook);

  return items.map((item) => {
    const imageObj = item.previewImage;

    const { alt, ...image } = imageObj;

    let imageSrc = fashionImageBuilder([{ ...image }], {
      height: 700,
      width: 1200,
      quality: 100,
      format: "webp",
    })[0];

    // return the transformed item
    return {
      ...item,
      previewImage: {
        alt,
        src: imageSrc,
      },
    };
  });
};

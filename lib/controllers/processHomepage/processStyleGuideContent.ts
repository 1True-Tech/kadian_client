import { HomeStyleGuideItem } from "@/components/pages/home/styleGuide/types";
import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { imageAssetWithAlt, imageAssetWithAsset } from "@/types";

export const processHomeStyleGuide = async (): Promise<
  HomeStyleGuideItem[]
> => {
  const items = await client.fetch<
    (Omit<HomeStyleGuideItem, "image"> & {
      image: {
        alt: string;
        asset: imageAssetWithAsset;
      };
    })[]
  >(queries.homePageStyleGuide);

  return items.map((item) => {
    const { alt, asset } = item.image;

    const imageSrc = fashionImageBuilder([asset ], {
      height: 700,
      width: 1200,
      quality: 100,
      format: "webp",
    })[0];

    // return the transformed item
    return {
      ...item,
      image: {
        alt,
        src: imageSrc,
      },
    };
  });
};

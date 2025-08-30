import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { imageAssetWithAlt } from "@/types/structures";
import { SizeGuide } from "@/types/guides";

type SizeGuideRaw = Omit<SizeGuide, "images"> & {
  images: imageAssetWithAlt[];
};

export const processSizeGuide = (guide: SizeGuideRaw): SizeGuide => {
  return {
    ...guide,
    images: guide.images
      ?.filter((image) => image.asset) // Filter out images with no asset
      .map((image) => ({
        alt: image.alt,
        src: fashionImageBuilder([image.asset], {
          treatment: "catalog",
          quality: 90,
          format: "webp",
        })[0],
      })),
  };
};

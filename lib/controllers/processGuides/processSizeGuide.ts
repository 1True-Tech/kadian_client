import { SizeGuide } from "@/types/guides";
import { ReadyImage } from "@/types/structures";

type SizeGuideRaw = Omit<SizeGuide, "images"> & {
  images: (ReadyImage&{caption:string})[];
};

export const processSizeGuide = (guide: SizeGuideRaw): SizeGuide => {
  return {
    ...guide,
    images: guide.images
      ?.filter((image) => image.src) // Filter out images with no asset
      .map((image) => ({
        alt: image.alt,
        src: image.src,
        caption: image.caption
      })),
  };
};

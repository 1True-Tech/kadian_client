import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { imageAssetWithAlt } from "@/types/structures";
import { StyleGuide } from "@/types/guides";

type StyleGuideRaw = Omit<StyleGuide, "sections"> & {
  sections: Array<{
    title: string;
    content: any[];
    styleImages: imageAssetWithAlt[];
  }>;
};

export const processStyleGuide = (guide: StyleGuideRaw): StyleGuide => {
  return {
    ...guide,
    sections: guide.sections.map((section) => ({
      ...section,
      styleImages: section.styleImages
        .filter((image) => image.asset) // Filter out images with no asset
        .map((image) => ({
          alt: image.alt,
          src: fashionImageBuilder([image.asset], {
            treatment: "catalog",
            quality: 90,
            format: "webp",
          })[0],
        })),
    })),
  };
};

import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { StyleGuide } from "@/types/guides";
import { MarkDef } from "@/types/structures/content";
import { imageAssetWithAlt } from "@/types/structures/image";

type StyleGuideRaw = Omit<StyleGuide, "sections"> & {
  sections: Array<{
    title: string;
    content: MarkDef[];
    styleImages: imageAssetWithAlt[];
  }>;
};

export const processStyleGuide = (guide: StyleGuideRaw): StyleGuide => {
  // Extract first paragraph from introduction for description if available
  let description = "";
  if (guide.introduction && guide.introduction.length > 0) {
    const firstBlock = guide.introduction[0];
    if (firstBlock.children && firstBlock.children.length > 0) {
      description = firstBlock.children[0]?.text || "";
    }
  }

  return {
    ...guide,
    description, // Add description field
    sections: guide.sections?.map((section) => ({
      ...section,
      styleImages: section.styleImages
        ?.filter((image) => image && image.asset) // Filter out images with no asset
        .map((image) => ({
          alt: image.alt || "Style guide image",
          src: fashionImageBuilder([image.asset], {
            treatment: "catalog",
            quality: 90,
            format: "webp",
          })[0],
        })) || [],
    })) || [],
  };
};

import { StyleGuide } from "@/types/guides";
import { ReadyImage } from "@/types/structures";
import { TypedObject } from "sanity";

type StyleGuideRaw = Omit<StyleGuide, "sections"> & {
  sections: Array<{
    title: string;
    content: TypedObject[];
    styleImages: (ReadyImage & { caption: string })[];
  }>;
};

export const processStyleGuide = (guide: StyleGuideRaw): StyleGuide => {
  // Extract first paragraph from introduction for description if available
  const description = guide.introduction;

  return {
    ...guide,
    description, // Add description field
    sections:
      guide.sections?.map((section) => ({
        ...section,
        styleImages:
          section.styleImages
            ?.filter((image) => image && image.src) // Filter out images with no asset
            .map((image) => ({
              alt: image.alt || "Style guide image",
              src: image.src,
              caption: image.caption,
            })) || [],
      })) || [],
  };
};

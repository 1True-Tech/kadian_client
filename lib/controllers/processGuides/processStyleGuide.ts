import { StyleGuide } from "@/types/guides";
import { ReadyImage } from "@/types/structures";
import { TypedObject } from "sanity";

type StyleGuideRaw = Omit<StyleGuide, "sections"> & {
  sections: Array<{
    title: string;
    content: TypedObject[];
    styleImages: (ReadyImage & { caption: string })[];
    tips?: { tip: string; importance: "essential" | "recommended" | "optional" }[];
    relatedProducts?: Array<{
      _id: string;
      title: string;
      slug: string;
      image?: ReadyImage;
      price?: number;
    }>;
  }>;
  difficulty?: "beginner" | "intermediate" | "advanced";
  targetAudience?: string[];
  seasonality?: string[];
  seo?: {
    title?: string;
    description?: string;
  };
};

export const processStyleGuide = (guide: StyleGuideRaw): StyleGuide => {
  const description = guide.introduction;

  return {
    ...guide,
    description,
    sections:
      guide.sections?.map((section) => ({
        ...section,
        styleImages:
          section.styleImages
            ?.filter((image) => image && image.src)
            .map((image) => ({
              alt: image.alt || "Style guide image",
              src: image.src,
              caption: image.caption,
            })) || [],
        tips: section.tips?.map((tip) => ({
          tip: tip.tip,
          importance: tip.importance,
        })) || [],
        relatedProducts:
          section.relatedProducts?.map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug,
            image: p.image
              ? {
                  alt: p.image.alt || "Product image",
                  src: p.image.src,
                }
              : undefined,
            price: p.price,
          })) || [],
      })) || [],
    difficulty: guide.difficulty || undefined,
    targetAudience: guide.targetAudience || [],
    seasonality: guide.seasonality || [],
    seo: guide.seo,
  };
};

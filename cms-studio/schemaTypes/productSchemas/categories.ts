import { defineArrayMember, defineField, defineType } from "sanity";
import { imageGallery } from "./imageGallery";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { initialLetters } from "@/lib/utils/elipsis";

export const categories = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "The human-readable name of the category",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Optional parent category for hierarchical organization",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier generated from the category name",
      options: { source: "name", maxLength: 50 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief overview of this category",
      validation: (Rule) => Rule.max(200),
    }),
    imageGallery({
      name: "category_images",
      title: "Category Images",
      description:
        "Category image gallery; each image must have alt text for accessibility.",
    }),
    defineField({
      name: "collections",
      title: "Collections",
      type: "array",
      description: "Which shop collections belong this category",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "collection" }],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "category_images",
      subtitle: "slug.current",
    },
    prepare({ title, media, subtitle }) {
      const { primary, text } = generateAccessibleColorPair();
      const moddedTitle = title || "Untitled category";
      const previewImgText = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(moddedTitle, 2),
        text
      );
      const image = media?.length > 0 && media[0].asset?media[0].asset: null;
      const url =
        image
          ? fashionImageBuilder(
              [image],
              {
                quality: 50,
                treatment: "thumbnail",
                format: "webp",
              }
            )[0]
          : previewImgText;

      return {
        title,
        imageUrl: url,
        subtitle,
      };
    },
  },
});

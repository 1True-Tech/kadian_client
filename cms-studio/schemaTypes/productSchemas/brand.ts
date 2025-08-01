import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { initialLetters } from "@/lib/utils/elipsis";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { defineField, defineType } from "sanity";

export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Brand Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "metadata",
      title: "SEO Metadata",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: "openGraphImage",
          title: "Open Graph Image",
          type: "image",
          description: "Image for social media sharing",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo.asset",
      sub: "slug.current",
    },
    prepare({ title, media, sub }) {
      const { primary, text } = generateAccessibleColorPair();
      const moddedTitle = title || "Nameless Brand";
      const previewImgText = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(moddedTitle, 2),
        text
      );
      const url = media
        ? fashionImageBuilder([media], {
            quality: 80,
            treatment: "thumbnail",
            format: "webp",
          })[0]
        : previewImgText;

      return {
        title,
        imageUrl: url,
        subtitle: sub ? sub : "No slug",
      };
    },
  },
});

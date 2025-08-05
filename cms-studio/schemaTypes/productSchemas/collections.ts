import { defineArrayMember, defineField, defineType } from "sanity";
import { imageGallery } from "../general/imageGallery";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { initialLetters } from "@/lib/utils/elipsis";

export const collections = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The human-readable name of the collection",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier generated from the title",
      options: { source: "title", maxLength: 100 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief overview of this collection",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      description: "List of products included in this collection",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "product" }],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    imageGallery({
      name: "collection_images",
      title: "Collection Images",
      description:
        "Collection image gallery; each image must have alt text for accessibility.",
    }),
    defineField({
          name: "active",
          title: "Active",
          type: "boolean",
          description: "Show this collection on the homepage",
          initialValue: true,
        }),
    defineField({
      name: "priority",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "dateRange",
      title: "Collection Date Range",
      type: "object",
      description: "Optional date range for seasonal collections",
      fields: [
        defineField({
          name: "startDate",
          title: "Start Date",
          type: "date",
        }),
        defineField({
          name: "endDate",
          title: "End Date",
          type: "date",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "collection_images",
      subtitle: "slug.current",
    },
    prepare({ title, media, subtitle }) {
      const { primary, text } = generateAccessibleColorPair();
      const moddedTitle = title || "Untitled collection";
      const previewImgText = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(moddedTitle, 2),
        text
      );
      const mainImage = media?media.find((m: { primary: any; }) => m.primary):null

      const url =
        mainImage
          ? fashionImageBuilder(
              [mainImage.asset],
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

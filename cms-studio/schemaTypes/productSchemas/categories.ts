import { defineField, defineType } from "sanity";
import { imageGallery } from "./imageGallery";
import { fashionImageBuilder } from "@/cms-studio/lib/utils/fashionImageTransformer";

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
  ],
  preview: {
    select: {
      title: "name",
      media: "category_images",
      subtitle: "slug.current",
    },
    prepare({ title, media, subtitle }) {
      const url =
        media?.length > 0
          ? fashionImageBuilder(media.map((i: { asset: any; })=>i.asset), {
              quality: 80,
              treatment: "thumbnail",
              format: "webp",
            })[0]
          : undefined;

      return {
        title,
        imageUrl: url,
        subtitle,
      };
    },
  },
});

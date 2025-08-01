import { defineArrayMember, defineField, defineType } from "sanity";
import { imageGallery } from "./imageGallery";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";

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

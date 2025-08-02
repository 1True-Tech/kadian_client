import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { initialLetters } from "@/lib/utils/elipsis";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { defineField, defineType } from "sanity";

export const lookbook = defineType({
  name: "lookbook",
  title: "Lookbook",
  type: "document",
  fieldsets: [
    {
      name: "metadata",
      title: "Metadata & Scheduling",
      options: { collapsible: true },
    },
    {
      name: "content",
      title: "Lookbook Content",
      options: { collapsible: true },
    },
  ],
  fields: [
    // Basic Info
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Season Name",
          type: "string",
          options: {
            list: [
              { title: "Spring/Summer", value: "SS" },
              { title: "Fall/Winter", value: "FW" },
              { title: "Resort", value: "RS" },
              { title: "Holiday", value: "HL" },
            ],
          },
        }),
        defineField({
          name: "year",
          title: "Year",
          type: "number",
          validation: (Rule) => Rule.required().min(2020).max(2030),
        }),
      ],
    }),

    // Content
    defineField({
      name: "introduction",
      title: "Introduction",
      fieldset: "content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "looks",
      title: "Looks",
      fieldset: "content",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Look Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alt Text",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "caption",
                  type: "string",
                  title: "Caption",
                }),
              ],
            }),
            {
              name: "products",
              title: "Featured Products",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "product",
                      title: "Product",
                      type: "reference",
                      to: [{ type: "product" }],
                    },
                    {
                      name: "coordinates",
                      title: "Image Coordinates",
                      type: "object",
                      fields: [
                        {
                          name: "x",
                          type: "number",
                          validation: (Rule) => Rule.required().min(0).max(100),
                        },
                        {
                          name: "y",
                          type: "number",
                          validation: (Rule) => Rule.required().min(0).max(100),
                        },
                      ],
                      description:
                        "Position of product tag in image (percentage)",
                    },
                  ],
                },
              ],
            },
            {
              name: "styleNotes",
              title: "Styling Notes",
              type: "text",
            },
          ],
          preview: {
            select: {
              media: "image",
              products: "products",
            },
            prepare({ media, products }) {
              const { primary, text } = generateAccessibleColorPair();
              const previewImgText = createColorSwatchDataUrl(
                primary,
                32,
                0,
                initialLetters("Look", 2),
                text
              );
              const url = media?.asset
                ? fashionImageBuilder([media], {
                    quality: 80,
                    treatment: "thumbnail",
                    format: "webp",
                  })[0]
                : previewImgText;
              return {
                title: media.caption || "Untitled Look",
                subtitle: `${products?.length || 0} products tagged`,
                imageUrl: url,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Metadata
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
      fieldset: "metadata",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Style Tags",
      type: "array",
      fieldset: "metadata",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fieldset: "metadata",
      fields: [
        {
          name: "title",
          title: "SEO Title",
          type: "string",

          validation: (Rule) => Rule.max(60),
        },
        {
          name: "description",
          title: "Meta Description",
          type: "text",
          validation: (Rule) => Rule.max(160),
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      season: "season",
      looks: "looks"
    },
    prepare({ title, season,looks }) {
      const { primary, text } = generateAccessibleColorPair();
      const moddedTitle = title || "Untitled Lookbook";
      const previewImgText = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(moddedTitle, 2),
        text
      );
      const image = looks?.length > 0 && looks[0].image.asset?looks[0].image: null;
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
        title: moddedTitle,
        subtitle: season
          ? `${season.name} ${season.year}`
          : "No Season Specified",
        imageUrl: url,
      };
    },
  },
});

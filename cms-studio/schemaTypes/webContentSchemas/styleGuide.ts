import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { initialLetters } from "@/lib/utils/elipsis";
import { defineField, defineType } from "sanity";
import { imageGallery } from "../productSchemas/imageGallery";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";

export const styleGuide = defineType({
  name: "styleGuide",
  title: "Style Guide",
  type: "document",
  fieldsets: [
    { name: "content", title: "Guide Content", options: { collapsible: true } },
    { name: "metadata", title: "Metadata", options: { collapsible: true } },
  ],
  fields: [
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
      name: "category",
      title: "Guide Category",
      type: "string",
      options: {
        list: [
          { title: "Body Type Guide", value: "bodyType" },
          { title: "Occasion Styling", value: "occasion" },
          { title: "Color Combinations", value: "colors" },
          { title: "Wardrobe Essentials", value: "essentials" },
          { title: "Seasonal Trends", value: "trends" },
          { title: "Mix and Match", value: "mixMatch" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // Content Fields
    defineField({
      name: "introduction",
      title: "Introduction",
      fieldset: "content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "sections",
      title: "Guide Sections",
      fieldset: "content",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Section Content",
              type: "array",
              of: [
                { type: "block" },
                {
                  type: "image",
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
                },
              ],
            }),
            imageGallery({
              name: "styleImages",
              title: "Style Image Gallery",
              description: "Optional gallery of images for this section",
              important: false,
              previewImgOptions: {
                format: "webp",
                quality: 50,
                treatment: "thumbnail",
              },
            }),
            defineField({
              name: "tips",
              title: "Quick Tips",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "tip",
                      title: "Tip",
                      type: "text",
                    }),
                    defineField({
                      name: "importance",
                      title: "Importance Level",
                      type: "string",
                      options: {
                        list: [
                          { title: "Essential", value: "essential" },
                          { title: "Recommended", value: "recommended" },
                          { title: "Optional", value: "optional" },
                        ],
                      },
                    }),
                  ],
                },
              ],
            }),
            {
              name: "relatedProducts",
              title: "Recommended Products",
              type: "array",
              of: [
                {
                  type: "reference",
                  to: [{ type: "product" }],
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Metadata
    defineField({
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      fieldset: "metadata",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
      },
    }),
    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "array",
      fieldset: "metadata",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Women", value: "women" },
          { title: "Men", value: "men" },
          { title: "Teens", value: "teens" },
          { title: "Plus Size", value: "plusSize" },
          { title: "Petite", value: "petite" },
        ],
      },
    }),
    defineField({
      name: "seasonality",
      title: "Seasonal Relevance",
      type: "array",
      fieldset: "metadata",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Spring", value: "spring" },
          { title: "Summer", value: "summer" },
          { title: "Fall", value: "fall" },
          { title: "Winter", value: "winter" },
          { title: "All Seasons", value: "allSeasons" },
        ],
      },
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fieldset: "metadata",
      fields: [
        defineField({
          name: "title",
          title: "SEO Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      sections: "sections",
    },
    prepare({ category, title, sections }) {
      const { primary, text } = generateAccessibleColorPair();
      const guides = sections?.length || 0;
      const image =
        sections &&
        sections.length > 0 &&
        (sections[0].styleImages&&sections[0].styleImages.length>0) &&
        sections[0].styleImages[0].asset
          ? sections[0].styleImages[0].asset
          : null;
      const moddedTitle = title || "Untitled Style Guide";
      const previewImgText = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(moddedTitle, 2),
        text
      );
      const previewImg = image
        ? fashionImageBuilder([image], {
            quality: 75,
            colorScheme: "soft",
            treatment: "thumbnail",
            format: "webp",
          })[0]
        : previewImgText;
      return {
        title: moddedTitle,
        subtitle: category
          ? `Category: ${category}, guides: ${guides}`
          : `No Category, guides: ${guides}`,
        imageUrl: previewImg,
      };
    },
  },
});

import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { initialLetters } from "@/lib/utils/elipsis";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { defineField, defineType } from "sanity";

export const homepageHero = defineType({
  name: "homepageHero",
  title: "Homepage Hero",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "mobile",
          type: "image",
          title: "Mobile Background",
          description: "Optional different image for mobile devices",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
          description: "URL or internal link path",
        }),
        defineField({
          name: "style",
          title: "Style",
          type: "string",
          options: {
            list: [
              { title: "Primary", value: "primary" },
              { title: "Secondary", value: "secondary" },
              { title: "Outline", value: "outline" },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Show this hero section on the homepage",
      initialValue: true,
    }),
    defineField({
      name: "priority",
      title: "Display Priority",
      type: "number",
      description: "Lower numbers appear first",
      validation: (Rule) => Rule.integer().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      description: "When this hero section should start displaying",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description: "When this hero section should stop displaying",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "backgroundImage",
      active: "active",
    },
    prepare({ title, media, active }) {
      const { primary, text } = generateAccessibleColorPair();
      const moddedTitle = title || "Untitled Hero Section";
      const previewImgText = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(moddedTitle, 2),
        text
      );
      const previewImg = media
        ? fashionImageBuilder([media.asset], {
            quality: 75,
            colorScheme: "soft",
            treatment: "thumbnail",
            format: "webp",
          })[0]
        : previewImgText;
      return {
        title,
        subtitle: active ? "Active" : "Inactive",
        imageUrl: previewImg,
      };
    },
  },
});

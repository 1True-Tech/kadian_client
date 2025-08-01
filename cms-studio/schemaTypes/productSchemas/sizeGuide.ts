import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { defineField, defineType } from "sanity";
import { imageGallery } from "./imageGallery";

export const sizeGuide = defineType({
  name: "sizeGuide",
  title: "Size Guide",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
      description: "Which category this size guide applies to",
    }),
    defineField({
      name: "measurementInstructions",
      title: "Measurement Instructions",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "sizeChart",
      title: "Size Chart",
      type: "object",
      fields: [
        {
          name: "units",
          title: "Measurement Units",
          type: "string",
          options: {
            list: [
              { title: "Centimeters", value: "cm" },
              { title: "Inches", value: "in" },
            ],
          },
        },
        {
          name: "measurements",
          title: "Measurements",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "sizeName",
                  title: "Size Name",
                  type: "string",
                },
                {
                  name: "chest",
                  title: "Chest",
                  type: "number",
                },
                {
                  name: "waist",
                  title: "Waist",
                  type: "number",
                },
                {
                  name: "hips",
                  title: "Hips",
                  type: "number",
                },
                {
                  name: "inseam",
                  title: "Inseam",
                  type: "number",
                },
              ],
              preview: {
                select: {
                  title: "sizeName",
                  chest: "chest",
                  waist: "waist",
                },
                prepare({ title, chest, waist }) {
                  return {
                    title: title,
                    subtitle: `Chest: ${chest}, Waist: ${waist}`,
                  };
                },
              },
            },
          ],
        },
      ],
    }),
    imageGallery({
      name: "images",
      title: "Measurement Guide Images",
      description:
        "Image gallery for measurement guide; each image must have alt text for accessibility.",
      important: false,
      imageSubText: {
        name: "caption",
        title: "Caption",
        description: "A short description of the image.",
        validation: undefined,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.name",
      media: "category.category_images[0].asset"
    },
    prepare({ title, category,media }) {
      const { primary, text } = generateAccessibleColorPair();
      const previewImgText = createColorSwatchDataUrl(
        primary,
        32,
        0,
        `${title.at(0)}${title.at(title.length / 2 - 1)}`.toUpperCase(),
        text
      );
      const previewImg = fashionImageBuilder([media], {
        quality:75,
        colorScheme:"warmTone",
        treatment:"thumbnail",
        format:"webp"
      })[0] || previewImgText;
      return {
        title: title || "Untitled",
        subtitle: category ? `For ${category}` : "",
        imageUrl: previewImg,
      };
    },
  },
});

import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { defineField, defineType } from "sanity";
import { imageGallery } from "../general/imageGallery";
import { initialLetters } from "@/lib/utils/elipsis";

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
      singleImageConfig: {
        alt: {
          description: "A short description of the image.",
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.name",
      media: "images",
    },
    prepare({ title, category, media }) {
      const { primary, text } = generateAccessibleColorPair();
      const moddedTitle = title || "Untitled Size Guide";
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
        title: moddedTitle || "Untitled",
        subtitle: category ? `For ${category}` : "Uncategorized",
        imageUrl: url,
      };
    },
  },
});

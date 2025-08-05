import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { ellipsisMiddle, initialLetters } from "@/lib/utils/elipsis";
import { defineField, defineType } from "sanity";

export const materialType = defineType({
  name: "material",
  title: "Material",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Material Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "careInstructions",
      title: "Care Instructions",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Instructions for garment care (washing, drying, ironing, etc.)",
      options: {
        layout: "tags",
      },
    }),
  ],
  preview: {
    select: { name: "name", description: "description" },
    prepare({ name, description }) {
      const { primary, text } = generateAccessibleColorPair({ text: "#fff" });
      const previewImg = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(name, 1),
        text
      );
      return {
        title: name,
        subtitle: ellipsisMiddle(description, 5, "char"),
        imageUrl: previewImg,
      };
    },
  },
});

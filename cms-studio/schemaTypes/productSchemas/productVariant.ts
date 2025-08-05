// schemas/variant.ts
import { defineArrayMember, defineField } from "sanity";
import units from "../feauturesAndConfigsSchema/units";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { imageGallery } from "../general/imageGallery";
import { initialLetters } from "@/lib/utils/elipsis";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";

export const variantType = defineField({
  name: "variants",
  title: "Variants",
  type: "array",
  description: "Different versions or models of this product",
  of: [
    defineArrayMember({
      type: "object",
      name: "variant",
      title: "Variant",
      // Default new variants to inherit the product's type
      fields: [
        // GENERAL FIELDS: for both cloth & skincare
        defineField({
          name: "sku",
          title: "SKU",
          type: "string",
          description: "Unique Stock Keeping Unit",
        }),
        imageGallery({
          name: "images",
          title: "Variant Images",
          description:
            "Images specific to this variant; can be different from the main product images.",
        }),
        defineField({
          name: "isBase",
          title: "Set as Base Variant",
          type: "boolean",
          description: "Show this variant as the default option",
          initialValue: false,
        }),
        defineField({
          name: "stock",
          title: "Stock Level",
          type: "number",
          description: "Items available in stock",
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: "barcode",
          title: "Barcode",
          type: "string",
          description: "Unique barcode identifier",
        }),
        defineField({
          name: "stockThreshold",
          title: "Low Stock Threshold",
          type: "number",
          description: "Notify when stock falls below this number",
          validation: (Rule) => Rule.min(1),
        }),
        defineField({
          name: "weight",
          title: "Product Weight",
          type: "object",
          description: "Weight for shipping calculations",
          fields: [
            defineField({
              name: "value",
              title: "Weight Value",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: "unit",
              title: "Weight Unit",
              type: "string",
              options: { list: units, layout: "radio" },
            }),
          ],
        }),
        defineField({
          name: "price",
          title: "Price",
          type: "number",
          description: "Retail price",
          validation: (Rule) =>
            Rule.required()
              .min(0)
              .custom((val) => {
                if (val === undefined || val === null) return true;
                const fixed = Number(val).toFixed(2);
                return Number(fixed) === val
                  ? true
                  : "Price must have exactly two decimal places (e.g. 19.99 or 10.00)";
              }),
        }),
        // CLOTH-ONLY FIELDS
        defineField({
          name: "size",
          title: "Size",
          type: "reference",
          to: [{ type: "size" }],
          description: "Select a predefined size",
        }),
        defineField({
          name: "color",
          title: "Color",
          type: "reference",
          to: [{ type: "color" }],
          description: "Select a predefined color",
        }),
      ],
      preview: {
        select: { sku: "sku", stock: "stock", media: "images" },
        prepare({ sku, stock, media }) {
          const { primary, text } = generateAccessibleColorPair({
            text: "#fff",
          });
          const previewImgText = createColorSwatchDataUrl(
            primary,
            32,
            0,
            initialLetters(sku, 1),
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
            title: sku,
            subtitle: `Stock: ${stock}`,
            imageUrl: url,
          };
        },
      },
    }),
  ],
  validation: (Rule) =>
    Rule.custom<{ isBase: boolean }[]>((variants) => {
      if (!Array.isArray(variants)) return true;
      if (variants.length <= 0)
        return "You need a variant before this product can be shown.";
      const baseCount = variants.filter((v) => v?.isBase === true).length;
      if (baseCount > 1) {
        return "Only one variant can be set as the base.";
      }
      return true;
    }),
});

// schemas/variant.ts
import { defineArrayMember, defineField } from "sanity";
import { generateAccessibleColorPair } from "../../lib/helpers/color_generator";
import { createColorSwatchDataUrl } from "../../lib/helpers/color_swatch";
import units from "../feauturesAndConfigsSchema/units";

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
                  : "Price must have exactly two decimal places (e.g. 19.99)";
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
        select: { sku: "sku", stock: "stock" },
        prepare({ sku, stock }) {
          const { primary, text } = generateAccessibleColorPair({
            text: "#fff",
          });
          return {
            title: sku,
            subtitle: `Stock: ${stock}`,
            imageUrl: createColorSwatchDataUrl(
              primary,
              32,
              0,
              sku.charAt(0).toUpperCase(),
              text
            ),
          };
        },
      },
    }),
  ],
});

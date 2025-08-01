import { defineField, defineType } from "sanity";
import units from "../feauturesAndConfigsSchema/units";
import { generateAccessibleColorPair } from "../../lib/helpers/color_generator";
import { createColorSwatchDataUrl } from "../../lib/helpers/color_swatch";

export const deliveryZones = defineType({
  name: "shipping_zone",
  title: "Shipping Zones",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Zone name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deliveryTime",
      title: "Estimated Delivery Time",
      type: "object",
      fields: [
        defineField({
          name: "min",
          title: "Minimum Days",
          type: "number",
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: "max",
          title: "Maximum Days",
          type: "number",
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "rates",
      title: "Zone rates",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "amount",
              title: "Rate Amount",
              type: "number",
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
            defineField({
              name: "unitType",
              title: "Unit Type",
              type: "string",
              options: {
                list: units.map((unit) => ({
                  title: unit.title,
                  value: unit.value,
                })),
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              amount: "amount",
              unit: "unitType",
            },
            prepare({ amount, unit }) {
              const { primary, text } = generateAccessibleColorPair({
                text: "#fff",
              });

              return {
                title: `$${amount?.toLocaleString() || 0} per ${
                  unit?.toUpperCase() || ""
                }`,
                imageUrl: createColorSwatchDataUrl(
                  primary,
                  32,
                  0,
                  unit.toUpperCase(),
                  text
                ),
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      rates: "rates",
    },
    prepare({ title, rates }) {
      const { primary, text } = generateAccessibleColorPair({ text: "#fff" });
      const previewImg = createColorSwatchDataUrl(
        primary,
        32,
        0,
        `${title.at(0)}${title.at(title.length / 2 - 1)}`.toUpperCase(),
        text
      );
      return {
        title,
        subtitle: `${rates?.length || 0} rate${
          rates?.length === 1 ? "" : "s"
        } configured`,
        imageUrl: previewImg,
      };
    },
  },
});

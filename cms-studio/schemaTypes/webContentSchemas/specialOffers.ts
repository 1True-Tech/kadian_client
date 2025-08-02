import { defineField, defineType } from "sanity";
import { imageGallery } from "../productSchemas/imageGallery";
import { generateAccessibleColorPair } from "@/lib/utils/colorsProcessors/colorGenerator";
import { createColorSwatchDataUrl } from "@/lib/utils/colorsProcessors/color_swatch";
import { initialLetters } from "@/lib/utils/elipsis";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";

export const SpecialOffers = defineType({
  name: "special_offers",
  title: "Special Offers",
  type: "document",
  fieldsets: [
    {
      name: "offerDetails",
      title: "Offer Details",
      options: { collapsible: true },
    },
    {
      name: "products",
      title: "Products & Pricing",
      options: { collapsible: true },
    },
    {
      name: "scheduling",
      title: "Offer Schedule",
      options: { collapsible: true },
    },
    {
      name: "display",
      title: "Display Settings",
      options: { collapsible: true },
    },
    {
      name: "seo",
      title: "SEO Settings",
      options: { collapsible: true },
    },
  ],
  fields: [
    defineField({
      name: "category",
      title: "Offer Type",
      type: "string",
      fieldset: "offerDetails",
      options: {
        list: [
          { title: "Flash Sale", value: "flash_sale" },
          { title: "Seasonal Sale", value: "seasonal_sale" },
          { title: "Clearance", value: "clearance" },
          { title: "Bundle Deal", value: "bundle" },
          { title: "New Customer Offer", value: "new_customer" },
          { title: "Featured Products", value: "featured" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Offer Title",
      type: "string",
      fieldset: "offerDetails",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "offerDetails",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Products in Offer",
      type: "array",
      fieldset: "products",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "discountType",
              title: "Discount Type",
              type: "string",
              options: {
                list: [
                  { title: "Percentage Off", value: "percentage" },
                  { title: "Fixed Amount Off", value: "fixed" },
                  { title: "Special Price", value: "special" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "discountValue",
              title: "Discount Value",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "featured",
              title: "Featured in Offer",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "product.name",
              discountType: "discountType",
              discountValue: "discountValue",
            },
            prepare({ title, discountType, discountValue }) {
              const discountDisplay =
                discountType === "percentage"
                  ? `${discountValue}% off`
                  : `₦${discountValue} off`;
              return {
                title: title || "Unnamed Product",
                subtitle: discountDisplay,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "minPurchase",
      title: "Minimum Purchase Amount",
      type: "number",
      fieldset: "products",
      description:
        "Minimum purchase amount to qualify for the offer (optional)",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "maxDiscount",
      title: "Maximum Discount Amount",
      type: "number",
      fieldset: "products",
      description: "Maximum discount amount per order (optional)",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "start_date",
      title: "Start Date & Time",
      type: "datetime",
      fieldset: "scheduling",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "end_date",
      title: "End Date & Time",
      type: "datetime",
      fieldset: "scheduling",
      validation: (Rule) =>
        Rule.required()
          .min(Rule.valueOfField("start_date"))
          .error("End date must be after start date"),
    }),
    imageGallery({
      name: "displayImages",
      title: "Offer Display Images",
      fieldset: "display",
      description:
        "Images to display for this offer (banners, featured products, etc.)",
    }),
    defineField({
      name: "highlightColor",
      title: "Highlight Color",
      fieldset: "display",
      type: "reference",
      to: [{ type: "color" }],
    }),
    defineField({
      name: "terms",
      title: "Terms & Conditions",
      type: "array",
      of: [{ type: "block" }],
      fieldset: "offerDetails",
    }),
    defineField({
      name: "metadata",
      title: "SEO Metadata",
      type: "object",
      fieldset: "seo",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: "shareImage",
          title: "Social Share Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      startDate: "start_date",
      endDate: "end_date",
      media: "displayImages",
      category: "category",
    },
    prepare({ title, startDate, endDate, media, category }) {
      const { primary, text } = generateAccessibleColorPair();
      const moddedTitle = title || "Untitled Size Guide";
      const previewImgText = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(moddedTitle, 2),

        text
      );
      const image = media?.length > 0 && media[0].asset ? media[0].asset : null;
      const url = image
        ? fashionImageBuilder([image], {
            quality: 50,
            treatment: "thumbnail",
            format: "webp",
          })[0]
        : previewImgText;
      const dates =
        startDate && endDate
          ? `${new Date(startDate).toLocaleDateString()} - ${new Date(
              endDate
            ).toLocaleDateString()}`
          : "";
      return {
        title: title,
        subtitle: `${category.replace("_", " ").toUpperCase()} • ${dates}`,
        imageUrl: url,
      };
    },
  },
});

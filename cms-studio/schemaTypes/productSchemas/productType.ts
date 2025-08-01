// schemas/product.ts
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageGallery } from "./imageGallery";
import { variantType } from "./productVariant";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fieldsets: [
    {
      name: "general",
      title: "General Attributes",
      options: { collapsible: true },
    },
    {
      name: "fashionFields",
      title: "Fashion Product Attributes",
      options: { collapsible: true },
    },
    {
      name: "pricing",
      title: "Pricing & Inventory",
      options: { collapsible: true },
    },
    { name: "seo", title: "SEO & Metadata", options: { collapsible: true } },
  ],

  // Root preview shows product name and slug
  preview: {
    select: {
      title: "name",
      images: "images",
      price: "basePrice",
      brand: "brand.name",
    },
    prepare({ title, images, price, brand }) {
      const url =
        images?.length > 0
          ? fashionImageBuilder(
              images.map((i: { asset: any }) => i.asset),
              {
                quality: 80,
                treatment: "thumbnail",
                format: "webp",
              }
            )[0]
          : undefined;

      const subtitle = [
        brand,
        price ? `$${price.toLocaleString()}` : "Price not set",
      ]
        .filter(Boolean)
        .join(" • ");

      return {
        title,
        subtitle,
        imageUrl: url,
      };
    },
  },

  fields: [
    // 1. GENERAL ATTRIBUTES: shown for both types
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      description: "The name of the product",
      validation: (Rule) => Rule.required().min(2),
      fieldset: "general",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      fieldset: "general",
    }),
    imageGallery({
      name: "images",
      title: "Images",
      description:
        "Product image gallery; each image must have alt text for accessibility.",
      fieldset: "general",
      previewImgOptions: {
        colorScheme: "blackAndWhite",
      },
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      description: "Brief summary (max 200 chars)",
      validation: (Rule) => Rule.required().max(200),
      fieldset: "general",
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "text",
      description: "In-depth information and specs",
      fieldset: "general",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      description: "Notable product features",
      of: [defineArrayMember({ type: "string" })],
      fieldset: "general",
    }),

    // 2. CLOTH-SPECIFIC FIELDS: only show when productType is 'cloth'
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      fieldset: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sizeGuide",
      title: "Size Guide",
      type: "reference",
      to: [{ type: "sizeGuide" }],
      fieldset: "fashionFields",
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "material",
              type: "reference",
              to: [{ type: "material" }],
            }),
            defineField({
              name: "percentage",
              type: "number",
              validation: (Rule) => Rule.min(0).max(100),
            }),
          ],
        },
      ],
      fieldset: "fashionFields",
      validation: (Rule) =>
        Rule.custom((materials) => {
          if (!materials) return true;
          const total = materials.reduce(
            (sum: number, mat: any) => sum + (mat.percentage || 0),
            0
          );
          return total === 100 ? true : "Material percentages must sum to 100%";
        }),
    }),
    defineField({
      name: "careInstructions",
      title: "Care Instructions",
      type: "array",
      of: [{ type: "block" }],
      fieldset: "fashionFields",
    }),
    defineField({
      name: "sustainabilityInfo",
      title: "Sustainability Information",
      type: "text",
      fieldset: "fashionFields",
    }),
    defineField({
      name: "gender",
      title: "Intended Wearer",
      type: "array",
      description: "Who this item is designed for (select all that apply)",
      of: [{ type: "string" }],
      options: {
        list: [
          { value: "men", title: "Men" },
          { value: "women", title: "Women" },
          { value: "kids", title: "Kids" },
        ],
        layout: "list", // ✅ Correct layout for checkboxes in Sanity v3
      },
      fieldset: "fashionFields",
    }),

    // 3. VARIANTS: cloth/skincare variants handled in imported variantType
    variantType,

    // 4. SHARED FIELDS: ratings, tags, SEO
    defineField({
      name: "rating",
      title: "Average Rating",
      type: "number",
      readOnly: true,
      description: "Average customer rating",
      fieldset: "general",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Optional searchable tags",
      of: [defineArrayMember({ type: "string" })],
      fieldset: "general",
    }),
    defineField({
      name: "basePrice",
      title: "Base Price",
      type: "number",
      fieldset: "pricing",
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
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fieldset: "seo",
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
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        }),
      ],
    }),
  ],
});

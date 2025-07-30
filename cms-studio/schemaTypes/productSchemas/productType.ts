// schemas/product.ts
import {defineArrayMember, defineField, defineType} from 'sanity'
import imageUrlBuilder from '../../lib/utils/imageUrlBuilder'
import {variantType} from './productVariant'
import { productImage } from './productImage'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fieldsets: [
    {name: 'general', title: 'General Attributes', options: {collapsible: true}},
    {name: 'fashionFields', title: 'Fashion Product Attributes', options: {collapsible: true}},
  ],

  // Root preview shows product name and slug
  preview: {
    select: {
      title: 'name',
      images: 'images',
      sub: 'productType',
    },
    prepare({title, images, sub}) {
      const url = imageUrlBuilder(images, {quality: 10})[0]
      return {
        title,
        subtitle: sub || 'No type specified',
        imageUrl: url,
      }
    },
  },

  fields: [
    // 1. GENERAL ATTRIBUTES: shown for both types
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'The name of the product',
      validation: (Rule) => Rule.required().min(2),
      fieldset: 'general',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
      fieldset: 'general',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Product categories',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule) => Rule.required().min(1),
      fieldset: 'general',
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      description: 'Collections that include this product',
      of: [{type: 'reference', to: {type: 'collection'}}],
      fieldset: 'general',
    }),
    productImage,
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Brief summary (max 200 chars)',
      validation: (Rule) => Rule.required().max(200),
      fieldset: 'general',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
      description: 'In-depth information and specs',
      fieldset: 'general',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      description: 'Notable product features',
      of: [defineArrayMember({type: 'string'})],
      fieldset: 'general',
    }),

    // 2. CLOTH-SPECIFIC FIELDS: only show when productType is 'cloth'
    defineField({
      name: 'material',
      title: 'Material / Fabric',
      type: 'reference',
      to: [{type: 'material'}],
      description: 'Fabric type (e.g. cotton, linen)',
      fieldset: 'fashionFields',
    }),
    defineField({
      name: 'gender',
      title: 'Intended Wearer',
      type: 'array',
      description: 'Who this item is designed for (select all that apply)',
      of: [{type: 'string'}],
      options: {
        list: [
          {value: 'men', title: 'Men'},
          {value: 'women', title: 'Women'},
          {value: 'kids', title: 'Kids'},
        ],
        layout: 'list', // ✅ Correct layout for checkboxes in Sanity v3
      },
      fieldset: 'fashionFields',
    }),

    // 3. VARIANTS: cloth/skincare variants handled in imported variantType
    variantType,

    // 4. SHARED FIELDS: ratings, tags, SEO
    defineField({
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      readOnly: true,
      description: 'Average customer rating',
      fieldset: 'general',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Optional searchable tags',
      of: [defineArrayMember({type: 'string'})],
      fieldset: 'general',
    }),
    defineField({
      name: 'metadata',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Metadata for search engine optimization',
      fieldset: 'general',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title (max 60 chars)',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description (max 160 chars)',
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
})

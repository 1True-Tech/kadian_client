import {defineField, defineType} from 'sanity'

export const SpecialOffers = defineType({
  name: 'special_offers',
  title: 'Special Offers',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['sales', 'featured'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the offer',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Select the product for this offer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'offer_description',
      title: 'Offer Description',
      type: 'text',
      description: 'Brief description of the special offer',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'displayImage',
      title: 'Display Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Percentage off the original price',
      hidden: ({document}) => document?.category !== 'sales',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'sale_start',
      title: 'Sale Start',
      type: 'datetime',
      hidden: ({document}) => document?.category !== 'sales',
      validation: (Rule) => 
        Rule.custom((fieldValue, context) => {
          if (context.document?.category === 'sales' && !fieldValue) {
            return 'Sale start date is required for sales category'
          }
          return true
        }),
    }),
    defineField({
      name: 'sale_end',
      title: 'Sale End',
      type: 'datetime',
      hidden: ({document}) => document?.category !== 'sales',
      validation: (Rule) => 
        Rule.custom((fieldValue, context) => {
          if (context.document?.category === 'sales' && !fieldValue) {
            return 'Sale end date is required for sales category'
          }
          return true
        }),
    }),
    defineField({
      name: 'metadata',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Metadata for search engine optimization',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for SEO (max 60 chars)',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for SEO (max 160 chars)',
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'displayImage',
      category: 'category',
    },
    prepare({title, media, category}) {
      return {
        title: title,
        subtitle: `Category: ${category}`,
        media: media,
      }
    },
  },
})
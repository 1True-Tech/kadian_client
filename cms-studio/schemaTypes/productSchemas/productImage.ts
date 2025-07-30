import {defineField, defineArrayMember} from 'sanity'

export const productImage = defineField({
  name: 'images',
  title: 'Images',
  type: 'array',
  description: 'Product image gallery; each image must have alt text for accessibility.',
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        {
          name: 'asset',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        },
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'A short, descriptive text for screen readers.',
          validation: (Rule) =>
            Rule.required().error('Alt text is required for every image.').min(5).max(100),
        },
      ],
      preview: {
        select: {
          title: 'alt',
          media: 'asset',
        },
        prepare({title, media}) {
          return {
            title: title || '— no alt text —',
            media,
          }
        },
      },
    }),
  ],
  validation: (Rule) => Rule.required().min(1).error('Please add at least one product image.'),
  fieldset: 'general',
})

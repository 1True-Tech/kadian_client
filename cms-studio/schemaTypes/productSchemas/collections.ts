import { defineArrayMember, defineField, defineType } from "sanity";

export const collections = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The human-readable name of the collection',
      validation: Rule => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier generated from the title',
      options: { source: 'title', maxLength: 100 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief overview of this collection'
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      description: 'List of products included in this collection',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}]
        })
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main banner image representing the collection',
      options: { hotspot: true }
    }),
    defineField({
      name: 'priority',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.integer().min(0)
    })
  ],
  preview: {
    select: { title: 'title', media: 'heroImage', subtitle:"slug.current" },
    prepare({title,media,subtitle}) {
        return{
          title,
          media,
          subtitle
        }
    },
  }
});

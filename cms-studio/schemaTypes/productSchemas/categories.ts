import { defineField, defineType } from "sanity";

export const categories = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The human-readable name of the category',
      validation: Rule => Rule.required().min(2).max(50)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier generated from the category name',
      options: { source: 'name', maxLength: 50 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief overview of this category',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Primary image representing the category',
      options: { hotspot: true }
    })
  ],
  preview: {
    select: { title: 'name', media: 'mainImage', subtitle:"slug.current" },
    prepare({title,media,subtitle}) {
        return{
          title,
          media,
          subtitle
        }
    },
  }
});

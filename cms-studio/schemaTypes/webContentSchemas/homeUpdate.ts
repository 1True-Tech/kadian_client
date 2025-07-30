import { defineField, defineType } from 'sanity'

export const HomeUpdate = defineType({
  name: 'home_updates',
  title: 'Home Updates',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'goTo',
      title: 'Go to (pass a link that it should go to)',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'displayImage',
      title: 'Display Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media:"displayImage"
    },
  },
})

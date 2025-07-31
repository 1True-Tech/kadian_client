import {defineField, defineType} from 'sanity'
import {generateAccessibleColorPair} from '../../lib/helpers/color_generator'
import {createColorSwatchDataUrl} from '../../lib/helpers/color_swatch'
import { ellipsisMiddle } from '../../lib/helpers/elipsis';

export const materialType = defineType({
  name: 'material',
  title: 'Material',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Material Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Instructions for garment care (washing, drying, ironing, etc.)',
      options: {
        layout: 'tags'
      }
    }),
  ],
  preview: {
    select: {name: 'name', description: 'description'},
    prepare({name, description}) {
      const {primary, text} = generateAccessibleColorPair({text: '#fff'})
      return {
        title: name,
        subtitle: `${ellipsisMiddle(description, 2, "word")}`,
        imageUrl: createColorSwatchDataUrl(primary, 32, 0, name.charAt(0).toUpperCase(), text),
      }
    },
  },
})

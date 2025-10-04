import { createColorSwatchDataUrl } from '@/lib/utils/colorsProcessors/color_swatch'
import { generateAccessibleColorPair } from '@/lib/utils/colorsProcessors/colorGenerator'
import { ellipsisMiddle, initialLetters } from '@/lib/utils/elipsis'
import { defineField, defineType } from 'sanity'

export const deliveryCountries = defineType({
  name: 'shipping_countries',
  title: 'Shipping Countries',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Country Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'ISO Code',
      type: 'string',
      description: 'Two-letter ISO country code (e.g. NG, US, GB)',
      validation: (Rule) => Rule.required().length(2),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      code: 'code',
    },
    prepare({ title, code }) {
      const { primary, text } = generateAccessibleColorPair({ text: '#fff' })
      const previewImg = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(title, 2),
        text
      )
      return {
        title: ellipsisMiddle(`${title} (${code})`, 10, 'char'),
        imageUrl: previewImg,
      }
    },
  },
})

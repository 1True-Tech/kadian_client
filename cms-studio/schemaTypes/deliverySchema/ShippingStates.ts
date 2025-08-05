import { createColorSwatchDataUrl } from '@/lib/utils/colorsProcessors/color_swatch'
import { generateAccessibleColorPair } from '@/lib/utils/colorsProcessors/colorGenerator'
import { ellipsisMiddle, initialLetters } from '@/lib/utils/elipsis'
import {defineField, defineType} from 'sanity'


export const deliveryStates = defineType({
  name: 'shipping_states',
  title: 'Shipping States',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'State Name',
      type: 'string',
    }),
    defineField({
      name: 'zone',
      title: 'Zone',
      type: 'reference',
      to: [{type: 'shipping_zone'}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({title}) {
      const {primary, text} = generateAccessibleColorPair({text: '#fff'})
      const previewImg = createColorSwatchDataUrl(
        primary,
        32,
        0,
        initialLetters(title, 1),
        text,
      )
      return {
        title:ellipsisMiddle(title, 5, "char"),
        imageUrl: previewImg,
      }
    },
  },
})

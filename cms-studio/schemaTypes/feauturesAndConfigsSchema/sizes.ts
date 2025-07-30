import { defineField, defineType } from 'sanity';
import { generateAccessibleColorPair } from '../../lib/helpers/color_generator';
import { createColorSwatchDataUrl } from '../../lib/helpers/color_swatch';
export const sizeType = defineType({
  name: 'size',
  title: 'Size',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Size label (e.g. S, M, L, XL)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Optional description for this size'
    })
  ],
   preview: {
      select: {
        title: 'label',
        description: 'description',
      },
      prepare({title,description}) {
        const {primary, text} = generateAccessibleColorPair()
        const previewImg = createColorSwatchDataUrl(
          primary,
          32,
          0,
          title.toUpperCase(),
          text,
        )
        return {
          title,
          subtitle:`${description.slice(0,10)}...`,
          imageUrl: previewImg,
        }
      },
    },
});
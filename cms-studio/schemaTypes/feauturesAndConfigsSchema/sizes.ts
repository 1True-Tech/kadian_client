import { createColorSwatchDataUrl } from '@/lib/utils/colorsProcessors/color_swatch';
import { generateAccessibleColorPair } from '@/lib/utils/colorsProcessors/colorGenerator';
import { defineField, defineType } from 'sanity';
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
    }),
    defineField({
      name: 'measurements',
      title: 'Measurements',
      type: 'object',
      description: 'Size measurements in centimeters',
      fields: [
        defineField({
          name: 'chest',
          title: 'Chest',
          type: 'number',
          description: 'Chest measurement in cm'
        }),
        defineField({
          name: 'waist',
          title: 'Waist',
          type: 'number',
          description: 'Waist measurement in cm'
        }),
        defineField({
          name: 'hips',
          title: 'Hips',
          type: 'number',
          description: 'Hip measurement in cm'
        }),
        defineField({
          name: 'length',
          title: 'Length',
          type: 'number',
          description: 'Length measurement in cm'
        })
      ]
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
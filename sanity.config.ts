'use client'
import { projectConfig } from './cms-studio/config'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { deskStructure } from '@/cms-studio/lib/plugins/desk'
import { schemaTypes } from '@/cms-studio/schemaTypes'
import { deliveryInfoStructure } from '@/cms-studio/structure/deliveryInfo'
import { productFeatsStructure, productsStructure } from '@/cms-studio/structure/products'


export default defineConfig({
  baseUrl:"/admin/cms-studio",

  ...projectConfig,

  plugins: [
    structureTool({
      structure: deskStructure([productsStructure, productFeatsStructure, deliveryInfoStructure]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

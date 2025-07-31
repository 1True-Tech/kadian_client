'use client'
import { projectConfig } from './cms-studio/config'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { deskStructure } from '@/cms-studio/lib/plugins/desk'
import { schemaTypes } from '@/cms-studio/schemaTypes'
import { deliveryInfoStructure } from '@/cms-studio/structure/deliveryInfo'
import { productFeatsStructure, productsStructure } from '@/cms-studio/structure/products'
import { fashionStructure } from '@/cms-studio/structure/fashion'

// Import custom preview components
// import { BlogPostPreview } from '@/cms-studio/components/previews/BlogPostPreview'
// import { LookbookPreview } from '@/cms-studio/components/previews/LookbookPreview'
// import { FashionProductPreview } from '@/cms-studio/components/previews/FashionProductPreview'

export default defineConfig({
  name: 'kadian-studio',
  title: 'Kadian Fashion Studio',
  
  baseUrl: "/admin/cms-studio",
  
  projectId: projectConfig.projectId,
  dataset: projectConfig.dataset,

  plugins: [
    structureTool({
      structure: deskStructure([
        productsStructure, 
        productFeatsStructure, 
        deliveryInfoStructure,
        fashionStructure
      ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

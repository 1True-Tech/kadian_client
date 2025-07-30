import {deskItemBuilder, GroupDefinition} from '../lib/plugins/desk'

export const productsStructure: GroupDefinition = {
  title: 'Products',
  schemaTypes: ['product', 'collection', 'category'],
  builders: (S) => [
    deskItemBuilder(S, {
      docTitle: 'All Products',
      filterField: 'productType',
      filterId: '',
      schemaType: 'product',
    }),
  ],
  skipUsedSchemas: false,
}

export const productFeatsStructure: GroupDefinition = {
  title: 'Product features',
  schemaTypes: ['material', 'color', 'size'],
  builders: () => [],
}

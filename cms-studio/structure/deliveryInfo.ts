import { GroupDefinition } from '../lib/plugins/desk'

export const deliveryInfoStructure: GroupDefinition = {
  title: 'Delivery information',
  schemaTypes: ['shipping_states', 'shipping_zone'],
  builders: () => [],
}

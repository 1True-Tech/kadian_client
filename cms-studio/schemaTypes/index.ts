import {categories} from './productSchemas/categories'
import {collections} from './productSchemas/collections'
import {colorType} from './feauturesAndConfigsSchema/colors'
import {HomeUpdate} from './webContentSchemas/homeUpdate'
import {materialType} from './feauturesAndConfigsSchema/materialType'
import {productType} from './productSchemas/productType'
import {deliveryZones} from './deliverySchema/shippingZones'
import {sizeType} from './feauturesAndConfigsSchema/sizes'
import {SpecialOffers} from './webContentSchemas/specialOffers'
import {deliveryStates} from './deliverySchema/ShippingStates'

export const schemaTypes = [
  productType,
  colorType,
  sizeType,
  collections,
  categories,
  SpecialOffers,
  deliveryZones,
  deliveryStates,
  materialType,
  HomeUpdate,
]

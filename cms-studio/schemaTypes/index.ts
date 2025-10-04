import {categories} from './productSchemas/categories'
import {collections} from './productSchemas/collections'
import {colorType} from './feauturesAndConfigsSchema/colors'
import {materialType} from './feauturesAndConfigsSchema/materialType'
import {productType} from './productSchemas/productType'
import {deliveryZones} from './deliverySchema/shippingZones'
import {sizeType} from './feauturesAndConfigsSchema/sizes'
import {SpecialOffers} from './webContentSchemas/specialOffers'
import {deliveryStates} from './deliverySchema/ShippingStates'
import {brand} from './productSchemas/brand'
// import {blogPost} from './webContentSchemas/blogPost'
import {lookbook} from './webContentSchemas/lookbook'
import {styleGuide} from './webContentSchemas/styleGuide'
import {sizeGuide} from './productSchemas/sizeGuide'
import {homepageHero} from './webContentSchemas/homepageHero'
import { deliveryCountries } from './deliverySchema/deliveryCountries'

export const schemaTypes = [
  // Product related schemas
  productType,
  brand,
  categories,
  collections,
  sizeGuide,
  colorType,
  sizeType,
  materialType,

  // Web content schemas
  homepageHero,
  // blogPost,
  lookbook,
  styleGuide,
  SpecialOffers,

  // Delivery schemas
  deliveryZones,
  deliveryStates,
  deliveryCountries
]

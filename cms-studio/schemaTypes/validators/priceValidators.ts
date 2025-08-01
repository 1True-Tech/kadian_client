// schemaTypes/validators/priceValidators.ts

const MIN_PRICE = 100 // Minimum price in $
const MAX_PRICE = 1000000 // Maximum price in $

export const validatePrice = (price: number|undefined, options:{
  min?: number;
  max?: number;
}={
  min: MIN_PRICE,
  max: MAX_PRICE
}) => {

  const { min = MIN_PRICE, max = MAX_PRICE } = options;
  // Check if price exists
  if (price === undefined || price === null) {
    return 'Price is required'
  }

  // Check if price is a number
  if (typeof price !== 'number') {
    return 'Price must be a number'
  }

  // Check if price is non-negative
  if (price < 0) {
    return 'Price cannot be negative'
  }

  // Check if price is a whole number
  if (!Number.isInteger(price)) {
    return 'Price must be a whole number (no decimals)'
  }

  // Check minimum price
  if (price < min) {
    return `Price must be at least $${min}`
  }

  // Check maximum price
  if (price > max) {
    return `Price cannot exceed $${max}`
  }

  // Validate price is in proper increments (e.g., no prices like 1501)
  if (price % 100 !== 0) {
    return 'Price must be in increments of $100'
  }

  return true
}

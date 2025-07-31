// lib/validators.ts

// Price validation
export const validatePrice = (price: number) => {
  if (price < 0) return 'Price cannot be negative'
  if (price % 1 !== 0) return 'Price must be a whole number'
  if (price < 100) return 'Price must be at least 100 NGN'
  return true
}

// Stock validation
export const validateStock = (stock: number) => {
  if (stock < 0) return 'Stock cannot be negative'
  if (stock % 1 !== 0) return 'Stock must be a whole number'
  return true
}

// Date range validation
export const validateDateRange = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return true
  if (new Date(startDate) >= new Date(endDate)) {
    return 'End date must be after start date'
  }
  return true
}

// SKU format validation
export const validateSKU = (sku: string) => {
  const skuPattern = /^[A-Z]{2}-[0-9]{4}-[A-Z]{2}$/
  if (!skuPattern.test(sku)) {
    return 'SKU must follow format: XX-0000-XX (e.g., TS-0001-BL)'
  }
  return true
}

// Discount validation
export const validateDiscount = (discount: number) => {
  if (discount < 0 || discount > 90) {
    return 'Discount must be between 0% and 90%'
  }
  return true
}

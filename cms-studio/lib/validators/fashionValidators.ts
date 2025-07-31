// lib/validators/fashionValidators.ts

interface SizeValidationContext {
  sizeType?: string;
  measurements?: Record<string, number>;
}

export const validateSizeConsistency = (sizes: any[], context: SizeValidationContext) => {
  if (!sizes || sizes.length === 0) return true;
  
  const sizeTypes = sizes.map(s => s.sizeType);
  const uniqueSizeTypes = new Set(sizeTypes);
  
  if (uniqueSizeTypes.size > 1) {
    return 'All sizes in a product must be of the same type (e.g., all numeric or all letter-based)';
  }
  
  return true;
};

export const validateSeasonalAvailability = (seasons: string[], startDate: string, endDate: string) => {
  if (!seasons || seasons.length === 0) return true;
  
  const currentDate = new Date();
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  
  if (start && end && start >= end) {
    return 'End date must be after start date';
  }
  
  // Check if seasonal items are being listed in the appropriate season
  const currentMonth = currentDate.getMonth();
  const isWinter = currentMonth <= 1 || currentMonth === 11;
  const isSpring = currentMonth >= 2 && currentMonth <= 4;
  const isSummer = currentMonth >= 5 && currentMonth <= 7;
  const isFall = currentMonth >= 8 && currentMonth <= 10;
  
  const hasWinterItems = seasons.includes('winter');
  const hasSpringItems = seasons.includes('spring');
  const hasSummerItems = seasons.includes('summer');
  const hasFallItems = seasons.includes('fall');
  
  // Warning for off-season items
  if ((hasWinterItems && !isWinter) ||
      (hasSpringItems && !isSpring) ||
      (hasSummerItems && !isSummer) ||
      (hasFallItems && !isFall)) {
    return 'Warning: Some items are being listed outside their typical season';
  }
  
  return true;
};

export const validateColorCombination = (colors: string[]) => {
  if (!colors || colors.length < 2) return true;
  
  // Define color combinations that work well together
  const colorHarmonies: Record<string, string[]> = {
    black: ['white', 'red', 'gold', 'silver', 'gray'],
    navy: ['white', 'red', 'pink', 'gray', 'beige'],
    white: ['black', 'navy', 'red', 'blue', 'purple'],
    // Add more color combinations as needed
  };
  
  // Check if colors work well together
  for (let i = 0; i < colors.length - 1; i++) {
    const color1 = colors[i].toLowerCase();
    const color2 = colors[i + 1].toLowerCase();
    
    if (colorHarmonies[color1] && !colorHarmonies[color1].includes(color2)) {
      return `Warning: ${color1} and ${color2} might not be an ideal color combination`;
    }
  }
  
  return true;
};

export const validateProductMeasurements = (measurements: Record<string, number>, sizeType: string) => {
  if (!measurements) return true;
  
  // Different validation rules based on size type
  const validationRules: Record<string, Record<string, [number, number]>> = {
    'womens-apparel': {
      bust: [30, 50],
      waist: [24, 44],
      hips: [33, 53],
      inseam: [26, 34]
    },
    'mens-apparel': {
      chest: [34, 54],
      waist: [28, 48],
      inseam: [28, 36]
    }
  };
  
  const rules = validationRules[sizeType];
  if (!rules) return true;
  
  for (const [measurement, value] of Object.entries(measurements)) {
    const [min, max] = rules[measurement] || [0, Infinity];
    if (value < min || value > max) {
      return `${measurement} measurement (${value}) is outside the typical range (${min}-${max})`;
    }
  }
  
  return true;
};

// Add price validations based on product category and quality tier
export const validatePriceRange = (price: number, category: string, qualityTier: string) => {
  const priceRanges: Record<string, Record<string, [number, number]>> = {
    'dresses': {
      'premium': [15000, 100000],
      'standard': [5000, 15000],
      'basic': [2000, 5000]
    },
    'shirts': {
      'premium': [8000, 30000],
      'standard': [3000, 8000],
      'basic': [1500, 3000]
    },
    // Add more categories and price ranges
  };
  
  const range = priceRanges[category]?.[qualityTier];
  if (!range) return true;
  
  const [min, max] = range;
  if (price < min || price > max) {
    return `Price (${price}) is outside the typical range (${min}-${max}) for ${qualityTier} ${category}`;
  }
  
  return true;
};

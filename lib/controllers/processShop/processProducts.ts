import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { ProductRaw, ProductReady } from "@/types/product";
import { Color } from "@/types/structures";

export type ProductFilters = {
  search?: string;
  categories?: string[];
  collections?: string[];
  price?: {
    from?: number;
    to?: number;
  };
  colors?: string[];
  sizes?: string[];
  sortBy?: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
};

export const processProducts = (products: ProductRaw[]): ProductReady[] => {
  return products.map(product => {
    // Find primary image from main images or first variant's images
    const mainImage = product.images?.find(m => m.primary) || 
                     product.variants[0]?.images?.find(m => m.primary) ||
                     product.images?.[0] ||
                     product.variants[0]?.images?.[0];

    // Collect all images from main and variant images
    const allImages = [
      ...(product.images || []),
      ...(product.variants.flatMap(v => v.images || []))
    ];

    // Process all care instructions from materials and product level
    const careInstructions = [
      ...(product.careInstructions || []),
      ...(product.materials?.flatMap(m => m.material.careInstructions) || [])
    ];

    // Process variants to ensure they have color and size
    const processedVariants = product.variants.map(variant => ({
      ...variant,
      color: variant.color?.name || "Default",
      size: variant.size || "One Size",
      images: variant.images?.map(img => ({
        alt: img.alt,
        src: fashionImageBuilder([img.asset], {
          treatment: "catalog",
          quality: 85,
          format: "webp"
        })[0]
      })) || []
    }));

    return {
      ...product,
      mainImage: mainImage ? {
        alt: mainImage.alt,
        src: fashionImageBuilder([mainImage.asset], {
          treatment: "catalog",
          quality: 85,
          format: "webp"
        })[0]
      } : null,
      gallery: allImages
        .filter(img => img.asset && !img.primary)
        .map(img => ({
          alt: img.alt,
          src: fashionImageBuilder([img.asset], {
            treatment: "catalog",
            quality: 85,
            format: "webp"
          })[0]
        })),
      variants: processedVariants,
      careInstructions: [...new Set(careInstructions)], // Remove duplicates
      materials: product.materials?.map(m => ({
        name: m.material.name,
        percentage: m.percentage
      })) || [],
      slug: product.slug.current
    };
  });
};

export const filterProducts = (products: ProductReady[], filters: ProductFilters): ProductReady[] => {
  return products.filter(product => {
    // Price filter
    if (filters.price) {
      const productPrice = product.basePrice;
      if (
        (filters.price.from && productPrice < filters.price.from) ||
        (filters.price.to && productPrice > filters.price.to)
      ) {
        return false;
      }
    }

    // Search filter
    if (filters.search) {
      const searchTerms = filters.search.toLowerCase().split(' ');
      const productText = [
        product.name,
        product.description,
        product.details,
        ...product.tags,
        ...product.features,
      ].join(' ').toLowerCase();

      // Check if all search terms are found in the product text
      if (!searchTerms.every(term => productText.includes(term))) {
        return false;
      }
    }

    // Color filter
    if (filters.colors?.length) {
      const productColors = product.variants
        .map(variant => variant.color)
        .filter(Boolean);
      if (!filters.colors.some(color => productColors.includes(color))) {
        return false;
      }
    }

    // Size filter
    if (filters.sizes?.length) {
      const productSizes = product.variants
        .map(variant => variant.size)
        .filter(Boolean);
      if (!filters.sizes.some(size => productSizes.map(s=>s.label).includes(size))) {
        return false;
      }
    }

    return true;
  });
};

export const sortProducts = (products: ProductReady[], sortBy: ProductFilters['sortBy']): ProductReady[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      sorted.sort((a, b) => a.basePrice - b.basePrice);
      break;

    case 'price-high':
      sorted.sort((a, b) => b.basePrice - a.basePrice);
      break;

    case 'newest':
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;

    case 'featured':
    default:
      // Keep original order for featured
      break;
  }

  return sorted;
};

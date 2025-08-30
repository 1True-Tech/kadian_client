import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { ProductRaw, ProductReady } from "@/types/product";
import { ShopFilters } from "@/store/shopFilters/types";

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
    const mainImage = product.mainImage

    // Collect all images from main and variant images
    const allImages = [
      ...(product.gallery || []),
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
        .filter(img => img.asset)
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
      slug: product.slug
    };
  });
};


export const filterProducts = (products: ProductReady[], filters: Partial<ShopFilters>): ProductReady[] => {
  return products.filter(product => {
    // Category filter
    if (product.category&&filters.categories?.length && !filters.categories.includes(product.category.slug)) {
      return false;
    }

    // Brand filter
    if (product.brand&&filters.brands?.length && !filters.brands.includes(product.brand.slug)) {
      return false;
    }

    // Color filter
    if (filters.colors?.length) {
      const productColors = product.variants.map(v => v.color);
      if (!filters.colors.some(color => productColors.includes(color))) {
        return false;
      }
    }

    // Size filter
    if (filters.sizes?.length) {
      const productSizes = product.variants.map(v => v.size.label);
      if (!filters.sizes.some(size => productSizes.includes(size))) {
        return false;
      }
    }

    // Materials filter
    if (filters.materials?.length) {
      const productMaterials = product.materials.map(m => m.name);
      if (!filters.materials.some(material => productMaterials.includes(material))) {
        return false;
      }
    }

    // Price filter
    if (filters.price) {
      const minVariantPrice = Math.min(...product.variants.map(v => v.price));
      if (minVariantPrice < filters.price.from || minVariantPrice > filters.price.to) {
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

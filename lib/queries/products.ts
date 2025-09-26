import { groq } from "next-sanity";

// Base fragment for common image fields
const imageFragment = groq`
  asset,
  alt,
  "primary": coalesce(primary, false),
  crop,
  hotspot
`;

// SEO fields fragment
const seoFragment = groq`
  "title": coalesce(seo.title, name),
  "description": coalesce(seo.description, description),
  "keywords": seo.keywords
`;

// Material fragment with reference expansion
const materialFragment = groq`
  material->{
    name,
    description,
    careInstructions
  },
  percentage
`;

// Size guide fragment
const sizeGuideFragment = groq`
  title,
  category->{
    name,
    slug
  },
  measurementInstructions,
  sizeChart{
    units,
    measurements[]{
      sizeName,
      chest,
      waist,
      hips,
      inseam
    }
  },
  images[]{
    ${imageFragment}
  }
`;

// Brand fragment
const brandFragment = groq`
  name,
  slug,
  "logo": logo{
    ${imageFragment}
  },
  description
`;

// Variant fragment
const variantFragment = groq`
  _key,
  color->{
    name,
    hex,
    rgba
  },
  images[]{
    ${imageFragment}
  },
  isBase,
  size->{
    label,
    description,
    measurements{
      chest,
      waist,
      hips,
      length
    }
  },
  price,
  sku,
  stock,
  stockThreshold,
  weight
`;

// Query for getting a single product by slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    name,
    "slug": slug.current,
    description,
    details,
    basePrice,
    "firstVariant": variants[0]{
    price,
  sku,
  stock,
  stockThreshold,
    },
    // Brand reference
    "brand": brand->{
      ${brandFragment}
    },
    
    // Category with parent reference
    "category": *[_type == "category" && references(^._id)][0]{
      name,
      "slug": slug.current,
      description,
      "parent": parent->{
        name,
        "slug": slug.current
      },
      "images": images[]{
        ${imageFragment}
      }
    },
    
    // Size guide reference
    "sizeGuide": sizeGuide->{
      ${sizeGuideFragment}
    },
    
    // Materials array with references
    "materials": materials[]{
      ${materialFragment}
    },
    
    // Product images
    "mainImage": images[primary == true][0]{
      ${imageFragment}
    },
    "gallery":images[]{
    ${imageFragment}
    },
    
    // Product variants
    "variants": variants[]{
      ${variantFragment}
    },
    
    // Care instructions (portable text)
    careInstructions,
    
    // Features array
    features,
    
    // Gender array
    gender,
    
    // Product rating
    rating,
    
    // Tags array
    tags,
    
    // SEO fields
    ${seoFragment},
    
    // Additional fields
    sustainabilityInfo,
    isActive,
  }
`;

export const allProductExtraFiltersQuery = groq`
  *[_type == "product" && defined(slug.current)]{
    "colors": variants[].color->{
      name,
      hex,
      rgba
    },
    "sizes": variants[].size -> {label},
    "materials": materials[].material->{
      name
    },
    "brand": brand->{
      name,
      "slug": slug.current,
    },
    category->{
      name,
      "slug": slug.current,
    },
    "prices": {
      basePrice,
      "prices": variants[].price,
    },
      "firstVariant": variants[0]{
    price,
  sku,
  stock,
  stockThreshold,
    }
}
`;
// Query for product list/grid views
export const productListQuery = groq`
  *[_type == "product" && defined(slug.current)] {
    _id,
    _type,
    _createdAt,
    name,
    "slug": slug.current,
    description,
    basePrice,
    
    "brand": brand->{
      name,
      "slug": slug.current
    },
    
    category->{
      name,
      "slug": slug.current,
      "parent": parent->{
        name,
        "slug": slug.current
      }
    },
    
    "mainImage": images[primary == true][0]{
      ${imageFragment}
    },
    "gallery":images[]{
    ${imageFragment}
    },
    "firstVariant": variants[0]{
    price,
  sku,
  stock,
  stockThreshold,
    },
    "variants": variants[]{
      _key,
      price,
      stock,
      "color": color->{
        name,
        hex,
        rgba
      },
      "size": size->{label}
    },
    
    rating,
    tags,
    isActive
  }
`;

// Query to get all unique filter options
export const productFiltersQuery = groq`{
  "categories": *[_type == "category"]{
    name,
    "slug": slug.current,
    "count": count(*[_type == "product" && references(^._id)])
  },
  "brands": *[_type == "brand"]{
    name,
    "slug": slug.current,
    "count": count(*[_type == "product" && references(^._id)])
  },
  "materials": *[_type == "material"]{
    name,
    "count": count(*[_type == "product" && references(^._id)])
  },
  "colors": *[_type == "color"]{
    name,
    hex,
    rgba,
    "count": count(*[_type == "product" && references(^._id)])
  },
  "sizes": *[_type == "product"].variants[].size.label
}`;

// Product search query
export const productSearchQuery = groq`
  *[_type == "product" && (
    name match $searchTerm ||
    description match $searchTerm ||
    brand->name match $searchTerm ||
    category->name match $searchTerm ||
    $searchTerm in tags ||
   _id in $ids
  )]{
    _id,
    name,
    "slug": slug.current,
    description,
    basePrice,
    "mainImage": images[primary == true][0]{
      ${imageFragment}
    },
    "brand": brand->{
      name,
      "slug": slug.current
    },
      "firstVariant": variants[0]{
    price,
  sku,
  stock,
  stockThreshold,
    }
  }
`;

export const productsByIdsQuery = groq`
  *[_type == "product" && _id in $ids]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    name,
    "slug": slug.current,
    description,
    basePrice,

    "brand": brand->{
      name,
      "slug": slug.current
    },

    category->{
      name,
      "slug": slug.current,
      "parent": parent->{
        name,
        "slug": slug.current
      }
    },

    "mainImage": images[primary == true][0]{
      ${imageFragment}
    },
    "gallery": images[]{
      ${imageFragment}
    },

    "firstVariant": variants[0]{
      price,
      sku,
      stock,
      stockThreshold
    },

    "variants": variants[] {
      ${variantFragment}
    },

    rating,
    tags,
    isActive
  }
`;
export const productsByIdsQueryMini = groq`
  *[_type == "product" && (
   _id in $ids
  )]{
    _id,
    name,
    "slug": slug.current,
    description,
    basePrice,
    "mainImage": images[primary == true][0]{
      ${imageFragment}
    },
    "brand": brand->{
      name,
      "slug": slug.current
    },
      "firstVariant": variants[0]{
    price,
  sku,
  stock,
  stockThreshold,
    }
  }
`;

export const productCartItem = groq`
  *[_type == "product" && _id in $ids]{
    "productId":_id,
    "addedAt":_createdAt,
    "updatedAt":_updatedAt,
    name,
    "slug": slug.current,
    "price":basePrice,
    "image": images[primary == true][0]{
      "src": asset.asset -> url,
      alt,
    },
    "variantSku": variants[sku in $vSku][0].sku,
    "variant": variants[sku in $vSku][0] {
      ${variantFragment}
    },
    "size": variants[sku in $vSku][0].size->{label, value},
    "color": variants[sku in $vSku][0].color->{name,hex,rgba},
  }
`

export const productInventory = groq`
*[_type == "product"] | order(_createdAt desc) {
"createdAt": _createdAt,
"updatedAt": _updatedAt,
"id": _id,
"slug": slug.current,
name,
variants[]{
sku,
stock,
stockThreshold,
price
}
}
`
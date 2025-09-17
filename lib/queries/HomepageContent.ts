import { ProductListingItem } from "./Product";

export const homepageHero = `
*[
  _type == "homepageHero" &&
  active == true &&
  // either no date is defined, or it’s already passed
  (!defined(startDate) || startDate <= now()) &&

  // either no endDate is defined, or it’s still in the future
  (!defined(endDate)   || endDate   >= now())
]|order(priority desc) {
  title,
  subtitle,
  cta,
  "image":{
    "alt": backgroundImage.alt,
    "main": backgroundImage,
    "mobile": backgroundImage.mobile
  }
}
`;
export const homePageLookBook = `
*[_type == "lookbook" && count(looks[image.asset != null]) > 0][0...4]{
  title,
  "slug": slug.current,
  "previewImage": looks[image.asset != null][0].image {
    "type": _type,
    alt,
    asset
  },
  "contentLines": introduction
}
`;

export const homePageStyleGuide = `
  *[
  _type == "styleGuide" &&
  count(sections[0].styleImages[asset != null]) > 0
][0...4]{
  "slug": slug.current,
  "image": sections[0].styleImages[0] {
    alt,
    asset
  },
  "sectionsLength":count(sections),
  category,
  "description":introduction,
  title
}
`
export const HomePageSpecialOffer = `
*[_type == "special_offers"][0...5]{
  "displayImages": displayImages[]{
    alt,
    asset
  },
  "highlightColor": highlightColor->{hex,name,rgba},
  title,
  terms,
  category,
  "slug": slug.current,
  products[]{
  discountType,
  discountValue,
  featured,
  product->{
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
      asset,
  alt,
  "primary": coalesce(primary, false),
  crop,
  hotspot
    },
    "gallery":images[]{
    asset,
  alt,
  "primary": coalesce(primary, false),
  crop,
  hotspot
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
}
}

`

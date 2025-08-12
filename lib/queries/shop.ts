export const shopCategory = `
*[
  _type == "category"
  && slug.current == $slug
]{
  "slug": slug.current,
  name,
    description,
  "category_images": category_images[]{
    alt,
    asset
  },
  "collections": collections[]->{
    "slug": slug.current,
  title,
    "products": products[]->{
name,
"slug": slug.current,
"price": basePrice,
"hasStock": count(variants[isBase == true && stock > 0]) > 0,
"image": coalesce(
    images[primary == true][0]{
        alt,
        asset
    },
    images[0]{
        alt,
        asset
    }
)
}
  },
}
`;
export const shopCollection = `
*[
  _type == "collection"
  && slug.current == $slug
]{
    "slug": slug.current,
  title,
    "products": products[]->{
name,
"slug": slug.current,
"price": basePrice,
"hasStock": count(variants[isBase == true && stock > 0]) > 0,
"image": coalesce(
    images[primary == true][0]{
        alt,
        asset
    },
    images[0]{
        alt,
        asset
    }
)
}
  }
`;

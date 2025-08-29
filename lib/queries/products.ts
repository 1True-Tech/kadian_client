export const productListQuery = `*[_type == "product"] {
  _id,
  name,
  "slug": slug.current,
  description,
  basePrice,
  rating,
  tags,
  createdAt,
  isOnSale,
  salePrice,
  mainImage {
    asset,
    alt
  },
  gallery[] {
    asset,
    alt
  },
  brand->{
    name,
    "slug": slug.current,
    logo {
      asset,
      alt
    }
  },
  category->{
    name,
    "slug": slug.current
  },
  variants[]{
    size,
    color,
    price,
    stock,
    sku,
    images[] {
      asset,
      alt
    }
  }
}`;

export const allCollections = `*[_type == "collection"] {
  _id,
  title,
  slug,
  description,
  active,
  priority,
  dateRange,
  collection_images[]{
    alt,
    "asset": asset
  },
  "products": *[_type == "product" && references(^._id)] {
    _id,
    name,
    slug,
    "image": {
      "alt": mainImage.alt,
      "asset": mainImage.asset
    }
  }
}`;

export const collectionBySlug = `*[_type == "collection" && slug.current == $slug] {
  _id,
  title,
  slug,
  description,
  active,
  priority,
  dateRange,
  collection_images[]{
    alt,
    "asset": asset
  },
  "products": *[_type == "product" && references(^._id)] {
    _id,
    name,
    slug,
    "image": {
      "alt": mainImage.alt,
      "asset": mainImage.asset
    }
  }
}`;

export const searchCollections = `*[_type == "collection" && (title match $searchTerm || description match $searchTerm)] {
  _id,
  title,
  slug,
  description,
  active,
  priority,
  dateRange,
  collection_images[]{
    alt,
    "asset": asset
  }
}`;

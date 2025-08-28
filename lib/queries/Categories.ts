export const allCategories = `*[_type == "category"] {
  _id,
  name,
  slug,
  description,
  category_images[]{
    alt,
    "asset": asset->url
  },
  "collections": *[_type == "collection" && references(^._id)] {
    _id,
    title,
    slug,
    description,
    collection_images[]{
      alt,
      "asset": asset->url
    }
  }
}`;

export const categoryBySlug = `*[_type == "category" && slug.current == $slug] {
  _id,
  name,
  slug,
  description,
  category_images[]{
    alt,
    "asset": asset
  },
  "collections": *[_type == "collection" && references(^._id)] {
    _id,
    title,
    slug,
    description,
    collection_images[]{
      alt,
      "asset": asset-
    }
  }
}`;

export const searchCategories = `*[_type == "category" && (name match $searchTerm || description match $searchTerm)] {
  _id,
  name,
  slug,
  description,
  category_images[]{
    alt,
    "asset": asset
  }
}`;

export const homepageCategories = `*[_type == "category"] | order(priority asc) [0...2] {
  _id,
  name,
  slug,
  description,
  category_images[]{
    alt,
    "asset": asset
  }
}`;

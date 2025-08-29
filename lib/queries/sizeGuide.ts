export const sizeGuideQuery = `*[_type == "sizeGuide"] {
  _id,
  title,
  category->{
    name,
    slug
  },
  measurementInstructions,
  sizeChart {
    units,
    measurements[] {
      sizeName,
      chest,
      waist,
      hips,
      inseam
    }
  },
  images[] {
    alt,
    caption,
    asset
  }
}`

export const sizeGuideBySlugQuery = `*[_type == "sizeGuide" && category->slug.current == $slug][0] {
  _id,
  title,
  category->{
    name,
    slug
  },
  measurementInstructions,
  sizeChart {
    units,
    measurements[] {
      sizeName,
      chest,
      waist,
      hips,
      inseam
    }
  },
  images[] {
    alt,
    caption,
    asset
  }
}`

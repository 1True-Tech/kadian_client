export const styleGuideQuery = `*[_type == "styleGuide"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  introduction,
  sections[] {
    title,
    content,
    styleImages[] {
      alt,
      caption,
      asset
    }
  }
}`

export const styleGuideBySlugQuery = `*[_type == "styleGuide" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  introduction,
  sections[] {
    title,
    content,
    styleImages[] {
      alt,
      caption,
      asset
    }
  }
}`

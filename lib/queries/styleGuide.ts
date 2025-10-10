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
      "src": asset->url
    }
  }
}`;

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
      "src": asset.asset->url
    },
    tips[]{
      tip,
      importance
    },
    relatedProducts[]->{
      _id,
      title,
      "slug": slug.current,
      "image": images[0]{
        alt,
        "src": asset->url
      },
      price
    }
  },
  difficulty,
  targetAudience,
  seasonality,
  seo {
    title,
    description
  }
}`;

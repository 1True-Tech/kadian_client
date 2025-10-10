export const lookbookQuery = `*[_type == "lookbook"] | order(season.year desc) {
  _id,
  title,
  slug,
  season,
  introduction,
  looks[] {
    image {
      alt,
      caption,
      "src": asset->url
    },
    outfitDetails[] {
      name,
      description,
      productLink->{
        _id,
        name,
        slug,
        price,
        image {
         "src": asset->url,
          alt
        }
      }
    }
  }
}`

export const lookbookBySlugQuery = `*[_type == "lookbook" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  season,
  introduction,
  looks[] {
    image {
      alt,
      caption,
      "src": asset->url
    },
    products[] {
      product->{
        _id,
        name,
        slug,
        price,
        image {
          "src": asset->url,
          alt
        }
      },
      coordinates {
        x,
        y
      }
    },
    styleNotes
  },
  publishDate,
  tags,
  seo {
    title,
    description,
    keywords
  }
}`;

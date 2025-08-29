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
      asset
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
          asset,
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
      asset
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
          asset,
          alt
        }
      }
    }
  }
}`

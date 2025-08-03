export const homepageHero = `
*[
  _type == "homepageHero" &&
  active == true &&

  // either no  is defined, or it’s already passed
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
  }
}
`

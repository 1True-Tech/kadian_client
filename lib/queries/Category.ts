export const categoryForShopList = `
*[_type == "category"] {
  "label":name,
    "url": slug.current,
    "items": collections[]->{
        "name": title,
        "url": slug.current
    }
}
`
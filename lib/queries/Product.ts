export const ProductListingItem = `
{
name,
"slug": slug.current,
"price": basePrice,
"hasStock": count(variants[isBase == true && stock > 0]) > 0,
"image": coalesce(
    images[primary == true][0]{
        alt,
        asset
    },
    images[0]{
        alt,
        asset
    }
)
}
`
export const shippingCountriesQuery = /* groq */ `
  *[_type == "shipping_countries"]{
    _id,
    name,
    code,
    "states": *[_type == "shipping_states" && references(^._id)]{
      _id,
      name,
      zone->{
        _id,
        name,
        deliveryTime,
        rates
      }
    }
  }
`

// types/shipping.d.ts
export interface ShippingRate {
  amount: number
  unitType: string
}

export interface ShippingZone {
  id: string
  name: string
  deliveryTime: {
    min: number
    max: number
  }
  rates: ShippingRate[]
}

export interface ShippingState {
  id: string
  name: string
  zone: ShippingZone
}

export interface ShippingCountry {
  id: string
  code: string
  name: string
  states: ShippingState[]
}

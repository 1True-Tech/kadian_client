import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import {
    ShippingCountry
} from "./types";

interface RawRate {
  amount: number;
  unitType: string;
}

interface RawZone {
  _id: string;
  name: string;
  deliveryTime: { min: number; max: number };
  rates: RawRate[];
}

interface RawState {
  _id: string;
  name: string;
  zone: RawZone;
}

interface RawCountry {
  _id: string;
  code: string;
  name: string;
  states: RawState[];
}

export async function processShippingData(): Promise<ShippingCountry[]> {
  const raw: RawCountry[] = await client.fetch(queries.shippingCountriesQuery);
  return raw.map((country) => ({
    id: country._id,
    code: country.code,
    name: country.name,
    states: country.states.map((state) => ({
      id: state._id,
      name: state.name,
      zone: {
        id: state.zone._id,
        name: state.zone.name,
        deliveryTime: {
          min: state.zone.deliveryTime.min,
          max: state.zone.deliveryTime.max,
        },
        rates: state.zone.rates.map((r) => ({
          amount: r.amount,
          unitType: r.unitType,
        })),
      },
    })),
  }));
}

import queries from "../queries";
import { client } from "../utils/NSClient";

export interface color {
    name:string;
    hex:string;
    rgba?:string;
}
export default async function processColors():Promise<color[]>{
    const items = await client.fetch<
    (color)[]
  >(queries.colors);
  return items
}
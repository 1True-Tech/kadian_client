import { Color } from "@/types/structures";

export interface FilterBase{
    colors:Color[];
}
export interface FiltersRaw extends FilterBase{
    sizes:{label:string}[];
    materials:{name:string}[],
    prices:{
        basePrice:number;
        prices:number[];
    },
    brand:{name:string,slug:string},
    category:{name:string,slug:string}


}
export interface FiltersReady extends FilterBase{
    sizes:string[];
    materials:string[],
    maxPrice:number;
    brands:{name:string,slug:string}[],
    categories:{name:string,slug:string}[]

}
import { TypedObject } from "sanity";
import { Product } from "./shop";
import { ReadyImage } from "./structures";

export interface Lookbook {
  _id: string;
  title: string;
  slug: { current: string };
  season: {
    name: string;
    year: number;
  };
  introduction: TypedObject[];
  description?: TypedObject[];
  looks: {
    image: (ReadyImage&{caption:string});
    outfitDetails: {
      name: string;
      description?: string;
      productLink: Product;
    }[];
  }[];
}

export interface StyleGuide {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  introduction: TypedObject[];
  description?: TypedObject[];
  sections: {
    title: string;
    content: any[];
    styleImages: (ReadyImage&{caption:string})[];
  }[];
}

export interface SizeGuide {
  _id: string;
  title: string;
  category: {
    name: string;
    slug: { current: string };
  };
  measurementInstructions?: TypedObject[];
  sizeChart: {
    units: "cm" | "in";
    measurements: {
      sizeName: string;
      chest: number;
      waist: number;
      hips: number;
      inseam: number;
    }[];
  };
  images?: (ReadyImage&{caption:string})[];
}

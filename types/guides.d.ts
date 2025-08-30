import { Image } from "./structures";
import { Product } from "./shop";

export interface Lookbook {
  _id: string;
  title: string;
  slug: { current: string };
  season: {
    name: string;
    year: number;
  };
  introduction: any[];
  looks: {
    image: Image;
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
  introduction: any[];
  sections: {
    title: string;
    content: any[];
    styleImages: Image[];
  }[];
}

export interface SizeGuide {
  _id: string;
  title: string;
  category: {
    name: string;
    slug: { current: string };
  };
  measurementInstructions?: any[];
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
  images?: Image[];
}

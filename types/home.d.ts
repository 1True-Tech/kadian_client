import { TypedObject } from "sanity";
import {
  Color,
  ContentChild,
  imageAssetWithAlt,
  MarkDef,
  sanityImageAsset,
} from ".";

export interface HomePageHero {
  title: string;
  subtitle: string;
  cta: {
    link: string;
    style: string;
    text: string;
  };
  image: {
    alt: string;
    main: string | null;
    mobile: string | null;
  };
}

// A span of text inside a content line

export interface ContentLine {
  type: string | null;
  style: string | null;
  children: ContentChild[];
  markDefs: MarkDef[] | null;
}

export interface ReadyImage {
  src: string;
  alt: string;
}
export interface LookBookItem {
  title: string;
  slug: string;
  previewImage: ReadyImage;
  contentLines: TypedObject[];
}

export type SpecialOffers = SpecialOffer[];

export interface SpecialOffer {
  slug: string;
  products: OfferProduct[];
  displayImages: imageAssetWithAlt[] | ReadyImage;
  highlightColor: Color;
  title: string;
  terms: TypedObject[] | null;
  category: string;
}

export interface OfferProduct {
  discountType: "percentage" | "fixed" | "special";
  discountValue: number;
  featured: boolean;
  product: OfferProductInfo;
}

export interface OfferProductInfo {
  hasStock: boolean;
  name: string;
  slug: string;
  price: number;
  image: imageAssetWithAlt| ReadyImage;
}
